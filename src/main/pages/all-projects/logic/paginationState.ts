import { filterState } from '../../../lib/logic/ui/filterState';

class PaginationState {
  private nav: HTMLElement;
  private list: HTMLElement;
  private prevBtn: HTMLElement | null;
  private nextBtn: HTMLElement | null;
  private total: number;
  private current: number;

  constructor(nav: HTMLElement) {
    this.nav = nav;
    this.list = nav.querySelector<HTMLElement>('[data-pagination-list]')!;
    this.prevBtn = nav.querySelector<HTMLElement>('.ap-pagination__nav--prev');
    this.nextBtn = nav.querySelector<HTMLElement>('.ap-pagination__nav--next');
    this.total = parseInt(nav.dataset.totalPages || '1', 10);

    const initial = parseInt(filterState.get('page') || '1', 10);
    this.current = this.clamp(isNaN(initial) ? 1 : initial);

    this.prevBtn?.addEventListener('click', () => this.go(this.current - 1));
    this.nextBtn?.addEventListener('click', () => this.go(this.current + 1));

    this.render();
  }

  private clamp(n: number): number {
    return Math.max(1, Math.min(this.total, n));
  }

  private go(page: number) {
    const next = this.clamp(page);
    if (next === this.current) return;
    this.current = next;
    filterState.set('page', next === 1 ? null : String(next));
    this.render();
  }

  private buildPages(): Array<number | '...'> {
    const t = this.total;
    const c = this.current;
    if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1);

    const pages: Array<number | '...'> = [1];
    const left = Math.max(2, c - 1);
    const right = Math.min(t - 1, c + 1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < t - 1) pages.push('...');
    pages.push(t);
    return pages;
  }

  private render() {
    this.list.innerHTML = '';
    this.buildPages().forEach((p) => {
      const li = document.createElement('li');
      li.className = 'ap-pagination__item';
      if (p === '...') {
        li.classList.add('ap-pagination__item--gap');
        const span = document.createElement('span');
        span.textContent = '...';
        li.appendChild(span);
      } else {
        if (p === this.current) li.classList.add('ap-pagination__item--active');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = String(p);
        a.addEventListener('click', (e) => {
          e.preventDefault();
          this.go(p as number);
        });
        li.appendChild(a);
      }
      this.list.appendChild(li);
    });

    this.prevBtn?.classList.toggle(
      'ap-pagination__nav--disabled',
      this.current <= 1,
    );
    this.nextBtn?.classList.toggle(
      'ap-pagination__nav--disabled',
      this.current >= this.total,
    );
  }
}

export { PaginationState };
