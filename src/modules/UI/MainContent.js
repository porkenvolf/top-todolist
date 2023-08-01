import UI_List from "./UI_List";
import Storage from "../Storage";

export default class MainContent {
    #output;
    constructor() {
        this.#output = this.#render();
        this.#bindEvents();
    }
    #render() {
        //MAIN CONTENT
        const mainContent = document.createElement("div");
        mainContent.id = "mainContent";

        const lists = Storage.lists;

        for (const key in lists) {
            mainContent.appendChild(new UI_List(lists[key]));
        }
        return mainContent;
    }
    #bindEvents() {}
    get output() {
        return this.#output;
    }
}
