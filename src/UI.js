import "./css/style.css";
import Pubsub from "./Pubsub";
import Storage from "./Storage";
import UI_List from "./UI_List";
import { renderFooter } from "./footer";

export default class UI {
    static loadPage() {
        this.body = document.querySelector("body");
        this.body.innerHTML = "";
        this.#renderNav();
        this.#renderLists();
        this.body.appendChild(renderFooter("2023"));
    }

    static #renderNav() {
        const element = document.createElement("div");
        element.innerHTML = `DewDew.it`;
        element.id = "nav";
        this.body.appendChild(element);
    }
    static #renderLists() {
        //BUTTONS
        const mainButtons = document.createElement("div");
        mainButtons.id = "mainButtons";
        this.body.appendChild(mainButtons);

        const btnNewList = document.createElement("button");
        btnNewList.innerText = "New List";
        mainButtons.appendChild(btnNewList);
        btnNewList.addEventListener("click", (event) => {
            Pubsub.emit("newList");
        });

        //MAIN CONTENT
        const mainContent = document.createElement("div");
        mainContent.id = "mainContent";
        this.body.appendChild(mainContent);

        const lists = Storage.listsStorage;

        for (const key in lists) {
            mainContent.appendChild(new UI_List(lists[key]));
        }
    }
}
