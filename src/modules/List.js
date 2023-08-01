import Task from "./Task";
import Pubsub from "./Pubsub";

export default class List {
    #id;
    #name;
    #tasks = {};
    #dueDate;
    constructor(_id, _name, _objTasks, _dueDate) {
        this.#id = _id;
        this.#name = _name;
        this.#dueDate = _dueDate;
        if (_objTasks) {
            for (const key in _objTasks) {
                this.#tasks[key] = new Task(
                    _objTasks[key].name,
                    _objTasks[key].isDone
                );
            }
        }
    }

    get tasks() {
        return this.#tasks;
    }
    set tasks(arg) {}
    get name() {
        return this.#name;
    }
    set name(arg) {
        this.#name = arg;
    }
    get id() {
        return this.#id;
    }
    get dueDate() {
        return this.#dueDate;
    }
    set dueDate(date) {
        this.#dueDate = date;
    }
    get parse() {
        let outputTasks = {};
        for (const key in this.#tasks) {
            outputTasks[key] = this.#tasks[key].parse;
        }
        return {
            id: this.#id,
            name: this.#name,
            tasks: outputTasks,
            dueDate: this.#dueDate,
        };
    }
}
