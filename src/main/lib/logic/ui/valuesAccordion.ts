class ValuesAccordion {
  private items: HTMLElement[];

  constructor(root: HTMLElement) {
    this.items = Array.from(
      root.querySelectorAll<HTMLElement>('[data-careers-value]'),
    );

    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (supportsHover) return;

    this.items.forEach((item) => {
      item.addEventListener('click', () => this.toggle(item));
    });
  }

  private toggle(item: HTMLElement) {
    const open = !item.classList.contains('is-open');
    item.classList.toggle('is-open', open);
    item.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
}

export { ValuesAccordion };
