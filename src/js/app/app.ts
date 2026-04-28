// import {Body} from "../ui/body";
// import {Filter} from "../filter/fliter";
// import {Dropdown} from "../ui/dropdown";
// import {Slider} from "../sliders/slider";
// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
// import {Header} from "../ui/header";
import {MobileMenu} from "../ui/mobileMenu";
import {Header} from "../ui/header";
import 'air-datepicker/air-datepicker.css';
import AirDatepicker from "air-datepicker";
import SlimSelect from 'slim-select';
import 'slim-select/scss';
import {AsideObserver} from "../ui/asideObserver";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import {Fancybox} from "@fancyapps/ui";

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
        this.initDatePicker();
        this.initSelectApp();
        this.initAsideObserver();
        this.initModals();
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

    initDatePicker = () => {
        const els: NodeListOf<HTMLElement> = document.querySelectorAll('[data-datepicker="block"]');

        els.forEach((item) => {
            const input: HTMLInputElement = item.querySelector('[data-datepicker="field"]');

            new AirDatepicker(input, {
                range: true,
                // position: 'bottom right',
                multipleDatesSeparator: '-',
                buttons: ['clear'],
                // inline: true
            });
        });
    }

    initSelectApp = () => {
        const els: NodeListOf<HTMLElement> = document.querySelectorAll('[data-select="block"]');

        els.forEach((item) => {
            const input: HTMLInputElement = item.querySelector('[data-select="field"]');

            new SlimSelect({
                select: input,
                settings: {
                    showSearch: false
                }
            })
        });
    }

    initAsideObserver = () => {
        const el: HTMLElement = document.querySelector('[data-aside-line="block"]');

        if (el) new AsideObserver(el);
    }

    initModals = () => {
        Fancybox.bind('[data-fancybox="menu-aside"]', {
            // Your custom options for a specific gallery
            mainClass: 'fancybox-aside-contents',
            closeButton: false,
        });
    }
}

export {App};

