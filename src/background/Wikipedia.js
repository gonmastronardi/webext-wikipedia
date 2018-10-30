class Wikipedia {
  constructor() {
    this.titles = [];
    this.url = "https://es.wikipedia.org/w/index.php?fulltext=1&search=";
  }

  //It makes a get requirement to Wikipedia and saves the titles of the result search.
  //Then forwads them to the contentFacade
  async getTitles(txt) {
    let newTxt = txt.replace(/ /g, "+");
    let url = this.url + newTxt;
    console.log(url);
    const response = await fetch(url);
    const html = await response.text();
    // Initialize the DOM parser
    let parser = new DOMParser();
    // Parse the text
    let doc = parser.parseFromString(html, "text/html");
    //Get the titles and return them in an array
    const searchResult = doc.getElementsByClassName("mw-search-result-heading");
    const arraySearch = [...searchResult];
    let result = [];
    arraySearch.forEach(i => {
      result.push(i.firstChild.title);
    });
    // var jsonResult = JSON.stringify(result);
    RMCProxyFactory.activeTabContentProxy().showTitles({
      alternativeText: result
    });
  }
}
