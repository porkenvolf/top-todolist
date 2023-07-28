import Task from "./Task";
import Pubsub from "./Pubsub";

export default class List {
    #id;
    #name;
    #tasks = {};
    constructor(_id, _name, _objTasks) {
        this.#id = _id;
        this.#name = _name;
        if (_objTasks) {
            for (const key in _objTasks) {
                this.#tasks[key] = new Task(
                    _objTasks[key].name,
                    _objTasks[key].isDone
                );
            }
        }
    }

    /* newTask(_name) {
        let name;
        if (_name) {
            name = _name;
        } else {
            const error = "The new task must have a name";
            console.error(error);
            return error;
        }
        const newTask = new Task(name);
        this.#tasks.push(newTask);
    } */

    get tasks() {
        return this.#tasks;
    }
    set tasks(arg) {
        Pubsub.emit("reloadPage");
    }
    get name() {
        return this.#name;
    }
    set name(arg) {
        this.#name = arg;
        Pubsub.emit("reloadPage");
    }
    get id() {
        return this.#id;
    }
    get parse() {
        return { name: this.#name, tasks: this.#tasks };
    }
}
