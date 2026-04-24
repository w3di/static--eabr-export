import {App} from "./js/app/app";
import "./main/shared/sprite";
import "./main/shared/libs/";
import "./style.scss";

document.addEventListener('DOMContentLoaded', () => {
    // @ts-ignore
    window.app = new App();
});
