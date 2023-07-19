import Task from "./Task";

export default class Project {
    #name;
    #tasks = [];
    constructor(_name) {
        this.#name = _name;
    }

    newTask(_name, _description) {
        let name;
        if (_name) {
            name = _name;
        } else {
            const error = "The new task must have a name";
            console.error(error);
            return error;
        }
        const description = _description ? _description : "";
        const newTask = new Task(name, description);
        this.#tasks.push(newTask);
    }

    get tasks() {
        return this.#tasks;
    }
    get name() {
        return this.#name;
    }
    set name(arg) {
        this.#name = arg;
    }
}
