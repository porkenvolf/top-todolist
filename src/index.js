import Storage from "./Storage.js";
import EventsInterface from "./EventsInterface";
import UI from "./UI";
import Pubsub from "./Pubsub.js";

Storage.populate();
EventsInterface.bindEvents();

Pubsub.emit("load");
UI.loadPage();
