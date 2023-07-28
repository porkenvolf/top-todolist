import Pubsub from "./Pubsub";
import Storage from "./Storage";
import UI from "./UI";

export default class EventsInterface {
    static bindEvents() {
        Pubsub.on("checkStorage", () => {
            console.log(Storage.listsStorage);
        });
        Pubsub.on("reloadPage", () => {
            UI.loadPage();
        });
        Pubsub.on("newList", () => {
            Storage.createList();
            UI.loadPage();
        });
    }
}
