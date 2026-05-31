import type { SwiperOptions } from 'swiper/types';
import { Navigation } from 'swiper/modules';

export const ftsConfig = (el: HTMLElement): SwiperOptions => {
  const scope = el.closest<HTMLElement>('.fts-projects') ?? el;
  const navPrev = scope.querySelector<HTMLElement>('[data-fts-track-prev]');
  const navNext = scope.querySelector<HTMLElement>('[data-fts-track-next]');

  return {
    loop: true,
    loopAdditionalSlides: 4,
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 18,
    speed: 500,
    threshold: 5,
    longSwipesRatio: 0.2,
    longSwipesMs: 250,
    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 14,
      },
      1261: {
        slidesPerView: 'auto',
        spaceBetween: 18,
      },
    },
    modules: [Navigation],
    navigation: {
      nextEl: navNext,
      prevEl: navPrev,
      disabledClass: 'is-disabled',
    },
    on: {
      init: (swiper) => {
        swiper.slides.forEach((slide) =>
          slide.classList.remove('fts-project--full'),
        );
      },
      click: (swiper) => {
        const clickedIndex = swiper.clickedIndex;
        if (
          typeof clickedIndex !== 'number' ||
          clickedIndex === swiper.activeIndex
        ) {
          return;
        }
        swiper.slideTo(clickedIndex, 500);
      },
    },
  };
};
