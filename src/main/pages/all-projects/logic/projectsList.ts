import i18next from 'i18next';
import { filterState } from '../../../lib/logic/ui/filterState';
import { ROUTES } from '../../../lib/logic/routes';
import { Tooltip } from '../../../lib/logic/ui/tooltip';
import { ProjectsApi, type ProjectsResponse } from './projectsApi';
import { type Project } from './projectsData';

const FILTER_KEYS = ['q', 'type', 'date', 'industry'];

class ProjectsList {
  private section: HTMLElement;
  private cards: HTMLElement;
  private status: HTMLElement | null;
  private nav: HTMLElement | null;
  private list: HTMLElement | null;
  private prevBtn: HTMLElement | null;
  private nextBtn: HTMLElement | null;
  private last: ProjectsResponse | null = null;
  private reqId = 0;
  private mobile = window.matchMedia('(max-width: 1260px)');

  constructor(section: HTMLElement) {
    this.section = section;
    this.cards = section.querySelector<HTMLElement>('.ap-cards')!;
    this.status = section.querySelector<HTMLElement>('[data-projects-status]');
    this.nav = section.querySelector<HTMLElement>('.ap-pagination');
    this.list =
      this.nav?.querySelector<HTMLElement>('[data-pagination-list]') ?? null;
    this.prevBtn =
      this.nav?.querySelector<HTMLElement>('.ap-pagination__nav--prev') ?? null;
    this.nextBtn =
      this.nav?.querySelector<HTMLElement>('.ap-pagination__nav--next') ?? null;

    this.prevBtn?.addEventListener('click', () =>
      this.go(this.currentPage() - 1),
    );
    this.nextBtn?.addEventListener('click', () =>
      this.go(this.currentPage() + 1),
    );

    filterState.subscribe((key) => this.onFilterChange(key));
    i18next.on('languageChanged', () => this.last && this.render(this.last));
    this.mobile.addEventListener(
      'change',
      () => this.last && this.render(this.last),
    );

    this.applyViewClass();
    this.load(false);
  }

  private onFilterChange(key: string) {
    if (key === 'view') {
      this.applyViewClass();
      if (this.last) this.render(this.last);
      return;
    }
    if (key === 'page') return;
    if (FILTER_KEYS.includes(key)) {
      filterState.set('page', null, true);
      this.load(false);
    }
  }

  private currentPage(): number {
    const n = parseInt(filterState.get('page') || '1', 10);
    return isNaN(n) ? 1 : Math.max(1, n);
  }

  private go(page: number) {
    const total = this.last?.totalPages ?? 1;
    const next = Math.max(1, Math.min(total, page));
    if (next === this.currentPage()) return;
    filterState.set('page', next === 1 ? null : String(next), true);
    this.load(true);
  }

  private async load(scroll: boolean) {
    const id = ++this.reqId;
    this.cards.classList.add('ap-cards--loading');

    const res = await ProjectsApi.fetch({
      q: filterState.get('q'),
      type: filterState.get('type'),
      date: filterState.get('date'),
      industry: filterState.get('industry'),
      page: this.currentPage(),
    });

    if (id !== this.reqId) return;

    if (res.page !== this.currentPage()) {
      filterState.set('page', res.page === 1 ? null : String(res.page), true);
    }

    this.last = res;
    this.cards.classList.remove('ap-cards--loading');
    this.render(res);

    if (scroll) this.scrollToTop();
  }

  private render(res: ProjectsResponse) {
    this.applyViewClass();

    if (!res.items.length) {
      this.cards.innerHTML = '';
      this.renderEmpty();
      this.renderPagination(res);
      return;
    }

    this.hideStatus();
    const isTable = this.isTableView();
    this.cards.innerHTML = isTable
      ? this.tableMarkup(res.items)
      : res.items.map((p) => this.cardMarkup(p)).join('');

    if (!isTable) {
      this.cards
        .querySelectorAll<HTMLElement>('[data-tooltip]')
        .forEach((el) => new Tooltip(el));
    }

    this.renderPagination(res);
  }

