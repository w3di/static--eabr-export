class FormSelect {
  private root: HTMLElement;
  private label: HTMLElement;
  private value: HTMLInputElement;
  private items: HTMLElement[];

  constructor(root: HTMLElement) {
    this.root = root;
    this.label = root.querySelector<HTMLElement>('[data-form-select-label]')!;
    this.value = root.querySelector<HTMLInputElement>(
      '[data-form-select-value]',
    )!;
    this.items = Array.from(
      root.querySelectorAll<HTMLElement>('.inv-select__item'),
    );

    const toggle = root.querySelector<HTMLElement>('[data-form-select-toggle]');
    const dropdown = root.querySelector<HTMLElement>('.inv-select__dropdown');

    toggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.root.classList.toggle('is-open');
    });

    dropdown?.addEventListener('click', (e) => e.stopPropagation());

    this.items.forEach((item) => {
      item.addEventListener('click', () => this.select(item));
    });

    document.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  private select(item: HTMLElement) {
    this.items.forEach((el) => el.classList.remove('inv-select__item--active'));
    item.classList.add('inv-select__item--active');

    this.label.textContent = item.textContent;
    this.label.classList.remove('inv-select__label--placeholder');
    this.root.classList.add('is-filled');

    this.value.value = item.dataset.value || item.textContent || '';
    this.value.dispatchEvent(new Event('change', { bubbles: true }));

    this.close();
  }

  private close() {
    this.root.classList.remove('is-open');
  }
}

export { FormSelect };
