Web-extensions can be seen as two interacting subsistems: background scripts, and content scripts. These subsystems have different capabilities and roles. When they need to communicate with eachother, they do it via a messages (plain text messages, not OO mesajes). 

Read [here](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/sendMessage) for more details about this internal communication mechanism.

Messajes can be anything, from "something changed" to "{ action: 'render', arg: 'something to render'}. Messages can be sent from any script. Listeners (to receive messsages) can be defined anywhere. This flexibility comes at a cost: they are hard to understand and debug. They normally result in nested if statements. If your extension is simple, this is not a problem.

In this example we apply two concepts from object orientation to standarize and communication between the parts of a web-extension. 

1. RMC: This approach understands communication between background and content objects as remote method calls (RMC). We no longer send strings back and forward. We send serialized method calls (or message sends). 
2. Each subsystem is hidden behing a Façade. There is a ContentFacade for the content_script subsystem, and a BackgroundFacade for the background scripts. Methods defined in this classes are the central element of communication between both parts. 

# Usage

## Dependencies

This skeleton code does not have many dependencies (only the browser-polyfil). Run ```npm install``` inside the \src folder to install dependencies.

## Facades

You first need to implement your facades; one for the background side and one for the content side. 

Facades implements all methods can can be called from the other side (via RMC). Methods can have any name you want but only one argument, an object. If you want to pass several arguments, make them propoerties of the object). For example:

```javascript
   /**
   * Send an email
   * @param {Object} args - an object with 'email' and 'text' properties.  
   */
  sendEmail(args) {
    emailSender.sendEmail(args.email, args.text)
  }
```  

Make a subclass of Facade (the facade class is located in the shared folder) for your background side. You can call it BackgroundFacade. This file is part of the background scripts. Make a subclass of Facade for your content side. You can call it ContentFacade. This file is part of the content scripts. 

The background and content facade classes should implement all methods that will be called from outside (e.g. from the content scripts in the case of the BackgroundFacade). Methods receive only one argument (an object)

## Proxies 
Proxies are created automatically. They forward all method calls to the corresponding Facade.

In the content scripts, you need a proxy to the BackgroundFacade. You can get it with ```RMCProxyFactory.backgroundProxy()```. In the background scripts you need a proxy to the facade of the currently active tab. You can get it with ```RMCProxyFactory.activeTabContentProxy()```. Currently, it is not possible to talk to all content facades at once (in case there are multiple open tabs)

# Example

This skeleton code includes an example. Install the web-extension (Firefox or Chrome). Open one or two tabs and load web-pages that include H1, H2, H3, H4 elements. Click on any of them and see what happens.
# wikipediaXtensionV2