  private isTableView(): boolean {
    return !this.mobile.matches && filterState.get('view') === '1';
  }

  private applyViewClass() {
    this.cards.classList.toggle('ap-cards--table', this.isTableView());
  }

  private renderEmpty() {
    if (!this.status) return;
    this.status.innerHTML = `
      <span class="ap-projects__status-text">${i18next.t('allProjects.empty')}</span>
      <button class="ap-projects__reset" type="button">${i18next.t('allProjects.filtersReset')}</button>`;
    this.status.hidden = false;
    this.status
      .querySelector<HTMLElement>('.ap-projects__reset')
      ?.addEventListener('click', () => this.resetFilters());
  }

  private hideStatus() {
    if (!this.status) return;
    this.status.innerHTML = '';
    this.status.hidden = true;
  }

  private resetFilters() {
    const btn = document.querySelector<HTMLElement>('[data-filters-reset]');
    if (btn) {
      btn.click();
    } else {
      FILTER_KEYS.forEach((k) => filterState.set(k, null, true));
      filterState.set('page', null, true);
      this.load(false);
    }
  }

  private cardMarkup(p: Project): string {
    return `
      <article class="ap-card">
        <a href="${ROUTES.projectDetail}" class="ap-card__photo" style="background-image: url('${p.image}');">
          <span class="ap-card__arrow" aria-hidden="true">
            <svg viewBox="0 0 18 18" fill="none">
              <use href="/assets/sprite/sprite-svg.svg#icon-corner"></use>
            </svg>
          </span>
        </a>
        <div class="ap-card__body">
          <div class="ap-card__info">
            <h3 class="ap-card__title">${p.title}</h3>
            <div class="ap-card__sums">
              <div class="ap-card__sum">
                <div class="ap-card__sum-val ap-card__sum-val--dark">
                  <span class="ap-card__sum-num">${p.amount.value}</span><span class="ap-card__sum-unit">${p.amount.unit}</span>
                </div>
                <div class="ap-card__sum-lbl ap-card__sum-lbl--dark">${i18next.t('allProjects.sumLabel')}</div>
              </div>
              <div class="ap-card__sum">
                <div class="ap-card__sum-val ap-card__sum-val--green">
                  <span class="ap-card__sum-num">${p.bank.value}</span><span class="ap-card__sum-unit">${p.bank.unit}</span>
                </div>
                <div class="ap-card__sum-lbl ap-card__sum-lbl--green">${i18next.t('allProjects.bankLabel')}</div>
              </div>
            </div>
          </div>
          <div class="ap-card__meta">
            <div class="ap-card__meta-left">
              <div class="ap-card__country">
                <span class="ap-card__flag" style="background-image: url('${p.country.flag}');"></span>
                <span>${p.country.name}</span>
              </div>
              <div class="ap-card__year">${p.year}</div>
            </div>
            <div class="ap-card__awards">${this.awardsMarkup(p)}</div>
          </div>
        </div>
      </article>`;
  }

  private awardsMarkup(p: Project): string {
    const parts: string[] = [];
    if (p.awards.ij) {
      parts.push(`
        <span class="ap-card__award-wrap" data-tooltip>
          <img class="ap-card__award ap-card__award--ij" src="/assets/images/awards/ij-global.webp" alt="IJ Global Awards 2021" loading="lazy">
          <span class="ap-card__tooltip js-tooltip">${i18next.t('allProjects.awards.ij')}</span>
        </span>`);
    }
    if (p.awards.esg) {
      parts.push(`
        <span class="ap-card__award-wrap" data-tooltip>
          <img class="ap-card__award ap-card__award--esg" src="/assets/images/awards/esg.webp" alt="ESG" loading="lazy">
          <span class="ap-card__tooltip js-tooltip">${i18next.t('allProjects.awards.esg')}</span>
        </span>`);
    }
    return parts.join('');
  }

  private typeShort(type: number): string {
    const map: Record<number, string> = {
      1: 'Кредит.',
      2: 'Гарант.',
      3: 'Инвест.',
      4: 'Софин.',
      5: 'Лизинг',
    };
    return map[type] || '—';
  }

