import Task from "./Task";

export default class List {
    #name;
    #tasks = {};
    constructor(_name, _objTasks) {
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
    get name() {
        return this.#name;
    }
    set name(arg) {
        this.#name = arg;
    }
    get parse() {
        return { name: this.#name, tasks: this.#tasks };
    }
}
