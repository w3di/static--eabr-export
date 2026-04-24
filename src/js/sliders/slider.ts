import 'swiper/css';
import Swiper from "swiper";
import 'swiper/css/pagination';
import {Navigation, Pagination} from 'swiper/modules';
import {checkIsMobile} from "../helpers/checkIsMobile";
import { removeInlineStyles } from "./helpers";
import {SwiperSlide} from "swiper/element";

class Slider {
    sliderInstance: Swiper | null = null;
    sliderPagination: Swiper | null = null;

    constructor(el: Element) {
        this.initSlider(el);
    }

    private initSlider(el: Element): void {
        const mode = el.getAttribute('data-slider');

        if (mode === 'season-ticket') this.initSeasonTicketSlider(el);

        if (mode === 'season-ticket-mobile') this.initSeasonTicketSliderMobile(el);

        if (mode === 'intro') this.initIntroSlider(el);

        if (mode === 'tickets') this.initTicketsSlider(el);

        if (mode === 'excerption') this.initExcerptionSlider(el);

        if (mode === 'gallery-caption') this.initPersonsSlider(el);

        if (mode === 'comments') this.initCommentsSlider(el);

        if (mode === 'tablet-scroll') this.initTableScrollSlider(el);

        if (mode === 'reviews') this.initReviewsSlider(el);

        if (mode === 'simple') this.initSimpleSlider(el);

        if (mode === 'ticketsMobile') this.initTicketsMobileSlider(el);

        if (mode === 'filter-inner') this.initFilterInnerSlider(el);

        if (mode === 'preview') this.initSimpleNavSlider(el);

        if (this.sliderInstance) {
            this.initControls(el);
        }
    }

    private initControls(el: Element): void {
        const buttonNext = el.querySelectorAll('[data-button="next"]');
        const buttonPrev = el.querySelectorAll('[data-button="prev"]');

        if (buttonPrev?.length > 0) {
            buttonPrev.forEach((item) => {
                item.addEventListener('click', () => {
                    this.sliderInstance.slidePrev();
                });
            })
        }

        if (buttonNext?.length > 0) {
            buttonNext.forEach((item) => {
                item.addEventListener('click', () => {
                    this.sliderInstance.slideNext();
                });
            })
        }
    }

    private initSeasonTicketSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: true,
            autoHeight: true,
            modules: [Pagination],
            allowTouchMove: false,

