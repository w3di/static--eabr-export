import type { SwiperOptions } from 'swiper/types';
import { Pagination, A11y, Keyboard } from 'swiper/modules';

export const perksConfig = (el: HTMLElement): SwiperOptions => {
  const pagination = el.querySelector<HTMLElement>('[data-slider-pagination]');

  return {
    slidesPerView: 1,
    spaceBetween: 16,
    modules: [Pagination, A11y, Keyboard],
    pagination: {
      el: pagination,
      clickable: true,
      bulletClass: 'hr-perks-swiper__dot',
      bulletActiveClass: 'hr-perks-swiper__dot--active',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    a11y: {
      enabled: true,
    },
  };
};
