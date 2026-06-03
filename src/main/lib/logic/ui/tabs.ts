class Tabs {
  private root: HTMLElement;
  private buttons: HTMLElement[];
  private panels: HTMLElement[];

  constructor(root: HTMLElement) {
    this.root = root;
    this.buttons = Array.from(
      root.querySelectorAll<HTMLElement>('[data-tab-btn]'),
    );
    this.panels = Array.from(
      root.querySelectorAll<HTMLElement>('[data-tab-panel]'),
    );

    this.buttons.forEach((btn) => {
      btn.addEventListener('click', () => this.activate(btn.dataset.tabBtn));
    });

    const active = this.buttons.find((b) => b.classList.contains('is-active'));
    this.root.dataset.active = active?.dataset.tabBtn ?? '0';
  }

  private activate(index?: string) {
    if (index === undefined) return;

    this.root.dataset.active = index;

    this.buttons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.tabBtn === index);
    });

    this.panels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.tabPanel === index);
    });
  }
}

export { Tabs };
