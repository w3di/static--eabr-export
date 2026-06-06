class SectionNav {
  items: HTMLAnchorElement[];

  constructor() {
    this.items = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        '.nav-aside__item, .nav-drawer__item',
      ),
    );

    this.init();
  }

  init() {
    const current = this.normalize(window.location.pathname);

    this.items.forEach((item) => {
      const href = this.normalize(item.getAttribute('href') || '');
      if (!href || href !== current) return;

      if (item.classList.contains('nav-aside__item')) {
        item.classList.add('nav-aside__item--active');
      }
      if (item.classList.contains('nav-drawer__item')) {
        item.classList.add('nav-drawer__item--active');
      }
    });
  }

  private normalize(path: string): string {
    if (!path) return path;
    return path.endsWith('/') ? path : `${path}/`;
  }
}

export { SectionNav };
