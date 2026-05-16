class AsideObserver {
  el: HTMLElement;
  content: HTMLElement | null;

  constructor(el: HTMLElement) {
    this.el = el;
    this.content = el.querySelector<HTMLElement>('[data-aside-line="content"]');

    if (this.content) this.init();
  }

  init() {
    const scrollContainer =
      document.querySelector<HTMLElement>('.page') ?? window;
    scrollContainer.addEventListener('scroll', () => {
      const top = this.el.getBoundingClientRect().top;
      this.el.classList.toggle('active', top < 0);
    });
  }
}

export { AsideObserver };
