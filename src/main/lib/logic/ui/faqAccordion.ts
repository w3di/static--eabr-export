class FaqAccordion {
  private item: HTMLDetailsElement;
  private summary: HTMLElement;
  private wrap: HTMLElement;
  private animating = false;
  private duration = 400;

  constructor(item: HTMLDetailsElement) {
    this.item = item;
    this.summary = item.querySelector<HTMLElement>(':scope > summary')!;
    this.wrap = item.querySelector<HTMLElement>(':scope > div')!;

    if (item.open) item.classList.add('is-open');

    this.summary.addEventListener('click', this.onClick);
  }

  private onClick = (e: MouseEvent) => {
    e.preventDefault();
    if (this.animating) return;
    if (this.item.open) {
      this.collapse();
    } else {
      this.expand();
    }
  };

  private expand = () => {
    this.animating = true;
    this.item.open = true;
    this.item.classList.add('is-open');

    const target = this.wrap.scrollHeight;
    this.wrap.style.height = '0px';
    this.wrap.style.overflow = 'hidden';
    void this.wrap.offsetHeight;
    this.wrap.style.transition = `height ${this.duration}ms ease`;
    this.wrap.style.height = `${target}px`;

    this.wrap.addEventListener('transitionend', this.onExpandEnd, { once: true });
  };

  private onExpandEnd = () => {
    this.wrap.style.height = '';
    this.wrap.style.transition = '';
    this.wrap.style.overflow = '';
    this.animating = false;
  };

  private collapse = () => {
    this.animating = true;
    this.item.classList.remove('is-open');

    const start = this.wrap.scrollHeight;
    this.wrap.style.height = `${start}px`;
    this.wrap.style.overflow = 'hidden';
    void this.wrap.offsetHeight;
    this.wrap.style.transition = `height ${this.duration}ms ease`;
    this.wrap.style.height = '0px';

    this.wrap.addEventListener('transitionend', this.onCollapseEnd, { once: true });
  };

  private onCollapseEnd = () => {
    this.item.open = false;
    this.wrap.style.height = '';
    this.wrap.style.transition = '';
    this.wrap.style.overflow = '';
    this.animating = false;
  };
}

export { FaqAccordion };
