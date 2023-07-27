import Storage from "./Storage.js";
import EventsInterface from "./EventsInterface";
import UI from "./UI";

Storage.populate();
EventsInterface.bindEvents();
UI.loadPage();

/* Pubsub.on("dsa", () => {
    alert("yess");
});
 */
