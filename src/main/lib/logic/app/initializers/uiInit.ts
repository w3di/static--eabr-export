import { Header } from '../../ui/header';
import { MobileMenu } from '../../ui/mobileMenu';
import { AsideObserver } from '../../ui/asideObserver';
import { ButtonReturn } from '../../ui/buttonReturn';
import { Title } from '../../ui/title';
import { SpotlightCard } from '../../ui/spotlightCard';
import { Tabs } from '../../ui/tabs';
import { ReadMore } from '../../ui/readMore';
import { SectionNav } from '../../ui/sectionNav';

class UiInit {
  constructor() {
    this.header();
    this.mobileMenu();
    this.sectionNav();
    this.asideObserver();
    this.returnButton();
    this.title();
    this.spotlightCards();
    this.switcher();
    this.tabs();
    this.readMore();
  }

  private header() {
    const el = document.querySelector<HTMLElement>('[data-header]');
    if (el) new Header(el);
  }

  private mobileMenu() {
    const el = document.querySelector<HTMLElement>('[data-mobile-menu]');
    if (el) new MobileMenu(el);
  }

  private sectionNav() {
    if (document.querySelector('.nav-aside, .nav-drawer')) new SectionNav();
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

  private tabs() {
    document
      .querySelectorAll<HTMLElement>('[data-tabset]')
      .forEach((el) => new Tabs(el));
  }

  private readMore() {
    document
      .querySelectorAll<HTMLElement>('[data-readmore]')
      .forEach((el) => new ReadMore(el));
  }
}

export { UiInit };
