/**
 * This class implement the Facade pattern. It is the only entry point
 * in the background script subsystem for remote messages from the content scripts.
 * See background.js to learn how I receive messages from a remote object (the content scripts)
 * All my methods have one argument (arguments)
 *
 */

let backgroundFacadeSingleton = null;

class BackgroundFacade extends Facade {


  constructor() {
    super();
    this.wikipedia = new Wikipedia();
  }

  static getSingleton() {
    if (backgroundFacadeSingleton == null) {
      backgroundFacadeSingleton = new BackgroundFacade();
    }
    return backgroundFacadeSingleton;
  }

  userAskForTitles(args) {
    this.wikipedia.getTitles(args.text);
  }
}
