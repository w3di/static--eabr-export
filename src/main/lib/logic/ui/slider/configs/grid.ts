import type { SwiperOptions } from 'swiper/types';
import type Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { removeInlineStyles } from '../utils';

export const gridConfig = (el: HTMLElement): SwiperOptions => {
  const pagination = el.querySelector<HTMLElement>('[data-slider-pagination]');

  return {
    enabled: true,
    spaceBetween: 38,
    modules: [Pagination],
    slidesPerView: 'auto',
    autoHeight: false,
    breakpoints: {
      1261: { enabled: false },
    },
    pagination: {
      el: pagination,
      clickable: true,
      bulletClass: 'pagination-dots__item',
      bulletActiveClass: 'active',
    },
    on: {
      breakpoint: (swiper: Swiper) => {
        if (!swiper.params.enabled) removeInlineStyles(swiper);
      },
    },
  };
};
