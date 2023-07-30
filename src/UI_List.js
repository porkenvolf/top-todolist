import Pubsub from "./Pubsub";
import imgClose from "./img/close.svg";
import imgPlus from "./img/plus.svg";

class inputTitle {
    #list;
    #output;
    constructor(list) {
        this.#list = list;
        this.#output = this.#render();
        this.#bindEvents();
    }
    #render() {
        const inputTitle = document.createElement("input");
        inputTitle.type = "text";
        inputTitle.classList.add("name");
        inputTitle.value = this.#list.name;
        return inputTitle;
    }
    #bindEvents() {
        const cardName = this.#output;
        cardName.addEventListener("click", (event) => {
            event.target.select();
        });
        cardName.addEventListener("change", (event) => {
            event.preventDefault();
            Pubsub.emit("updateListName", {
                id: this.#list.id,
                newName: event.target.value,
            });
            Pubsub.emit("reloadPage");
        });
    }
    get output() {
        return this.#output;
    }
}

class btnRemoveList {
    #list;
    #output;
    constructor(list) {
        this.#list = list;
        this.#output = this.#render();
        this.#bindEvents();
    }
    #render() {
        const removeList = document.createElement("img");
        removeList.src = imgClose;
        removeList.classList.add("parentHoverRemoveList");
        return removeList;
    }
    #bindEvents() {
        const removeList = this.#output;
        removeList.addEventListener("click", () => {
            Pubsub.emit("removeList", this.#list);
            Pubsub.emit("reloadPage");
        });
    }
    get output() {
        return this.#output;
    }
}

class taskList {
    #list;
    #output;
    constructor(list) {
        this.#list = list;
        this.#output = this.#render();
        this.#bindEvents();
    }
    #render() {
        const taskList = this.#list.tasks;
        const ulTasks = document.createElement("ul");
        for (const key in taskList) {
            const li = document.createElement("li");

            //EACH CHECKBOX
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = taskList[key].isDone;
            checkbox.setAttribute("data-taskid", key);
            li.appendChild(checkbox);

            //EACH LABEL/INPUT
            const label = document.createElement("input");
            label.classList.add("task");
            label.type = "text";
            label.setAttribute("data-taskid", key);
            label.value = taskList[key].name;
            if (taskList[key].isDone) label.classList.add("isDone");

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

        return ulTasks;
    }
    #bindEvents() {
        //CHECKBOXES
        const checkBoxes = this.#output.querySelectorAll(
            'input[type="checkbox"]'
        );
        checkBoxes.forEach((element) => {
            element.addEventListener("click", (event) => {
                const listID = this.#list.id;
                const taskID = event.target.getAttribute("data-taskid");
                const newIsDone = event.target.checked;
                Pubsub.emit("updateIsDone", { listID, taskID, newIsDone });
                Pubsub.emit("reloadPage");
            });
        });

        //TASKS
        const tasks = this.#output.querySelectorAll(".task");
        tasks.forEach((task) => {
            task.addEventListener("change", (event) => {
                const id = event.target.getAttribute("data-taskid");
                const task = this.#list.tasks[id];
                task.name = event.target.value;
                Pubsub.emit("reloadPage");
            });
        });

        //ADD NEW TASK INPUT
        const addNewTask = this.#output.querySelector(".newTask");
        addNewTask.addEventListener("change", (event) => {
            const name = event.target.value;
            const isDone = false;
            const listID = this.#list.id;
            Pubsub.emit("newTask", { name, isDone, listID });
            Pubsub.emit("reloadPage");
        });

        //EACH removeTask BUTTON
        const removeTask = this.#output.querySelectorAll(
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
    get output() {
        return this.#output;
    }
}

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
        `;
        //TITLE
        divCard
            .querySelector("#title")
            .appendChild(new inputTitle(this.#list).output);

        //REMOVE LIST
        divCard
            .querySelector("#title")
            .appendChild(new btnRemoveList(this.#list).output);

        //TASKS
        divCard.appendChild(new taskList(this.#list).output);

        /* //DUE DATE
        const dueDate = document.createElement("div");
        dueDate.innerText = "Due Date";
        divCard.appendChild(dueDate); */

        //ADD TO OBJECT
        this.#divCard = divCard;
    }
    #bindEvents() {}
}
