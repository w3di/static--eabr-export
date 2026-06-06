class YearTabs {
  private root: HTMLElement;
  private track: HTMLElement;
  private tabs: HTMLElement[];
  private indicator!: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.track = root.querySelector<HTMLElement>('.inv-yeartabs__track')!;
    this.tabs = Array.from(root.querySelectorAll<HTMLElement>('.inv-yeartab'));

    if (!this.track || !this.tabs.length) return;

    this.indicator = document.createElement('span');
    this.indicator.className = 'inv-yeartabs__indicator';
    this.track.prepend(this.indicator);

    this.tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        this.moveIndicator(tab);
        tab.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      });
    });

    root
      .querySelector<HTMLElement>('.inv-yeartabs__arrow--prev')
      ?.addEventListener('click', () => this.step(-1));
    root
      .querySelector<HTMLElement>('.inv-yeartabs__arrow--next')
      ?.addEventListener('click', () => this.step(1));

    window.addEventListener('resize', () => this.moveIndicator(this.active()));

    this.moveIndicator(this.active());
    requestAnimationFrame(() => this.root.classList.add('inv-yeartabs--ready'));
  }

  private active(): HTMLElement {
    return (
      this.tabs.find((t) => t.classList.contains('is-active')) ?? this.tabs[0]
    );
  }

  private step(direction: number) {
    const current = this.tabs.indexOf(this.active());
    const next = Math.min(
      this.tabs.length - 1,
      Math.max(0, current + direction),
    );
    if (next !== current) this.tabs[next].click();
  }

  private moveIndicator(tab: HTMLElement) {
    this.indicator.style.width = `${tab.offsetWidth}px`;
    this.indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
  }
}

export { YearTabs };
