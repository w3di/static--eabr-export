import i18next from 'i18next';
import { filterState } from '../../../lib/logic/ui/filterState';
import { ROUTES } from '../../../lib/logic/routes';
import { PppNewsApi, type PppNewsResponse } from './pppNewsApi';
import { type PppNews } from './pppNewsData';

const FILTER_KEYS = ['q', 'date'];

class PppNewsList {
  private root: HTMLElement;
  private cards: HTMLElement;
  private status: HTMLElement | null;
  private nav: HTMLElement | null;
  private list: HTMLElement | null;
  private prevBtn: HTMLElement | null;
  private nextBtn: HTMLElement | null;
  private last: PppNewsResponse | null = null;
  private reqId = 0;

  constructor(cards: HTMLElement) {
    this.cards = cards;
    this.root = cards.closest<HTMLElement>('.articles-content') || cards;
    this.status = this.root.querySelector<HTMLElement>('[data-pnews-status]');
    this.nav = this.root.querySelector<HTMLElement>('.ap-pagination');
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

    this.load(false);
  }

  private onFilterChange(key: string) {
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
    this.cards.classList.add('is-loading');

    const res = await PppNewsApi.fetch({
      q: filterState.get('q'),
      date: filterState.get('date'),
      page: this.currentPage(),
    });

    if (id !== this.reqId) return;

    if (res.page !== this.currentPage()) {
      filterState.set('page', res.page === 1 ? null : String(res.page), true);
    }

    this.last = res;
    this.cards.classList.remove('is-loading');
    this.render(res);

    if (scroll) this.scrollToTop();
  }

  private render(res: PppNewsResponse) {
    if (!res.items.length) {
      this.cards.innerHTML = '';
      this.renderEmpty();
      this.renderPagination(res);
      return;
    }

    this.hideStatus();
    this.cards.innerHTML = res.items.map((n) => this.cardMarkup(n)).join('');
    this.renderPagination(res);
  }

  private cardMarkup(n: PppNews): string {
    const plain = n.video ? '' : ' article-video--plain';
    return `
      <div class="grid__col grid__col--4 grid__col-mob--4">
        <a href="${ROUTES.newsEventsDetail}" class="article-video${plain}">
          <picture class="article-video__picture">
            <img src="${n.image}" alt="${n.title}">
          </picture>
          <div class="article-video__content">
            <time class="article-video__date" datetime="${n.date}">${n.dateLabel}</time>
            <p class="article-video__title">${n.title}</p>
          </div>
        </a>
      </div>`;
  }

  private renderEmpty() {
    if (!this.status) return;
    this.status.innerHTML = `
      <span class="ap-projects__status-text">${i18next.t('pnews.empty')}</span>
      <button class="ap-projects__reset" type="button">${i18next.t('pnews.reset')}</button>`;
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
    this.root
      .querySelectorAll<HTMLElement>('[data-datepicker="head"]')
      .forEach((h) => {
        const dp = (h as { airDatepicker?: { clear?: () => void } })
          .airDatepicker;
        if (dp && typeof dp.clear === 'function') dp.clear();
      });
    this.root
      .querySelectorAll<HTMLInputElement>('input[data-filter-key="q"]')
      .forEach((inp) => {
        inp.value = '';
      });
    filterState.set('q', null, true);
    filterState.set('date', null, true);
    filterState.set('page', null, true);
    this.load(false);
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

  private renderPagination(res: PppNewsResponse) {
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
    this.cards.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export { PppNewsList };
