import Pubsub from "./Pubsub";
import Storage from "./Storage";

export default class EventsInterface {
    static bindEvents() {
        Pubsub.on("updateStorage", Storage.save);
    }
}
