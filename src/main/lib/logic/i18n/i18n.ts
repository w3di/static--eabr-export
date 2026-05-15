import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ru } from './locales/ru';
import { en } from './locales/en';
import { zh } from './locales/zh';
import { ar } from './locales/ar';

const SUPPORTED = ['ru', 'en', 'zh', 'ar'] as const;
type Lang = (typeof SUPPORTED)[number];

class I18n {
  private ready: Promise<void>;

  constructor() {
    this.ready = i18next
      .use(LanguageDetector)
      .init({
        fallbackLng: 'ru',
        supportedLngs: [...SUPPORTED],
        nonExplicitSupportedLngs: true,
        resources: {
          ru: { translation: ru },
          en: { translation: en },
          zh: { translation: zh },
          ar: { translation: ar },
        },
        detection: {
          order: ['cookie', 'navigator'],
          caches: ['cookie'],
          lookupCookie: 'i18nextLng',
          cookieMinutes: 60 * 24 * 365,
          cookieDomain: window.location.hostname,
        },
        interpolation: { escapeValue: false },
      })
      .then(() => undefined);

    i18next.on('languageChanged', () => this.apply());
  }

  init = async () => {
    await this.ready;
    this.apply();
    this.bindSwitcher();
  };

  private apply = () => {
    document.documentElement.lang = i18next.language;

    document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      el.innerHTML = i18next.t(key);
    });

    document
      .querySelectorAll<HTMLElement>('[data-i18n-placeholder]')
      .forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (!key) return;
        el.setAttribute('placeholder', i18next.t(key));
      });
  };

  private bindSwitcher = () => {
    document.querySelectorAll<HTMLElement>('[data-i18n-lang]').forEach((el) => {
      const lang = el.getAttribute('data-i18n-lang') as Lang;
      if (lang === i18next.language) el.classList.add('active');

      el.addEventListener('click', (e) => {
        e.preventDefault();
        if (lang && SUPPORTED.includes(lang)) {
          i18next.changeLanguage(lang);
        }
      });
    });
  };
}

export { I18n };
export type { Lang };
