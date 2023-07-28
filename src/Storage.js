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
        }
    }
    static load() {
        this.#listsStorage = {};
        for (const key in localStorage) {
            if (Object.hasOwnProperty.call(localStorage, key)) {
                const item = JSON.parse(localStorage[key]);
                this.#listsStorage[item.id] = new List(
                    key,
                    item.name,
                    item.tasks
                );
            }
        }
    }

    static get listsStorage() {
        return this.#listsStorage;
    }
}
