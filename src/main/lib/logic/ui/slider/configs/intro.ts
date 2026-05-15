import type { SwiperOptions } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';

export const introConfig = (el: HTMLElement): SwiperOptions => {
  const pagination = el.querySelector<HTMLElement>('[data-slider-pagination]');
  const navPrev = el.querySelector<HTMLElement>('[data-slider-nav="prev"]');
  const navNext = el.querySelector<HTMLElement>('[data-slider-nav="next"]');

  return {
    loop: true,
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
  };
};
