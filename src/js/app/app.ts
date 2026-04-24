// import {Body} from "../ui/body";
// import {Filter} from "../filter/fliter";
// import {Dropdown} from "../ui/dropdown";
// import {Slider} from "../sliders/slider";
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
// import {Header} from "../ui/header";

import {MobileMenu} from "../ui/mobileMenu";
import {Header} from "../ui/header";

class App {
    // private body: Body | null;
    // private header: Header | null;
    // filter: Filter | null;
    // dynamicFilter: Filter | null;

    constructor() {
        // this.body = null;
        // this.ticker = null;
        // this.header = null;

        this.init();
    }

    init = () => {
        // console.log('App Inited');
        //
        // this.initAccordeons();
        // this.initSlider();
        // this.initFancybox();
        // this.initFilter();
        // this.initDropdown();
        // this.initDropdownCalendar();
        // this.initDropdownMenu();
        // this.initBody();
        // this.initMenu();
        // this.initTicker();
        // this.initTabs();
        // this.initArticlesPlan();
        // this.initTextCut();
        // this.initMainPreloader();
        // this.initLivePreloader();
        // this.initHallPreloader();
        // this.initDisability();
        this.initHeader();
        // this.initShare();
        // this.initReturnButton();
        // this.initMenuSlide();
        // this.initFocusManager();
        // this.initModalForm();
        // this.initCheckboxes();
        // this.initInput();
        // this.initDropNav();
        this.initSwitcher();
        this.initMobileMenu();
    }

    initSwitcher = () => {
        const els = document.querySelectorAll('[data-switcher]');

        els.forEach(el => {
            el.addEventListener('click', () => {
                el.classList.toggle('active');
            })
        })
    }

    initMobileMenu = () => {
        const el: HTMLElement = document.querySelector('[data-mobile-menu]')
        if (el) new MobileMenu(el);
    }

    initHeader = () => {
        const el: HTMLElement = document.querySelector('[data-header]')
        if (el) new Header(el);
    }
}

export {App};

