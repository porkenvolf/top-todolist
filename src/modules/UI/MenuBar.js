import Pubsub from "../Pubsub";

export default class MenuBar {
    #output;
    constructor() {
        this.#output = this.#render();
        this.#bindEvents();
    }
    #render() {
        //BUTTONS
        const mainButtons = document.createElement("div");
        mainButtons.id = "mainButtons";

        const btnNewList = document.createElement("button");
        btnNewList.id = "btnNewList";
        btnNewList.innerText = "New List";
        mainButtons.appendChild(btnNewList);

        return mainButtons;
    }
    #bindEvents() {
        const btnNewList = this.#output.querySelector("#btnNewList");
        btnNewList.addEventListener("click", () => {
            Pubsub.emit("newList");
        });
    }
    get output() {
        return this.#output;
    }
}
