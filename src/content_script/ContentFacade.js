/** 
* This class implement the Facade pattern. It is the only entry point
* in the content script subsystem for remote messages from the background scripts. 
* See content.js to learn how I receive messages from a remote object (the background scripts)
* All my methods have one argument (arguments)
*/

let contentFacadeSingleton = null;

class ContentFacade extends Facade {

    constructor() {
        super();
        this.scrambler = new Scrambler();
    }

    static getSingleton() {
        if (contentFacadeSingleton == null) {
            contentFacadeSingleton = new ContentFacade();
        }  
        return contentFacadeSingleton
    }

    attach() {
        this.scrambler.addClickListeners();
    }

   /**
   * Inserts a list of the titles received within a floating div
   */
    showTitles(args) {
        this.scrambler.showTitles(args.alternativeText);
    }
   
}