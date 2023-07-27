import Storage from "./Storage";

export default class UI_List {
    #divCard;
    #list;
    constructor(element) {
        this.#list = element;
        this.#render();
        this.#bindEvents();

        return this.#divCard;
    }

    #render() {
        const divCard = document.createElement("div");
        divCard.classList.add("card");

        divCard.innerHTML = `
            <div class="name">${this.#list.name}</div>
            <ul>
            </ul>
            <div class="pending">3 pending tasks in 2 lists.</div>
            <progress max="100" value="70"></progress>
        `;

        const taskList = this.#list.tasks;
        const ulTasks = divCard.querySelector("ul");

        for (const key in taskList) {
            const li = document.createElement("li");
            li.innerHTML = `
            <input type='checkbox' data-taskname='${taskList[key].name}' data-taskid='${key}'>
            ${taskList[key].name}
            `;
            ulTasks.appendChild(li);
        }

        this.#divCard = divCard;
    }
    #bindEvents() {
        const checkBoxes = this.#divCard.querySelectorAll("input");
        checkBoxes.forEach((element) => {
            element.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-taskid");
                const task = this.#list.tasks[id];
                task.isDone = event.target.checked;
            });
        });
    }
}
