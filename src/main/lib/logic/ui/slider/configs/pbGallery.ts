import type { SwiperOptions } from 'swiper/types';
import { Pagination, A11y, Keyboard } from 'swiper/modules';

export const pbGalleryConfig = (el: HTMLElement): SwiperOptions => {
  const pagination = el.querySelector<HTMLElement>('[data-slider-pagination]');

  return {
    slidesPerView: 1,
    spaceBetween: 12,
    modules: [Pagination, A11y, Keyboard],
    pagination: {
      el: pagination,
      clickable: true,
      bulletClass: 'pb-gallery__dot',
      bulletActiveClass: 'pb-gallery__dot--active',
    },
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: { enabled: true },
  };
};
