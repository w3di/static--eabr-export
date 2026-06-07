import { App } from './main/lib/logic/app/app';
import { I18n } from './main/lib/logic/i18n/i18n';
import './main/lib/sprite';
import 'the-new-css-reset/css/reset.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.scss';

declare global {
  interface Window {
    app: App;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await new I18n().init();
  window.app = new App();
});
