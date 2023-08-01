import EventsInterface from "./modules/EventsInterface";
import Pubsub from "./modules/Pubsub";

EventsInterface.bindEvents();
Pubsub.emit("load");
Pubsub.emit("reloadPage");
