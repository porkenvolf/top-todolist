import Pubsub from "./Pubsub";

export default class Task {
    #name;
    #isDone;
    #dueDate;
    constructor(name, _isDone) {
        this.#name = name;
        this.#isDone = _isDone;
        this.#dueDate = undefined;
    }
    get name() {
        return this.#name;
    }
    set name(arg) {
        this.#name = arg;
    }
    get isDone() {
        return this.#isDone;
    }
    set isDone(arg) {
        this.#isDone = arg;
        Pubsub.emit("taskChanged");
    }
    get dueDate() {
        return this.#dueDate;
    }
    set dueDate(arg) {
        this.#dueDate = arg;
    }
    get parse() {
        return {
            name: this.#name,
            isDone: this.#isDone,
            dueDate: this.#dueDate,
        };
    }
}
