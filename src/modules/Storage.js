import List from "./List";

export default class Storage {
    static #lists = {};

    static save() {
        localStorage.clear();
        const dataArray = [];
        for (const key in this.#lists) {
            dataArray.push([key, this.#lists[key].parse]);
        }
        const dataMap = new Map(dataArray);
        localStorage.setItem(
            "data",
            JSON.stringify(Array.from(dataMap.entries()))
        );
    }
    static load() {
        this.#lists = {};

        const storedData = JSON.parse(localStorage.getItem("data"));
        if (!storedData) return;
        storedData.forEach((element) => {
            const id = element[0];
            const list = element[1];
            this.#lists[id] = new List(id, list.name, list.tasks, list.dueDate);
        });
    }

    static get lists() {
        return this.#lists;
    }
}
