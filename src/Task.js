export default class Task {
    #name;
    #description;
    #isDone;
    #dueDate;
    constructor(name, description) {
        this.#name = name;
        this.#description = description;
        this.#isDone = false;
        this.#dueDate = undefined;
    }
    get name() {
        return this.#name;
    }
    set name(arg) {
        this.#name = arg;
    }
    get description() {
        return this.#description;
    }
    set description(arg) {
        this.#description = arg;
    }
    get isDone() {
        return this.#isDone;
    }
    set isDone(arg) {
        this.#isDone = arg;
    }
    get dueDate() {
        return this.#dueDate;
    }
    set dueDate(arg) {
        this.#dueDate = arg;
    }
}
