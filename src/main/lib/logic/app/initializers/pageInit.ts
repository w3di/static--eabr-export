import { IslamicForm } from '../../../../pages/islamic-finance/logic/islamicForm';
import { FtsForm } from '../../../../pages/fts/logic/ftsForm';
import { CountryAccordion } from '../../../../pages/contacts/logic/countryAccordion';
import { FilterDropdowns } from '../../../../pages/all-projects/logic/filterDropdowns';
import { SearchFilter } from '../../../../pages/all-projects/logic/searchFilter';
import { PaginationState } from '../../../../pages/all-projects/logic/paginationState';
import { NavDrawer } from '../../ui/navDrawer';
import { StepsLineFill } from '../../ui/stepsLineFill';
import { CityMapPins } from '../../ui/cityMapPins';
import { ValuesAccordion } from '../../ui/valuesAccordion';
import { FaqAccordion } from '../../ui/faqAccordion';
import { PhotoCarousel } from '../../ui/photoCarousel';
import { PosterVideo } from '../../ui/posterVideo';

class PageInit {
  constructor() {
    this.islamicForm();
    this.ftsForm();
    this.countryAccordions();
    this.navDrawers();
    this.stepsLineFill();
    this.cityMapPins();
    this.valuesAccordions();
    this.filterDropdowns();
    this.searchFilters();
    this.paginationState();
    this.faqAccordions();
    this.photoCarousels();
    this.posterVideos();
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

  private paginationState() {
    document
      .querySelectorAll<HTMLElement>('.ap-pagination')
      .forEach((el) => new PaginationState(el));
  }

  private faqAccordions() {
    document
      .querySelectorAll<HTMLDetailsElement>('.fts-faq__item, .kp-item')
      .forEach((el) => new FaqAccordion(el));
  }

  private ftsForm() {
    const el = document.querySelector<HTMLFormElement>('[data-fts-form]');
    if (el) new FtsForm(el);
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
      .querySelectorAll<HTMLInputElement>('.contacts-country__toggle')
      .forEach((el) => new CountryAccordion(el));
  }

  private navDrawers() {
    document
      .querySelectorAll<HTMLElement>('.nav-drawer')
      .forEach((el) => new NavDrawer(el));
  }
}

export { PageInit };
