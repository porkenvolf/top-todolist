import Pubsub from "../Pubsub";
import imgClose from "../../img/close.svg";
import imgPlus from "../../img/plus.svg";
import imgClock from "../../img/clock-plus-outline.svg";
import formatDistance from "date-fns/formatDistance";
import compareAsc from "date-fns/compareAsc";

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
class dueDate {
    #list;
    #output;
    constructor(list) {
        this.#list = list;
        this.#output = this.#render();
        this.#bindEvents();
    }
    #render() {
        const dueDate = document.createElement("div");
        dueDate.style.display = "flex";
        dueDate.style.alignItems = "center";
        dueDate.style.gap = "10px";

        const item = document.createElement("div");
        item.classList.add("item");
        dueDate.appendChild(item);

        const img = document.createElement("img");
        img.src = imgClock;
        item.appendChild(img);

        const input = document.createElement("input");
        input.type = "date";
        item.appendChild(input);

        const verbose = document.createElement("div");

        dueDate.appendChild(verbose);
        if (this.#list.dueDate) {
            item.classList.add("expanded");
            input.value = this.#list.dueDate;

            const now = new Date();
            const dueDate = new Date(this.#list.dueDate);
            const verb = compareAsc(dueDate, now) > 0 ? "expires" : "expired";

            verbose.innerText = `This list ${verb} ${formatDistance(
                dueDate,
                now,
                {
                    addSuffix: true,
                }
            )}`;
        }

        return dueDate;
    }
    #bindEvents() {
        this.#output.addEventListener("click", (event) => {
            const targetContainer = event.target.closest(".item");
            targetContainer.classList.toggle("expanded");
        });
        this.#output
            .querySelector("input")
            .addEventListener("click", (event) => {
                event.stopPropagation();
            });
        this.#output
            .querySelector("input")
            .addEventListener("change", (event) => {
                const id = this.#list.id;
                const newDueDate = event.target.value;
                Pubsub.emit("updateListDueDate", { id, newDueDate });
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
            <div id='body'></div>
            <div id='footer'></div>
        `;
        //TITLE
        divCard
            .querySelector("#title")
            .appendChild(new inputTitle(this.#list).output);

        divCard
            .querySelector("#title")
            .appendChild(new btnRemoveList(this.#list).output);

        //BODY
        divCard
            .querySelector("#body")
            .appendChild(new taskList(this.#list).output);

        //FOOTER
        divCard
            .querySelector("#footer")
            .appendChild(new dueDate(this.#list).output);

        //ADD TO OBJECT
        this.#divCard = divCard;
    }
    #bindEvents() {}
}
