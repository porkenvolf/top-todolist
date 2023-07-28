import Pubsub from "./Pubsub";
import Storage from "./Storage";
import UI from "./UI";

export default class EventsInterface {
    static bindEvents() {
        Pubsub.on("save", () => {
            Storage.save();
        });
        Pubsub.on("load", () => {
            Storage.load();
            //Storage.clear();
        });

        Pubsub.on("reloadPage", () => {
            Pubsub.emit("save");
            UI.loadPage();
        });
        Pubsub.on("newList", () => {
            Storage.createList();
            UI.loadPage();
        });
    }
}