  private statusLabel(status: Project['status']): string {
    return i18next.t(
      status === 'done'
        ? 'allProjects.statusDone'
        : 'allProjects.statusCurrent',
    );
  }

  private categoryBadge(category: Project['category']): string {
    if (category === 'esg') {
      return `<span class="ap-cat ap-cat--esg">
        <svg class="ap-cat__leaf" viewBox="0 0 256 256" aria-hidden="true"><use href="/assets/sprite/sprite-svg.svg#icon-leaf"></use></svg>
        <span class="ap-cat__txt">ESG</span>
      </span>`;
    }
    if (category === 'ppp') {
      return `<span class="ap-cat ap-cat--ppp"><span class="ap-cat__txt">${i18next.t('allProjects.catPpp')}</span></span>`;
    }
    return `<span class="ap-cat ap-cat--mega"><span class="ap-cat__mega">${i18next.t('allProjects.catMega')}</span></span>`;
  }

  private tableMarkup(items: Project[]): string {
    const rows = items
      .map(
        (p) => `
        <a href="${ROUTES.projectDetail}" class="ap-table__row">
          <span class="ap-table__cell ap-table__cell--title">${p.title}</span>
          <span class="ap-table__cell ap-table__cell--num">${p.amount.value}</span>
          <span class="ap-table__cell">${this.typeShort(p.type)}</span>
          <span class="ap-table__cell ap-table__cell--muted">${p.partner}</span>
          <span class="ap-table__cell">${p.participation}</span>
          <span class="ap-table__cell ap-table__cell--num">${p.year}</span>
          <span class="ap-table__cell">${this.statusLabel(p.status)}</span>
          <span class="ap-table__cell ap-table__cell--cat">${this.categoryBadge(p.category)}</span>
        </a>`,
      )
      .join('');

    return `
      <div class="ap-table">
        <div class="ap-table__head">
          <span class="ap-table__th ap-table__cell--title">${i18next.t('allProjects.tableName')}</span>
          <span class="ap-table__th">${i18next.t('allProjects.tableAmount')}</span>
          <span class="ap-table__th">${i18next.t('allProjects.typeFilter')}</span>
          <span class="ap-table__th">${i18next.t('allProjects.tablePartner')}</span>
          <span class="ap-table__th">${i18next.t('allProjects.tableParticipation')}</span>
          <span class="ap-table__th">${i18next.t('allProjects.tableYear')}</span>
          <span class="ap-table__th">${i18next.t('allProjects.tableStatus')}</span>
          <span class="ap-table__th">${i18next.t('allProjects.tableCategory')}</span>
        </div>
        ${rows}
      </div>`;
  }

  private buildPages(total: number, current: number): Array<number | '...'> {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: Array<number | '...'> = [1];
    const left = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < total - 1) pages.push('...');
    pages.push(total);
    return pages;
  }

  private renderPagination(res: ProjectsResponse) {
    if (!this.nav || !this.list) return;
    this.nav.dataset.totalPages = String(res.totalPages);
    this.nav.hidden = res.totalPages <= 1;

    this.list.innerHTML = '';
    this.buildPages(res.totalPages, res.page).forEach((p) => {
      const li = document.createElement('li');
      li.className = 'ap-pagination__item';
      if (p === '...') {
        li.classList.add('ap-pagination__item--gap');
        const span = document.createElement('span');
        span.textContent = '...';
        li.appendChild(span);
      } else {
        if (p === res.page) li.classList.add('ap-pagination__item--active');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = String(p);
        a.addEventListener('click', (e) => {
          e.preventDefault();
          this.go(p as number);
        });
        li.appendChild(a);
      }
      this.list!.appendChild(li);
    });

    this.prevBtn?.classList.toggle(
      'ap-pagination__nav--disabled',
      res.page <= 1,
    );
    this.nextBtn?.classList.toggle(
      'ap-pagination__nav--disabled',
      res.page >= res.totalPages,
    );
  }

  private scrollToTop() {
    const anchor = (this.cards.firstElementChild as HTMLElement) || this.cards;
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export { ProjectsList };
