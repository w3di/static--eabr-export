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
import {Title} from "../ui/title";
import {createPopper} from "@popperjs/core";
import { Carousel } from "@fancyapps/ui";
import "@fancyapps/ui/dist/carousel/carousel.css";
import { Thumbs } from "@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js";
import "@fancyapps/ui/dist/carousel/carousel.thumbs.css";
import {Slider} from "../ui/slider";
import { animate, splitText, stagger } from 'animejs';
import {onVisible} from "../helpers/onvisible";
import {SpotlightCard} from "../ui/spotlightCard";
import {ButtonReturn} from "../ui/buttonReturn";
import {Counter} from "../ui/counter";

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
        this.initTitle();
        this.initCarousel();
        this.initSlider();
        this.initAnimations();
        this.initSpotlightCard();
        this.initReturnButton();
        this.initCounters();
        this.initAnimationQuote();
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
            const head: HTMLInputElement = item.querySelector('[data-datepicker="head"]');

            new AirDatepicker(head, {
                range: true,
                multipleDatesSeparator: '-',
                buttons: ['clear'],

                position({$datepicker, $target, $pointer, done}) {
                    let popper = createPopper($target, $datepicker, {
                        placement: 'bottom',
                        modifiers: [
                            {
                                name: 'flip',
                                options: {
                                    padding: {
                                        top: 64
                                    }
                                }
                            },
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 10]
                                }
                            },
                            {
                                name: 'arrow',
                                options: {
                                    element: $pointer
                                }
                            }
                        ]
                    })
                    return function completeHide() {
                        popper.destroy();
                        done();
                    }
                },

                onSelect({ formattedDate }) {
                    if (Array.isArray(formattedDate)) {
                        input.value = formattedDate.join(' - ');
                    } else {
                        input.value = formattedDate || '';
                    }
                    head.value = 'Дата';
                },
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

    initTitle = () => {
        const els: NodeListOf<HTMLElement> = document.querySelectorAll('[data-title="block"]');

        els.forEach((item) => {
            new Title(item);
        });
    }

    initCarousel = () => {
        const els: NodeListOf<HTMLElement> = document.querySelectorAll('[data-carousel="block"]');

        const setCaption = (instance: any, el: HTMLElement) => {
            const index = instance.page;
            const slide = instance.slides[index];

            // console.log(instance.slides);

            el.innerHTML = slide.el.getAttribute('data-caption');
        }

        els.forEach((item) => {
            const main: HTMLElement = item.querySelector('[data-carousel="main"]');
            const caption: HTMLElement = item.querySelector('[data-carousel="caption"]');

            new Carousel(main, {
                Thumbs: {
                    type: "classic" as const,
                },
                Dots: false,
                on: {
                    ready: (instance: any) => setCaption(instance, caption),
                    change: (instance: any) => setCaption(instance, caption),
                },
            }, { Thumbs });
        })
    }

    initSlider = () => {
        const els: NodeListOf<HTMLElement> = document.querySelectorAll('[data-slider]');

        els.forEach((item) => new Slider(item));
    }

    initAnimations = () => {
        const elsSplit: NodeListOf<HTMLElement> = document.querySelectorAll('[data-animate="fadeInSplit"]');

        elsSplit.forEach((item) => {
            const { chars } = splitText(item, { chars: true });

            onVisible(item, () => {
                animate(chars, {
                    opacity: { from: 0 },
                    y:       { from: 40, to: 0 },
                    duration: 1250,
                    ease: 'out(3)',
                    delay: stagger(50),
                });
            });
        });
    }

    initAnimationQuote = () => {
        const els: NodeListOf<HTMLElement> = document.querySelectorAll('[data-animate="quote"]');

        els.forEach((item) => {
            onVisible(item, () => {
                animate(item, {
                    translateX: ['-100%', '0%'],
                    duration: 800,
                    ease: 'easeOutExpo',
                });
            });
        });
    }

    initCounters = () => {
        const elsSplit: NodeListOf<HTMLElement> = document.querySelectorAll('[data-animate="counter"]');

        elsSplit.forEach((item) => {
            onVisible(item, () => {
                new Counter(item, { duration: 3000 });
            });
        });
    }

    initSpotlightCard = () => {
        const els: NodeListOf<HTMLElement> = document.querySelectorAll('[data-spotlight-card="block"]');

        els.forEach((item) => {
            new SpotlightCard(item);
        });
    }

    initReturnButton = () => {
        const el: HTMLElement = document.querySelector('[data-return-button="block"]');

        if (el) new ButtonReturn(el);
    }
}

export {App};

