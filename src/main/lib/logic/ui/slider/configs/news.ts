import type { SwiperOptions } from 'swiper/types';
import { Navigation } from 'swiper/modules';

export const newsConfig = (el: HTMLElement): SwiperOptions => {
  const scope = el.closest<HTMLElement>('.fts-news-slider') ?? el;
  const navPrev = scope.querySelector<HTMLElement>('[data-news-prev]');
  const navNext = scope.querySelector<HTMLElement>('[data-news-next]');

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
  };
};
