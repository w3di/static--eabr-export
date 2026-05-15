class MobileMenu {
  menu: HTMLElement;
  burger: HTMLElement;
  body: HTMLElement;
  navigationItems: NodeListOf<HTMLElement>;

  constructor(el: HTMLElement) {
    this.menu = el;
    this.burger = document.querySelector<HTMLElement>('[data-burger]')!;
    this.body = document.querySelector<HTMLBodyElement>('body')!;
    this.navigationItems = this.menu.querySelectorAll('.nav > .nav__link');

    this.init();
  }

  init() {
    this.burger.addEventListener('click', () => {
      this.burger.classList.toggle('active');
      this.menu.classList.toggle('active');
      this.body.classList.toggle('fixed');
    });

    this.navigationItems.forEach((navItem) => {
      navItem.addEventListener('click', () => {
        navItem.classList.toggle('active');
      });
    });
  }
}

export { MobileMenu };
