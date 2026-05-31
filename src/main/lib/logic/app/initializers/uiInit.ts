import { Header } from '../../ui/header';
import { MobileMenu } from '../../ui/mobileMenu';
import { AsideObserver } from '../../ui/asideObserver';
import { ButtonReturn } from '../../ui/buttonReturn';
import { Title } from '../../ui/title';
import { SpotlightCard } from '../../ui/spotlightCard';

class UiInit {
  constructor() {
    this.header();
    this.mobileMenu();
    this.asideObserver();
    this.returnButton();
    this.title();
    this.spotlightCards();
    this.switcher();
  }

  private header() {
    const el = document.querySelector<HTMLElement>('[data-header]');
    if (el) new Header(el);
  }

  private mobileMenu() {
    const el = document.querySelector<HTMLElement>('[data-mobile-menu]');
    if (el) new MobileMenu(el);
  }

  private asideObserver() {
    const el = document.querySelector<HTMLElement>('[data-aside-line="block"]');
    if (el) new AsideObserver(el);
  }

  private returnButton() {
    const el = document.querySelector<HTMLElement>(
      '[data-return-button="block"]',
    );
    if (el) new ButtonReturn(el);
  }

  private title() {
    document
      .querySelectorAll<HTMLElement>('[data-title="block"]')
      .forEach((item) => new Title(item));
  }

  private spotlightCards() {
    document
      .querySelectorAll<HTMLElement>('[data-spotlight-card="block"]')
      .forEach((item) => new SpotlightCard(item));
  }

  private switcher() {
    document.querySelectorAll('[data-switcher]').forEach((el) => {
      el.addEventListener('click', () => el.classList.toggle('active'));
    });
  }
}

export { UiInit };
