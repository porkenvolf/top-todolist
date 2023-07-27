import List from "./List";

export default class Storage {
    static #listsStorage = [];
    static #testStorage = [];

    static populate() {
        this.#listsStorage.push(
            new List("Default List", {
                0: { name: "dsa", isDone: false },
                1: { name: "test", isDone: true },
            })
        );
        this.save();
    }

    static save() {
        localStorage.clear();

        this.#listsStorage.forEach((list, index) => {
            localStorage.setItem(index, JSON.stringify(list.parse));
        });

        this.load();
    }
    static load() {
        let buffer = {};
        for (let i = 0; i < localStorage.length; i++) {
            const item = JSON.parse(localStorage[i]);
            this.#testStorage.push(new List(item.name, item.tasks));
        }
    }

    static get listsStorage() {
        return this.#listsStorage;
    }
}
