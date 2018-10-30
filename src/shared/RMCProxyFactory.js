class RMCProxyFactory {
  static activeTabContentProxy() {
    return new Proxy(new RMCProxyFactory(), {
      get(target, propKey, receiver) {
        return async function(...args) {
          let rmc = { methodName: propKey, arguments: args[0] };
          return target.sendToCurrentTab(rmc);
        };
      }
    });
  }

  static backgroundProxy() {
    return new Proxy(new RMCProxyFactory(), {
      get(target, propKey, receiver) {
        return async function(...args) {
          let rmc = { methodName: propKey, arguments: args[0] };
          return target.sendToBackground(rmc);
        };
      }
    });
  }

  /**
   * Sends a message to the active tab's ContentFacade
   * @param {Object} rmc
   */
  async sendToCurrentTab(rmc) {
    let activeTabs = await browser.tabs.query({ active: true });
    if (activeTabs.length > 0) {
      var response = await browser.tabs.sendMessage(activeTabs[0].id, rmc);
    } else {
      console.log(
        "Sending a message to the content scripts when no tab is active"
      );
    }
    return response;
  }

  /**
   * Sends a message to the background Facade
   * @param {Object} rmc
   */
  async sendToBackground(rmc) {
    try {
      return browser.runtime.sendMessage(rmc);
    } catch {
      console.log("Background are not ready yet: ");
    }
  }
}
