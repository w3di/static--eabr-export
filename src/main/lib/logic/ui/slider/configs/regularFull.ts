import type { SwiperOptions } from 'swiper/types';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

export const regularFullConfig = (el: HTMLElement): SwiperOptions => {
  const pagination = el.querySelector<HTMLElement>('[data-slider-pagination]');
  const navPrev = el.querySelector<HTMLElement>('[data-slider-nav="prev"]');
  const navNext = el.querySelector<HTMLElement>('[data-slider-nav="next"]');

  return {
    loop: false,
    autoHeight: true,
    slidesPerView: 1,
    modules: [Pagination, Navigation, EffectFade],
    slideActiveClass: 'active',
    effect: 'fade',
    pagination: {
      el: pagination,
      clickable: true,
      bulletClass: 'pagination-dots__item',
      bulletActiveClass: 'active',
    },
    navigation: {
      nextEl: navNext,
      prevEl: navPrev,
      disabledClass: 'disabled',
    },
  };
};
