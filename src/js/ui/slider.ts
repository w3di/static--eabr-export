import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from "swiper";
import {
    Navigation,
    Pagination,
} from 'swiper/modules';

class Slider {
    sliderInstance: Swiper | null = null;

    constructor(el: HTMLElement) {
        const mode = el.getAttribute('data-slider');

        if (mode === 'intro') this.initSliderIntro(el);
        if (mode === 'slider-cards') this.initSliderCards(el);
        if (mode === 'grid') this.initSliderGrid(el);
    }

    initSliderIntro(el: HTMLElement) {
        const pagination = el.querySelector('[data-slider-pagination]');
        const navPrev = el.querySelector('[data-slider-nav="prev"]');
        const navNext = el.querySelector('[data-slider-nav="next"]');

        this.sliderInstance = new Swiper(el, {
            loop: true,
            // spaceBetween: 18,
            // autoHeight: false,
            slidesPerView: 1,
            allowTouchMove: false,
            modules: [Pagination, Navigation],
            pagination: {
                el: pagination,
                clickable: true,
                bulletClass: 'pagination-line__item',
                bulletActiveClass: 'active',
            },
            navigation: {
                nextEl: navNext,
                prevEl: navPrev,
                disabledClass: 'disabled',
            },
        });
    }

    initSliderCards(el: HTMLElement) {
        const pagination = el.querySelector('[data-slider-pagination]');
        const navPrev = el.querySelector('[data-slider-nav="prev"]');
        const navNext = el.querySelector('[data-slider-nav="next"]');

        this.sliderInstance = new Swiper(el, {
            loop: false,
            spaceBetween: 18,
            autoHeight: false,
            slidesPerView: 'auto',
            modules: [Pagination, Navigation],
            pagination: {
                el: pagination,
                clickable: true,
                bulletClass: 'pagination-dots__item',
                bulletActiveClass: 'active',
            },
            navigation: {
                nextEl: navNext,
                prevEl: navPrev,
                disabledClass: 'disabled',
            },
        });
    }

    initSliderGrid(el: HTMLElement) {
        const pagination = el.querySelector('[data-slider-pagination]');

        this.sliderInstance = new Swiper(el, {
            // loop: true,
            enabled: true,
            spaceBetween: 38,
            modules: [Pagination],
            slidesPerView: 'auto',
            autoHeight: false,
            // allowTouchMove: false,
            breakpoints: {
                1261: {
                    enabled: false,
                }
            },
            pagination: {
                el: pagination,
                clickable: true,
                bulletClass: 'pagination-dots__item',
                bulletActiveClass: 'active',
            },
            on: {
                breakpoint: (el: Swiper) => {
                    console.log('Удаляем стили');

                    if (!el.params.enabled) {
                        this.removeInlineStyles(el);
                    }
                }
            }
        });
    }

    removeInlineStyles = (el: Swiper) => {
        el.wrapperEl.removeAttribute('style');

        setTimeout(() => {
            console.log(el.slides);

            el.slides.forEach((item: Element) => {
                item.removeAttribute('style');
            });
        }, 0);
    }
}

export {
    Slider,
}
