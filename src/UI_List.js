import Pubsub from "./Pubsub";

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
            <input class=name type='text' value='${this.#list.name}'>
            <ul>
            </ul>
            <progress></progress>
        `;

        const taskList = this.#list.tasks;
        let amountDone = 0;

        //UL
        const ulTasks = divCard.querySelector("ul");
        for (const key in taskList) {
            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = taskList[key].isDone;
            if (checkbox.checked) amountDone += 1;
            checkbox.setAttribute("data-taskid", key);
            li.appendChild(checkbox);

            const label = document.createElement("span");
            label.innerText = taskList[key].name;
            li.appendChild(label);

            ulTasks.appendChild(li);
        }

        //PROGRESS BAR
        const progress = divCard.querySelector("progress");
        progress.max = Object.keys(taskList).length;
        progress.value = amountDone;

        this.#divCard = divCard;
    }
    #bindEvents() {
        //CARD NAME
        const cardName = this.#divCard.querySelector(".name");
        cardName.addEventListener("change", (event) => {
            event.preventDefault();
            this.#list.name = event.target.value;
        });

        //CHECKBOXES
        const checkBoxes = this.#divCard.querySelectorAll(
            'input[type="checkbox"]'
        );
        checkBoxes.forEach((element) => {
            element.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-taskid");
                const task = this.#list.tasks[id];
                task.isDone = event.target.checked;
            });
        });
    }
}
