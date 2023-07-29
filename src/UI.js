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

    static #renderLeftPanel() {
        const element = document.createElement("div");
        element.innerHTML = `
            <h1>Filters</h1>
            <h2>Tags</h2>
        `;
        element.id = "leftPanel";

        this.body.appendChild(element);
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
    static #renderProjects() {
        //BUTTONS
        const mainButtons = document.createElement("div");
        mainButtons.id = "mainButtons";
        this.body.appendChild(mainButtons);

        const btnNewProject = document.createElement("button");
        btnNewProject.innerText = "New Project";
        mainButtons.appendChild(btnNewProject);
        btnNewProject.addEventListener("click", (event) => {});

        //MAIN CONTENT
        const mainContent = document.createElement("div");
        mainContent.id = "mainContent";
        this.body.appendChild(mainContent);

        mainContent.innerHTML = `
                    <div class="content">
                        <div class="card">
                            <div class="name">Project 1</div>
                            <div class="description">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Suscipit, dolorem autem rem maiores sunt fugit! Magni
                                consectetur tenetur placeat ipsam nesciunt beatae
                                deserunt nisi aut.
                            </div>

                            <h2>Active Lists</h2>
                            <ul>
                                <li>List 1</li>
                                <li>List 2</li>
                                <li>List 3</li>
                                <li>List 4</li>
                            </ul>
                            <div class="pending">3 pending tasks in 2 lists.</div>
                            <progress max="100" value="70"></progress>
                            <button>Go to project</button>
                        </div>
                    </div>`;
    }
    static #renderMainButtons() {
        //DOMSTUFF
        const mainButtons = document.createElement("div");
        mainButtons.id = "mainButtons";
        this.body.appendChild(mainButtons);

        //BUTTONS
        const btnNewProject = document.createElement("button");
        btnNewProject.innerText = "New Project";
        mainButtons.appendChild(btnNewProject);
        btnNewProject.addEventListener("click", (event) => {});
    }
}
