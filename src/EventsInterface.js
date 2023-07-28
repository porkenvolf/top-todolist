import Pubsub from "./Pubsub";
import Storage from "./Storage";
import UI from "./UI";

export default class EventsInterface {
    static bindEvents() {
        Pubsub.on("taskChanged", () => {
            UI.loadPage();
        });
        Pubsub.on("newList", () => {
            Storage.createList();
            UI.loadPage();
        });
    }
}
