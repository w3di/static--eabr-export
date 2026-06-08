import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ru } from './locales/ru';
import { en } from './locales/en';
import { zh } from './locales/zh';

const SUPPORTED = ['ru', 'en', 'zh'] as const;
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
    const lang = i18next.language as Lang;
    document.documentElement.lang = lang;

    document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      el.innerHTML = i18next.t(key);
    });

    const ATTR_MAP: Array<[string, string]> = [
      ['data-i18n-placeholder', 'placeholder'],
      ['data-i18n-aria-label', 'aria-label'],
      ['data-i18n-alt', 'alt'],
      ['data-i18n-title', 'title'],
    ];

    const decodeEntities = (s: string): string => {
      const t = document.createElement('textarea');
      t.innerHTML = s;
      return t.value;
    };

    ATTR_MAP.forEach(([dataAttr, htmlAttr]) => {
      document.querySelectorAll<HTMLElement>(`[${dataAttr}]`).forEach((el) => {
        const key = el.getAttribute(dataAttr);
        if (!key) return;
        el.setAttribute(htmlAttr, decodeEntities(i18next.t(key)));
      });
    });

    this.refreshSwitcherState();
  };

  private refreshSwitcherState = () => {
    const current = i18next.language;
    document.querySelectorAll<HTMLElement>('[data-i18n-lang]').forEach((el) => {
      const lang = el.getAttribute('data-i18n-lang');
      const isActive = lang === current;
      el.classList.toggle('active', isActive);
      if (isActive) {
        el.setAttribute('aria-current', 'true');
      } else {
        el.removeAttribute('aria-current');
      }
    });
  };

  private bindSwitcher = () => {
    document.querySelectorAll<HTMLElement>('[data-i18n-lang]').forEach((el) => {
      const lang = el.getAttribute('data-i18n-lang') as Lang;

      el.addEventListener('click', (e) => {
        e.preventDefault();
        if (lang && SUPPORTED.includes(lang)) {
          i18next.changeLanguage(lang);
        }
      });
    });
    this.refreshSwitcherState();
  };
}

export { I18n };
export type { Lang };
