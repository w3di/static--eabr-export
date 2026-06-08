import { filterState } from '../../../lib/logic/ui/filterState';

class FilterDropdowns {
  private wraps: HTMLElement[];
  private defaults = new WeakMap<HTMLElement, string>();

  constructor(wraps: HTMLElement[]) {
    this.wraps = wraps;
    this.wraps.forEach((wrap) => {
      this.cacheDefault(wrap);
      this.bindToggle(wrap);
      this.bindListItems(wrap);
      this.bindSum(wrap);
      this.applyInitial(wrap);
    });
    document.addEventListener('click', () => this.closeAll());
    this.bindTabs();
    this.bindMobileSheet();
  }

  private bindMobileSheet() {
    const bar = document.querySelector<HTMLElement>('.ap-projects__bar');
    const openBtn = document.querySelector<HTMLElement>('[data-filters-open]');
    if (!bar || !openBtn) return;

    const open = () => {
      bar.classList.add('is-filters-open');
      document.body.classList.add('ap-filters-lock');
    };
    const close = () => {
      bar.classList.remove('is-filters-open');
      document.body.classList.remove('ap-filters-lock');
    };

    openBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      open();
    });

    document
      .querySelectorAll<HTMLElement>('[data-filters-close]')
      .forEach((el) =>
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          close();
        }),
      );

    const resetBtn = document.querySelector<HTMLElement>(
      '[data-filters-reset]',
    );
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.resetAll();
      });
    }
  }

  private resetAll() {
    this.wraps.forEach((wrap) => {
      const head = wrap.querySelector<HTMLElement>('.ap-dropdown__item--head');
      const key = wrap.dataset.filterKey;
      if (head) this.selectItem(wrap, head);
      if (key) filterState.set(key, null);
    });

    document
      .querySelectorAll<HTMLElement>('[data-datepicker="head"]')
      .forEach((h) => {
        const dp = (h as { airDatepicker?: { clear?: () => void } })
          .airDatepicker;
        if (dp && typeof dp.clear === 'function') dp.clear();
      });

    document
      .querySelectorAll<HTMLInputElement>('input[data-filter-key="q"]')
      .forEach((inp) => {
        inp.value = '';
        filterState.set('q', null);
      });
  }

  private bindTabs() {
    document
      .querySelectorAll<HTMLElement>('[data-tabs]')
      .forEach((container) => {
        const tabs = Array.from(
          container.querySelectorAll<HTMLElement>('[data-tab]'),
        );
        const key = container.dataset.filterKey;
        const apply = (idx: string) => {
          container.dataset.active = idx;
          tabs.forEach((t) =>
            t.classList.toggle('ap-view__tab--active', t.dataset.tab === idx),
          );
        };

        if (key) {
          const initial = filterState.get(key);
          if (initial !== null && tabs.some((t) => t.dataset.tab === initial)) {
            apply(initial);
          }
        }

        tabs.forEach((tab) => {
          tab.addEventListener('click', () => {
            const idx = tab.dataset.tab || '0';
            apply(idx);
            if (key) filterState.set(key, idx === '0' ? null : idx);
          });
        });
      });
  }

  private cacheDefault(wrap: HTMLElement) {
    const el = this.getLabelEl(wrap);
    if (el) this.defaults.set(wrap, this.getLabel(el));
  }

  private getLabelEl(wrap: HTMLElement): HTMLElement | null {
    return wrap.querySelector<HTMLElement>('[data-dropdown-toggle]');
  }

  private getLabel(el: HTMLElement): string {
    if (el.tagName === 'INPUT') return (el as HTMLInputElement).value;
    const span = el.querySelector<HTMLElement>('span');
    return span?.textContent || el.textContent || '';
  }

  private setLabel(wrap: HTMLElement, text: string) {
    const el = this.getLabelEl(wrap);
    if (!el) return;
    if (el.tagName === 'INPUT') {
      (el as HTMLInputElement).value = text;
    } else {
      const span = el.querySelector<HTMLElement>('span');
      if (span) span.textContent = text;
    }
  }

  private bindToggle(wrap: HTMLElement) {
    const btn = wrap.querySelector<HTMLElement>('[data-dropdown-toggle]');
    const panel = wrap.querySelector<HTMLElement>('.ap-dropdown');
    if (!btn || !panel) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.contains('is-open');
      this.closeAll();
      if (!isOpen) {
        wrap.classList.add('is-open');
        if (this.mq.matches) this.expand(panel);
      }
    });

    panel.addEventListener('click', (e) => e.stopPropagation());
  }

  private selectItem(wrap: HTMLElement, item: HTMLElement) {
    wrap
      .querySelectorAll<HTMLElement>('.ap-dropdown__item--active')
      .forEach((el) => el.classList.remove('ap-dropdown__item--active'));
    item.classList.add('ap-dropdown__item--active');

    const isHead = item.classList.contains('ap-dropdown__item--head');
    wrap.classList.toggle('is-filled', !isHead);
  }

  private bindListItems(wrap: HTMLElement) {
    const key = wrap.dataset.filterKey;
    const multi = wrap.dataset.multi !== undefined;
    const items = Array.from(
      wrap.querySelectorAll<HTMLElement>('.ap-dropdown__item'),
    );
    items.forEach((item, idx) => {
      item.addEventListener('click', () => {
        const isHead = item.classList.contains('ap-dropdown__item--head');
        if (multi && !isHead) {
          this.toggleItem(wrap, item);
          if (key) this.syncMulti(wrap, key, items);
          return;
        }
        this.selectItem(wrap, item);
        if (key) filterState.set(key, isHead ? null : String(idx));
        this.closeAll();
      });
    });
  }

  private toggleItem(wrap: HTMLElement, item: HTMLElement) {
    const head = wrap.querySelector<HTMLElement>('.ap-dropdown__item--head');
    if (head) head.classList.remove('ap-dropdown__item--active');
    item.classList.toggle('ap-dropdown__item--active');
  }

  private syncMulti(wrap: HTMLElement, key: string, items: HTMLElement[]) {
    const active = items
      .map((el, i) =>
        el.classList.contains('ap-dropdown__item--active') &&
        !el.classList.contains('ap-dropdown__item--head')
          ? i
          : -1,
      )
      .filter((i) => i >= 0);

    wrap.classList.toggle('is-filled', active.length > 0);

    if (active.length === 0) {
      const head = wrap.querySelector<HTMLElement>('.ap-dropdown__item--head');
      if (head) head.classList.add('ap-dropdown__item--active');
      filterState.set(key, null);
    } else {
      filterState.set(key, active.join(','));
    }
  }

  private bindSum(wrap: HTMLElement) {
    const apply = wrap.querySelector<HTMLElement>('.ap-sum__btn--apply');
    const reset = wrap.querySelector<HTMLElement>('.ap-sum__btn--reset');
    const fields = wrap.querySelectorAll<HTMLInputElement>('.ap-sum__input');
    if (!apply || !reset || fields.length < 2) return;

    const fromInput = fields[0];
    const toInput = fields[1];
    const key = wrap.dataset.filterKey;

    apply.addEventListener('click', () => {
      const from = fromInput.value.trim();
      const to = toInput.value.trim();
      if (from || to) {
        this.setLabel(wrap, `${from || '0'} — ${to || '∞'} млн.$`);
        if (key) filterState.set(key, `${from || ''}-${to || ''}`);
      } else {
        const def = this.defaults.get(wrap);
        if (def) this.setLabel(wrap, def);
        if (key) filterState.set(key, null);
      }
      this.closeAll();
    });

    reset.addEventListener('click', () => {
      fromInput.value = '';
      toInput.value = '';
      const def = this.defaults.get(wrap);
      if (def) this.setLabel(wrap, def);
      if (key) filterState.set(key, null);
    });
  }

  private applyInitial(wrap: HTMLElement) {
    const key = wrap.dataset.filterKey;
    if (!key) return;

    const initial = filterState.get(key);
    if (initial === null) return;

    const items = Array.from(
      wrap.querySelectorAll<HTMLElement>('.ap-dropdown__item'),
    );

    if (wrap.dataset.multi !== undefined && items.length) {
      const idxs = initial
        .split(',')
        .map((s) => parseInt(s, 10))
        .filter((n) => !isNaN(n) && items[n]);
      if (idxs.length) {
        items.forEach((el) => el.classList.remove('ap-dropdown__item--active'));
        idxs.forEach((i) =>
          items[i].classList.add('ap-dropdown__item--active'),
        );
        wrap.classList.add('is-filled');
      }
      return;
    }

    if (items.length) {
      const idx = parseInt(initial, 10);
      if (!isNaN(idx) && items[idx]) {
        this.selectItem(wrap, items[idx]);
      }
      return;
    }

    const fields = wrap.querySelectorAll<HTMLInputElement>('.ap-sum__input');
    if (fields.length >= 2) {
      const [from, to] = initial.split('-');
      if (from) fields[0].value = from;
      if (to) fields[1].value = to;
      if (from || to) {
        this.setLabel(wrap, `${from || '0'} — ${to || '∞'} млн.$`);
      }
    }
  }

  private mq = window.matchMedia('(max-width: 1260px)');

  private expand(panel: HTMLElement) {
    panel.style.height = '0px';
    void panel.offsetHeight;
    panel.style.height = `${panel.scrollHeight}px`;
  }

  private collapse(panel: HTMLElement) {
    panel.style.height = `${panel.scrollHeight}px`;
    void panel.offsetHeight;
    panel.style.height = '0px';
  }

  private closeAll() {
    const mobile = this.mq.matches;
    this.wraps.forEach((w) => {
      const wasOpen = w.classList.contains('is-open');
      w.classList.remove('is-open');
      const panel = w.querySelector<HTMLElement>('.ap-dropdown');
      if (!panel) return;
      if (mobile) {
        if (wasOpen) this.collapse(panel);
      } else {
        panel.style.height = '';
      }
    });
  }
}

export { FilterDropdowns };
