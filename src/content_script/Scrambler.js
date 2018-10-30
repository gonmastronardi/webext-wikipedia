class Scrambler {
  constructor() {}

  addClickListeners() {
    const me = this;
    document.querySelectorAll("h1,h2,h3,h4").forEach(function(elem) {
      elem.addEventListener("mousedown", function(e) {
        me.clicked(e);
      });
    });
  }

  clicked(event) {
    let hToAsk = event.currentTarget;
    RMCProxyFactory.backgroundProxy().userAskForTitles({
      text: hToAsk.innerHTML
    });
  }

  /**
   * Inserts a list of the titles received within a floating div
   */
  showTitles(txt) {
    if (Object.keys(txt).length === 0) {
      alert("La busqueda no arrojo resultados");
    } else {
      let divToShow = document.createElement("div");
      divToShow.style.textAlign = "center";
      divToShow.style.width = "70%";
      divToShow.style.top = "15%";
      divToShow.style.left = "15%";
      divToShow.style.position = "absolute";
      divToShow.style.backgroundColor = "#eee";
      document.body.appendChild(divToShow);
      var listElement = document.createElement("ul");
      divToShow.appendChild(listElement);
      txt.forEach(i => {
        var listItem = document.createElement("li");
        // Add the item text
        listItem.innerHTML = i;
        // Add listItem to the listElement
        listElement.appendChild(listItem);
      });
    }
  }
}
