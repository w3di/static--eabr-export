import type { SwiperOptions } from 'swiper/types';
import { Pagination, A11y, Keyboard } from 'swiper/modules';

export const analyticsConfig = (el: HTMLElement): SwiperOptions => {
  const pagination = el.querySelector<HTMLElement>('[data-slider-pagination]');

  return {
    slidesPerView: 'auto',
    spaceBetween: 38,
    modules: [Pagination, A11y, Keyboard],
    pagination: {
      el: pagination,
      clickable: true,
      bulletClass: 'ap-analytics__dot',
      bulletActiveClass: 'ap-analytics__dot--active',
    },
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: { enabled: true },
  };
};
