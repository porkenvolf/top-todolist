import Pubsub from "./Pubsub";

export default class Task {
    #name;
    #isDone;
    #dueDate;
    constructor(name) {
        this.#name = name;
        this.#isDone = false;
        this.#dueDate = undefined;
    }
    get name() {
        return this.#name;
    }
    set name(arg) {
        this.#name = arg;
        Pubsub.emit("updateStorage");
    }
    get isDone() {
        return this.#isDone;
    }
    set isDone(arg) {
        this.#isDone = arg;
        Pubsub.emit("updateStorage");
    }
    get dueDate() {
        return this.#dueDate;
    }
    set dueDate(arg) {
        this.#dueDate = arg;
        Pubsub.emit("updateStorage");
    }
    get parse() {
        return {
            name: this.#name,
            isDone: this.#isDone,
            dueDate: this.#dueDate,
        };
    }
}
