import "./css/style.css";
import { renderFooter } from "./footer";

import NavBar from "./modules/NavBar";
import MenuBar from "./modules/MenuBar";
import MainContent from "./modules/MainContent";
import Footer from "./modules/Footer";

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
