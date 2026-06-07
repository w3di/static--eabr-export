import { UiInit } from './initializers/uiInit';
import { PageInit } from './initializers/pageInit';

class App {
  constructor() {
    new UiInit();
    new PageInit();
    this.lazyFeatures();
  }

  private async lazyFeatures() {
    if (document.querySelector('[data-slider], [data-carousel="block"]')) {
      const { SliderInit } = await import(
        /* webpackChunkName: "slider" */ './initializers/sliderInit'
      );
      new SliderInit();
    }

    if (document.querySelector('[data-animate]')) {
      const { AnimationInit } = await import(
        /* webpackChunkName: "animation" */ './initializers/animationInit'
      );
      new AnimationInit();
    }

    if (
      document.querySelector(
        '[data-datepicker="block"], [data-select="block"], [data-fancybox]',
      )
    ) {
      const { FormInit } = await import(
        /* webpackChunkName: "form" */ './initializers/formInit'
      );
      new FormInit();
    }
  }
}

export { App };
