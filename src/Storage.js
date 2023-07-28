import List from "./List";

export default class Storage {
    static #listsStorage = [];
    static #testStorage = [];

    static populate() {
        this.#listsStorage.push(
            new List(this.#listsStorage.length, "Default List", {
                0: { name: "dsa", isDone: true },
                1: { name: "test", isDone: false },
            })
        );
    }

    static createList() {
        this.#listsStorage.push(
            new List(this.#listsStorage.length, "New List", {})
        );
    }

    static clear() {
        localStorage.clear();
    }

    static save() {
        localStorage.clear();

        this.#listsStorage.forEach((list, index) => {
            localStorage.setItem(index, JSON.stringify(list.parse));
            const saveCheck = localStorage.getItem(index);
        });
    }
    static load() {
        console.log("loading");
        console.log(localStorage);

        this.#listsStorage = [];
        for (let i = 0; i < localStorage.length; i++) {
            const item = JSON.parse(localStorage[i]);
            console.log(item);
            this.#listsStorage.push(
                new List(this.#listsStorage.length, item.name, item.tasks)
            );
        }
    }

    static get listsStorage() {
        return this.#listsStorage;
    }
}
