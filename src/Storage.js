import List from "./List";

export default class Storage {
    static #listsStorage = {};
    static #testStorage = [];

    /*  static populate() {
        this.#listsStorage = Object.assign({});
        new List(this.#listsStorage.length, "Default List", {
            0: { name: "dsa", isDone: true },
            1: { name: "test", isDone: false },
        });
    } */

    static newList() {
        const newID = Math.random();
        const newList = new List(newID, "New List", {});
        console.log(newList);
        this.#listsStorage[newID] = newList;
    }

    static clear() {
        localStorage.clear();
    }

    static save() {
        localStorage.clear();

        /* this.#listsStorage.forEach((list, index) => {
            localStorage.setItem(index, JSON.stringify(list.parse));
            const saveCheck = localStorage.getItem(index);
        }); */
        for (const key in this.#listsStorage) {
            localStorage.setItem(
                key,
                JSON.stringify(this.#listsStorage[key].parse)
            );
            const saveCheck = localStorage.getItem(key);
        }
    }
    static load() {
        console.log(localStorage);
        localStorage.clear();
        this.#listsStorage = {};
        for (let i = 0; i < localStorage.length; i++) {
            const item = JSON.parse(localStorage[i]);
            this.#listsStorage[item.id] = new List(
                this.#listsStorage.length,
                item.name,
                item.tasks
            );
        }
    }

    static get listsStorage() {
        return this.#listsStorage;
    }
}
