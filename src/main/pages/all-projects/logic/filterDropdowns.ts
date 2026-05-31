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
    });
    document.addEventListener('click', () => this.closeAll());
    this.bindTabs();
  }

  private bindTabs() {
    document
      .querySelectorAll<HTMLElement>('[data-tabs]')
      .forEach((container) => {
        const tabs = Array.from(
          container.querySelectorAll<HTMLElement>('[data-tab]'),
        );
        tabs.forEach((tab) => {
          tab.addEventListener('click', () => {
            const idx = tab.dataset.tab || '0';
            container.dataset.active = idx;
            tabs.forEach((t) =>
              t.classList.toggle(
                'ap-view__tab--active',
                t.dataset.tab === idx,
              ),
            );
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
      if (!isOpen) wrap.classList.add('is-open');
    });

    panel.addEventListener('click', (e) => e.stopPropagation());
  }

  private bindListItems(wrap: HTMLElement) {
    wrap.querySelectorAll<HTMLElement>('.ap-dropdown__item').forEach((item) => {
      item.addEventListener('click', () => {
        wrap
          .querySelectorAll<HTMLElement>('.ap-dropdown__item--active')
          .forEach((el) => el.classList.remove('ap-dropdown__item--active'));
        item.classList.add('ap-dropdown__item--active');

        const isHead = item.classList.contains('ap-dropdown__item--head');
        if (isHead) {
          const def = this.defaults.get(wrap);
          if (def) this.setLabel(wrap, def);
        } else {
          this.setLabel(wrap, (item.textContent || '').trim());
        }
        this.closeAll();
      });
    });
  }

  private bindSum(wrap: HTMLElement) {
    const apply = wrap.querySelector<HTMLElement>('.ap-sum__btn--apply');
    const reset = wrap.querySelector<HTMLElement>('.ap-sum__btn--reset');
    const fields = wrap.querySelectorAll<HTMLInputElement>('.ap-sum__input');
    if (!apply || !reset || fields.length < 2) return;

    const fromInput = fields[0];
    const toInput = fields[1];

    apply.addEventListener('click', () => {
      const from = fromInput.value.trim();
      const to = toInput.value.trim();
      if (from || to) {
        this.setLabel(wrap, `${from || '0'} — ${to || '∞'} млн.$`);
      } else {
        const def = this.defaults.get(wrap);
        if (def) this.setLabel(wrap, def);
      }
      this.closeAll();
    });

    reset.addEventListener('click', () => {
      fromInput.value = '';
      toInput.value = '';
      const def = this.defaults.get(wrap);
      if (def) this.setLabel(wrap, def);
    });
  }

  private closeAll() {
    this.wraps.forEach((w) => w.classList.remove('is-open'));
  }
}

export { FilterDropdowns };
