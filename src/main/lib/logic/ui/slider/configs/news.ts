import type { SwiperOptions, SwiperModule } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';

export const newsConfig = (el: HTMLElement): SwiperOptions => {
  const scope = el.closest<HTMLElement>('.fts-news-slider') ?? el;
  const navPrev = scope.querySelector<HTMLElement>('[data-news-prev]');
  const navNext = scope.querySelector<HTMLElement>('[data-news-next]');
  const pagination = scope.querySelector<HTMLElement>('[data-news-pagination]');

  const config: SwiperOptions = {
    slidesPerView: 'auto',
    centerInsufficientSlides: true,
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
  };

  const modules: SwiperModule[] = [];

  if (navPrev && navNext) {
    modules.push(Navigation);
    config.navigation = {
      nextEl: navNext,
      prevEl: navPrev,
      disabledClass: 'is-disabled',
    };
  }

  if (pagination) {
    modules.push(Pagination);
    config.pagination = {
      el: pagination,
      clickable: true,
      bulletClass: 'fts-controls__dot',
      bulletActiveClass: 'fts-controls__dot--active',
    };
  }

  config.modules = modules;

  return config;
};
