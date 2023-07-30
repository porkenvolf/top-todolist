import List from "./List";

export default class Storage {
    static #listsStorage = {};

    static clear() {
        localStorage.clear();
    }

    static save() {
        localStorage.clear();
        const dataArray = [];
        for (const key in this.#listsStorage) {
            dataArray.push([key, this.#listsStorage[key].parse]);
        }
        const dataMap = new Map(dataArray);
        localStorage.setItem(
            "data",
            JSON.stringify(Array.from(dataMap.entries()))
        );
        const saveCheck = localStorage;
        console.log(saveCheck);
    }
    static load() {
        this.#listsStorage = {};

        const storedData = JSON.parse(localStorage.getItem("data"));
        if (!storedData) return;
        storedData.forEach((element) => {
            console.log(element);
            const id = element[0];
            const list = element[1];
            this.#listsStorage[id] = new List(id, list.name, list.tasks);
        });
    }

    static get listsStorage() {
        return this.#listsStorage;
    }
}
