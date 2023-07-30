export default class NavBar {
    #output;
    constructor() {
        this.#output = this.#render();
        this.#bindEvents();
    }
    #render() {
        const element = document.createElement("div");
        element.innerHTML = `DewDew.it`;
        element.id = "nav";
        return element;
    }
    #bindEvents() {}
    get output() {
        return this.#output;
    }
}
