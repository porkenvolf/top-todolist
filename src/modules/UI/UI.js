import "../../css/style.css";

import NavBar from "./NavBar";
import MenuBar from "./MenuBar";
import MainContent from "./MainContent";
import Footer from "./Footer";

export default class UI {
    static loadPage() {
        this.body = document.querySelector("body");
        this.body.innerHTML = "";
        this.body.appendChild(new NavBar().output);
        this.body.appendChild(new MenuBar().output);
        this.body.appendChild(new MainContent().output);
        this.body.appendChild(new Footer(2023).output);
    }
}
