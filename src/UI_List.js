import Pubsub from "./Pubsub";
import Task from "./Task";
import imgClose from "./img/close.svg";
import imgPlus from "./img/plus.svg";

export default class UI_List {
    #divCard;
    #list;
    color;
    constructor(element) {
        this.#list = element;
        this.color = { h: element.id * 255, s: 70, l: 70 };
        this.#render();
        this.#bindEvents();

        return this.#divCard;
    }

    #render() {
        const divCard = document.createElement("div");
        divCard.classList.add("card");
        divCard.style.borderTop = `20px solid hsl(
            ${this.color.h},
            ${this.color.s}%,
            ${this.color.l}%)`;

        divCard.innerHTML = `
            <div id='title'></div>
            <ul>
            </ul>
        `;
        //INPUT TITLE
        const inputTitle = document.createElement("input");
        inputTitle.type = "text";
        inputTitle.classList.add("name");
        inputTitle.value = this.#list.name;
        divCard.querySelector("#title").appendChild(inputTitle);

        //REMOVE LIST
        const removeList = document.createElement("img");
        removeList.src = imgClose;
        removeList.classList = "parentHoverRemoveList";
        divCard.querySelector("#title").appendChild(removeList);

        //TASKS
        const taskList = this.#list.tasks;
        let amountDone = 0;
        const ulTasks = divCard.querySelector("ul");
        for (const key in taskList) {
            const li = document.createElement("li");

            //EACH CHECKBOX
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = taskList[key].isDone;
            if (checkbox.checked) amountDone += 1;
            checkbox.setAttribute("data-taskid", key);
            li.appendChild(checkbox);

            //EACH LABEL/INPUT
            const label = document.createElement("input");
            label.classList.add("task");
            label.type = "text";
            label.setAttribute("data-taskid", key);
            label.value = taskList[key].name;
            li.appendChild(label);

            //EACH removeTask BUTTON
            const removeTask = document.createElement("img");
            removeTask.src = imgClose;
            removeTask.classList = "parentHoverRemoveTask";
            removeTask.setAttribute("data-taskid", key);
            li.appendChild(removeTask);

            ulTasks.appendChild(li);
        }

        //ADD NEW TASK
        const newTask = document.createElement("li");
        const newTaskLabel = document.createElement("input");
        newTaskLabel.type = "text";
        newTaskLabel.classList.add("newTask");
        newTaskLabel.placeholder = "Add new task";
        newTaskLabel.innerText = "";

        const plus = document.createElement("img");
        plus.src = imgPlus;
        plus.classList.add("plusIcon");
        newTask.appendChild(plus);
        newTask.appendChild(newTaskLabel);
        ulTasks.appendChild(newTask);

        //ADD TO OBJECT
        this.#divCard = divCard;
    }
    #bindEvents() {
        //CARD NAME
        const cardName = this.#divCard.querySelector(".name");
        cardName.addEventListener("click", (event) => {
            event.target.select();
        });
        cardName.addEventListener("change", (event) => {
            event.preventDefault();
            this.#list.name = event.target.value;
            Pubsub.emit("reloadPage");
        });

        //REMOVE LIST
        const removeList = this.#divCard.querySelector(
            ".parentHoverRemoveList"
        );
        removeList.addEventListener("click", (event) => {
            Pubsub.emit("removeList", this.#list);
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
                Pubsub.emit("reloadPage");
            });
        });

        //TASKS
        const tasks = this.#divCard.querySelectorAll(".task");
        tasks.forEach((task) => {
            task.addEventListener("change", (event) => {
                const id = event.target.getAttribute("data-taskid");
                const task = this.#list.tasks[id];
                task.name = event.target.value;
                Pubsub.emit("reloadPage");
            });
        });

        //ADD NEW TASK INPUT
        const addNewTask = this.#divCard.querySelector(".newTask");
        addNewTask.addEventListener("change", (event) => {
            const newID = Math.random();
            this.#list.tasks[newID] = new Task(event.target.value, false);

            Pubsub.emit("reloadPage");
        });

        //EACH removeTask BUTTON
        const removeTask = this.#divCard.querySelectorAll(
            ".parentHoverRemoveTask"
        );
        removeTask.forEach((element) => {
            element.addEventListener("click", (event) => {
                delete this.#list.tasks[
                    event.target.getAttribute("data-taskid")
                ];
                Pubsub.emit("reloadPage");
            });
        });
    }
}
