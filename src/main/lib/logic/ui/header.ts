class Header {
  private header: HTMLElement;
  private navLinks: HTMLElement[];
  private dropdownItems: HTMLElement[];
  private timeout: ReturnType<typeof setTimeout> | null = null;

  constructor(el: HTMLElement) {
    this.header = el;
    this.navLinks = Array.from(
      this.header.querySelectorAll<HTMLElement>('[data-nav-link]'),
    );
    this.dropdownItems = Array.from(
      this.header.querySelectorAll<HTMLElement>('[data-dropdown]'),
    );

    this.bindNavLinks();
    this.bindDropdownItems();
  }

  private bindNavLinks() {
    this.navLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => this.openFor(link));
      link.addEventListener('mouseleave', this.scheduleClose);
    });
  }

  private bindDropdownItems() {
    this.dropdownItems.forEach((item) => {
      item.addEventListener('mouseenter', this.cancelClose);
      item.addEventListener('mouseleave', this.closeAll);
    });
  }

  private openFor = (link: HTMLElement) => {
    this.cancelClose();
    const index = link.dataset.navLink;
    this.navLinks.forEach((l) => l.classList.toggle('active', l === link));
    this.dropdownItems.forEach((item) =>
      item.classList.toggle('active', item.dataset.dropdown === index),
    );
  };

  private scheduleClose = () => {
    this.cancelClose();
    this.timeout = setTimeout(this.closeAll, 400);
  };

  private cancelClose = () => {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  };

  private closeAll = () => {
    this.cancelClose();
    this.navLinks.forEach((el) => el.classList.remove('active'));
    this.dropdownItems.forEach((item) => item.classList.remove('active'));
  };
}

export { Header };