            pagination: {
                clickable: true,
                bulletActiveClass: 'active',
                el: '[data-slider-pagination]',
                bulletClass: 'pagination__bullet',
                simulateTouch: false,
                renderBullet: function (index: number, className: string) {
                    let slide = this.slides[index];
                    let content = slide.getAttribute('data-slider-item');
                    return `<button class="${className}" aria-label="Абонемент номер ${content}">${content}</button>`;
                },
            },
        });
    }

    private initSeasonTicketSliderMobile(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: true,
            enabled: true,
            modules: [Pagination],
            allowTouchMove: false,
            breakpoints: {
                1299: {
                    enabled: false,
                }
            },
            on: {
                breakpoint: (el: Swiper) => {
                    if (!el.params.enabled) {
                        removeInlineStyles(el);
                    }
                }
            }
        });
    }

    private initFilterInnerSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: false,
            enabled: true,
            modules: [Pagination],
            slidesPerView: 'auto',
            // allowTouchMove: false,
            breakpoints: {
                1299: {
                    enabled: false,
                }
            },
            on: {
                breakpoint: (el: Swiper) => {
                    if (!el.params.enabled) {
                        removeInlineStyles(el);
                    }
                }
            }
        });
    }

    private initTicketsSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: true,
            enabled: true,
            // simulateTouch: false,
            slideActiveClass: 'active',
            breakpoints: {
                1299: {
                    enabled: false,
                }
            }
            // allowTouchMove: false,
        });
    }

    private initIntroSlider(el: Element): void {
        const pagination = document.querySelector('[data-slider="intro-pagination"]');
        const paginationControls = document.querySelector('[data-slider-pagination]');
        let isUpdating = false; // Флаг для предотвращения циклических вызовов

        if (pagination) {
            const paginationSlider = pagination.querySelector('[data-slider="intro-pagination-content"]');
            const buttonNext = paginationControls.querySelectorAll('[data-button="next"]');
            const buttonPrev = paginationControls.querySelectorAll('[data-button="prev"]');

            this.sliderPagination = new Swiper(paginationSlider, {
                slidesPerView: 5,
                spaceBetween: 16,
                loop: false, // Отключаем loop для пагинации
                slideActiveClass: 'active',
            });

            if (buttonPrev?.length > 0) {
                buttonPrev.forEach((item) => {
                    item.addEventListener('click', () => {
                        this.sliderInstance.slidePrev(); // Переключаем основной слайдер
                    });
                })
            }

            if (buttonNext?.length > 0) {
                buttonNext.forEach((item) => {
                    item.addEventListener('click', () => {
                        this.sliderInstance.slideNext(); // Переключаем основной слайдер
                    });
                })
            }

            this.sliderPagination.on('click', (swiper: Swiper, event: MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();
                const clickedSlideIndex = swiper.clickedIndex;
                this.sliderInstance.slideToLoop(clickedSlideIndex);
                // this.sliderInstance.slideTo(clickedSlideIndex);
            });
        }

        this.sliderInstance = new Swiper(el, {
            slidesPerView: 1,
            autoHeight: true,
            loop: true, // Основной слайдер с бесконечным loop
            slideActiveClass: 'active',
            breakpoints: {
                1299: {
                    // autoHeight: true,
                }
            },
        });

        this.sliderInstance.on('slideChange', () => {
            if (isUpdating || !this.sliderPagination) return;
            isUpdating = true;

            const targetIndex = this.sliderInstance.realIndex;

            const paginationSlides = this.sliderPagination.slides;
            paginationSlides.forEach((slide: SwiperSlide, index: number) => {
                slide.classList.toggle('active', index === targetIndex);
            });

            this.sliderPagination.slideTo(targetIndex);

            isUpdating = false;
        });
    }

    private initExcerptionSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: true,
            slideActiveClass: 'active',
        });
    }

    private initPersonsSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: true,
            slidesPerView: 'auto',
            slideActiveClass: 'active',
            breakpoints: {
                1299: {
                    spaceBetween: 16,
                    slidesPerView: 'auto'
                }
            },
        });
    }

    private initCommentsSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: false,
            spaceBetween: 16,
            autoHeight: false,
            slidesPerView: 'auto',
            slideActiveClass: 'active',
        });
    }

    private initTableScrollSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: false,
            enabled: true,
            slidesPerView: 'auto',
            slideActiveClass: 'active',
            spaceBetween: 16,
            breakpoints: {
                1299: {
                    enabled: false,
                }
            },
            on: {
                breakpoint: (el: Swiper) => {
                    if (!el.params.enabled) {
                        removeInlineStyles(el);
                    }
                },
                resize: (el: Swiper) => {
                    if (!el.params.enabled) {
                        removeInlineStyles(el);
                    }
                }
            }
        });
    }

    private initReviewsSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: true,
            enabled: false,
            slidesPerView: 'auto',
            autoHeight: false,
            // spaceBetween: 10,
            // simulateTouch: false,
            allowTouchMove: false,
            slideActiveClass: 'active',
            breakpoints: {
                1299: {
                    slidesPerView: 2,
                    enabled: true,
                }
            },
            on: {
                breakpoint: (el: Swiper) => {
                    if (!el.params.enabled) {
                        setTimeout(() => {
                            removeInlineStyles(el);
                        }, 200);
                    }
                }
            }
        });
    }

    private initSimpleSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: true,
            enabled: true,
            slidesPerView: 1,
            // simulateTouch: false,
            slideActiveClass: 'active',
            // breakpoints: {
            //     1299: {
            //         enabled: false,
            //     }
            // }
            // allowTouchMove: false,
        });
    }

    private initTicketsMobileSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: true,
            spaceBetween: 16,
            slideActiveClass: 'active',
        });
    }

    private initSimpleNavSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: true,
            enabled: true,
            slidesPerView: 1,
            modules: [Navigation],
            navigation: {
                nextEl: '[data-button="next"]',
                prevEl: '[data-button="prev"]',
            },
            // simulateTouch: false,
            slideActiveClass: 'active',
            // breakpoints: {
            //     1299: {
            //         enabled: false,
            //     }
            // }
            // allowTouchMove: false,
        });
    }
}

export {
    Slider
};
