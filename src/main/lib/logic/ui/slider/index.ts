import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import { introConfig } from './configs/intro';
import { cardsConfig } from './configs/cards';
import { gridConfig } from './configs/grid';
import { regularFullConfig } from './configs/regularFull';
import { spotlightConfig } from './configs/spotlight';
import { perksConfig } from './configs/perks';
import { ftsConfig } from './configs/fts';
import { newsConfig } from './configs/news';
import { analyticsConfig } from './configs/analytics';

class Slider {
  private instance: Swiper | null = null;

  constructor(el: HTMLElement) {
    const mode = el.getAttribute('data-slider');

    switch (mode) {
      case 'intro':
        this.instance = new Swiper(el, introConfig(el));
        break;
      case 'slider-cards':
        this.instance = new Swiper(el, cardsConfig(el));
        break;
      case 'grid':
        this.instance = new Swiper(el, gridConfig(el));
        break;
      case 'regular-full':
        this.instance = new Swiper(el, regularFullConfig(el));
        break;
      case 'spotlight':
        this.instance = new Swiper(el, spotlightConfig(el));
        break;
      case 'perks':
        this.initMobileOnly(el, perksConfig);
        break;
      case 'analytics':
        this.initMobileOnly(el, analyticsConfig);
        break;
      case 'fts':
        this.instance = new Swiper(el, ftsConfig(el));
        break;
      case 'news':
        this.instance = new Swiper(el, newsConfig(el));
        break;
    }
  }

  private initMobileOnly(
    el: HTMLElement,
    configFactory: (el: HTMLElement) => SwiperOptions,
  ) {
    const enable = () => {
      if (this.instance) return;
      this.instance = new Swiper(el, configFactory(el));
    };
    const disable = () => {
      if (!this.instance) return;
      this.instance.destroy(true, true);
      this.instance = null;
    };

    const mq = window.matchMedia('(max-width: 1260px)');
    const sync = () => (mq.matches ? enable() : disable());
    sync();
    mq.addEventListener('change', sync);
  }
}

export { Slider };
