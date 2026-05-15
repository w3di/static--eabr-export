import type { SwiperOptions } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';

export const spotlightConfig = (el: HTMLElement): SwiperOptions => {
  const pagination = el.querySelector<HTMLElement>('[data-slider-pagination]');
  const navPrev = el.querySelector<HTMLElement>('[data-slider-nav="prev"]');
  const navNext = el.querySelector<HTMLElement>('[data-slider-nav="next"]');

  return {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 80,
    breakpoints: {
      1261: { spaceBetween: 0 },
    },
    modules: [Pagination, Navigation],
    pagination: {
      el: pagination,
      clickable: true,
      bulletClass: 'hr-spotlight__dot',
      bulletActiveClass: 'hr-spotlight__dot--active',
    },
    navigation: {
      nextEl: navNext,
      prevEl: navPrev,
      disabledClass: 'disabled',
    },
  };
};
