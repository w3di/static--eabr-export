import { IslamicForm } from '../../../../pages/islamic-finance/logic/islamicForm';
import { FtsForm } from '../../../../pages/fts/logic/ftsForm';
import { ComplianceForm } from '../../../../pages/investors/logic/complianceForm';
import { CountryAccordion } from '../../../../pages/contacts/logic/countryAccordion';
import { FilterDropdowns } from '../../../../pages/all-projects/logic/filterDropdowns';
import { SearchFilter } from '../../../../pages/all-projects/logic/searchFilter';
import { ProjectsList } from '../../../../pages/all-projects/logic/projectsList';
import { PppNewsList } from '../../../../pages/ppp-news/logic/pppNewsList';
import { NavDrawer } from '../../ui/navDrawer';
import { StepsLineFill } from '../../ui/stepsLineFill';
import { CityMapPins } from '../../ui/cityMapPins';
import { ValuesAccordion } from '../../ui/valuesAccordion';
import { FaqAccordion } from '../../ui/faqAccordion';
import { PhotoCarousel } from '../../ui/photoCarousel';
import { PosterVideo } from '../../ui/posterVideo';
import { Tooltip } from '../../ui/tooltip';
import { GalleryCopyright } from '../../../../pages/project-bakad/logic/galleryCopyright';

class PageInit {
  constructor() {
    this.islamicForm();
    this.ftsForm();
    this.complianceForm();
    this.countryAccordions();
    this.navDrawers();
    this.stepsLineFill();
    this.cityMapPins();
    this.valuesAccordions();
    this.filterDropdowns();
    this.searchFilters();
    this.projectsList();
    this.pppNewsList();
    this.faqAccordions();
    this.photoCarousels();
    this.posterVideos();
    this.tooltips();
    this.galleryCopyright();
  }

  private galleryCopyright() {
    document
      .querySelectorAll<HTMLElement>('.pb-gallery')
      .forEach((el) => new GalleryCopyright(el));
  }

  private tooltips() {
    document
      .querySelectorAll<HTMLElement>('[data-tooltip]')
      .forEach((el) => new Tooltip(el));
  }

  private photoCarousels() {
    document
      .querySelectorAll<HTMLElement>('[data-pc]')
      .forEach((el) => new PhotoCarousel(el));
  }

  private posterVideos() {
    document
      .querySelectorAll<HTMLElement>('[data-pv]')
      .forEach((el) => new PosterVideo(el));
  }

  private searchFilters() {
    document
      .querySelectorAll<HTMLInputElement>('input[data-filter-key]')
      .forEach((el) => new SearchFilter(el));
  }

  private projectsList() {
    document
      .querySelectorAll<HTMLElement>('.ap-projects')
      .forEach((el) => new ProjectsList(el));
  }

  private pppNewsList() {
    document
      .querySelectorAll<HTMLElement>('[data-pnews-cards]')
      .forEach((el) => new PppNewsList(el));
  }

  private faqAccordions() {
    document
      .querySelectorAll<HTMLDetailsElement>(
        '.fts-faq__item, .kp-item, .ppp-acc__item, .inv-faq__item',
      )
      .forEach((el) => new FaqAccordion(el));
  }

  private ftsForm() {
    const el = document.querySelector<HTMLFormElement>('[data-fts-form]');
    if (el) new FtsForm(el);
  }

  private complianceForm() {
    const el = document.querySelector<HTMLFormElement>('[data-inv-form]');
    if (el) new ComplianceForm(el);
  }

  private filterDropdowns() {
    const wraps = Array.from(
      document.querySelectorAll<HTMLElement>('[data-dropdown-wrap]'),
    );
    if (wraps.length) new FilterDropdowns(wraps);
  }

  private valuesAccordions() {
    document
      .querySelectorAll<HTMLElement>('[data-careers-values]')
      .forEach((el) => new ValuesAccordion(el));
  }

  private stepsLineFill() {
    document
      .querySelectorAll<HTMLElement>('.hr-steps')
      .forEach((el) => new StepsLineFill(el));
  }

  private cityMapPins() {
    const desktopPins = Array.from(
      document.querySelectorAll<HTMLElement>('.hr-pin.mob-hidden'),
    );
    if (desktopPins.length) new CityMapPins(desktopPins, 'mouseenter');

    const mobilePins = Array.from(
      document.querySelectorAll<HTMLElement>('.hr-pin.mob-visible'),
    );
    if (mobilePins.length) new CityMapPins(mobilePins, 'click');
  }

  private islamicForm() {
    const el = document.querySelector<HTMLFormElement>('[data-isl-form]');
    if (el) new IslamicForm(el);
  }

  private countryAccordions() {
    document
      .querySelectorAll<HTMLInputElement>(
        '.contacts-country__toggle, .ppp-gov__toggle',
      )
      .forEach((el) => new CountryAccordion(el));
  }

  private navDrawers() {
    document
      .querySelectorAll<HTMLElement>('.nav-drawer')
      .forEach((el) => new NavDrawer(el));
  }
}

export { PageInit };
