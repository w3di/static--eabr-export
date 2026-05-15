import { UiInit } from './initializers/uiInit';
import { SliderInit } from './initializers/sliderInit';
import { FormInit } from './initializers/formInit';
import { AnimationInit } from './initializers/animationInit';
import { PageInit } from './initializers/pageInit';

class App {
  constructor() {
    new UiInit();
    new FormInit();
    new SliderInit();
    new AnimationInit();
    new PageInit();
  }
}

export { App };
