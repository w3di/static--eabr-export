class Header {
  header: HTMLElement;
  navLinks: NodeListOf<HTMLElement>;
  dropdownItems: NodeListOf<HTMLElement>;
  timeout: ReturnType<typeof setTimeout> | null;

  constructor(el: HTMLElement) {
    this.header = el;
    this.navLinks = this.header.querySelectorAll('[data-nav-link]');
    this.dropdownItems = this.header.querySelectorAll('[data-dropdown]');
    this.timeout = null;

    this.init();
  }

  init() {
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.navLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        setDefault();
        setActive(link);
      });

      link.addEventListener('mouseleave', () => {
        this.timeout = setTimeout(() => {
          setDefault();
        }, 400);
      });
    });

    const setActive = (link: HTMLElement) => {
      const index = link.dataset.navLink;
      link.classList.add('active');

      this.dropdownItems.forEach((item) => {
        if (item.dataset.dropdown === index) {
          item.classList.add('active');

          item.addEventListener('mouseenter', () => {
            if (this.timeout) {
              clearTimeout(this.timeout);
            }
          });

          item.addEventListener('mouseleave', () => {
            setDefault();
          });
        }
      });
    };

    const setDefault = () => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.navLinks.forEach((el) => el.classList.remove('active'));

      this.dropdownItems.forEach((item) => {
        item.classList.remove('active');
      });
    };
  }
}

export { Header };
