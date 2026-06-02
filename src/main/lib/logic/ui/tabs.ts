class Tabs {
  private buttons: HTMLElement[];
  private panels: HTMLElement[];

  constructor(root: HTMLElement) {
    this.buttons = Array.from(
      root.querySelectorAll<HTMLElement>('[data-tab-btn]'),
    );
    this.panels = Array.from(
      root.querySelectorAll<HTMLElement>('[data-tab-panel]'),
    );

    this.buttons.forEach((btn) => {
      btn.addEventListener('click', () => this.activate(btn.dataset.tabBtn));
    });
  }

  private activate(index?: string) {
    if (index === undefined) return;

    this.buttons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.tabBtn === index);
    });

    this.panels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.tabPanel === index);
    });
  }
}

export { Tabs };
