import Pubsub from "./Pubsub";
import Storage from "./Storage";
import UI from "./UI";
import Task from "./Task";
import List from "./List";

export default class EventsInterface {
    static bindEvents() {
        //STORAGE
        Pubsub.on("save", () => {
            Storage.save();
        });
        Pubsub.on("load", () => {
            Storage.load();
        });

        //UI
        Pubsub.on("reloadPage", () => {
            UI.loadPage();
            Pubsub.emit("save");
        });

        //LISTS
        Pubsub.on("newList", () => {
            const newID = Math.random().toFixed(5);
            const newList = new List(newID, "New List", {});
            Storage.listsStorage[newID] = newList;

            Pubsub.emit("reloadPage");
        });
        Pubsub.on("removeList", (data) => {
            delete Storage.listsStorage[data.id];

            Pubsub.emit("reloadPage");
        });
        Pubsub.on("updateListName", (data) => {
            const id = data.id;
            const newName = data.newName;
            Storage.listsStorage[id].name = newName;
        });

        //TASKS
        Pubsub.on("newTask", (data) => {
            const name = data.name;
            const isDone = data.isDone;
            const listID = data.listID;

            const newID = Math.random();
            const newTask = new Task(name, isDone);
            Storage.listsStorage[listID].tasks[newID] = newTask;
        });
        Pubsub.on("updateIsDone", (data) => {
            const listID = data.listID;
            const taskID = data.taskID;
            const newIsDone = data.newIsDone;
            Storage.listsStorage[listID].tasks[taskID].isDone = newIsDone;
        });
    }
}
