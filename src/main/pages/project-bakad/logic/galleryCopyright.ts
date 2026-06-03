class GalleryCopyright {
  private readonly copyEl: HTMLElement | null;
  private readonly defaultText: string;

  constructor(root: HTMLElement) {
    this.copyEl = root.querySelector<HTMLElement>('.pb-gallery__copyright');
    this.defaultText = this.copyEl?.textContent ?? '';
    if (!this.copyEl) return;

    root
      .querySelectorAll<HTMLElement>('[data-copyright]')
      .forEach((cell) => this.bind(cell));
  }

  private bind(cell: HTMLElement) {
    cell.addEventListener('mouseenter', () => {
      const text = cell.dataset.copyright;
      if (text && this.copyEl) this.copyEl.textContent = text;
    });
    cell.addEventListener('mouseleave', () => {
      if (this.copyEl) this.copyEl.textContent = this.defaultText;
    });
  }
}

export { GalleryCopyright };
