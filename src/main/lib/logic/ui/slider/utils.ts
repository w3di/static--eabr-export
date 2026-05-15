import type Swiper from 'swiper';

export const removeInlineStyles = (swiper: Swiper) => {
  swiper.wrapperEl.removeAttribute('style');
  setTimeout(() => {
    swiper.slides.forEach((item: Element) => item.removeAttribute('style'));
  }, 0);
};
