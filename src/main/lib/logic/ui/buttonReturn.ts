class ButtonReturn {
  el: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el;

    this.init();
  }

  init = () => {
    const scrollContainer =
      document.querySelector<HTMLElement>('.page') ?? window;
    scrollContainer.addEventListener('scroll', () => {
      const height =
        window.innerHeight || document.documentElement.clientHeight;
      const scroll =
        scrollContainer instanceof Window
          ? window.scrollY
          : scrollContainer.scrollTop;

      this.show(scroll > height);
    });
  };

  show = (mode: boolean) => {
    if (mode) {
      this.el.classList.add('active');
    } else {
      this.el.classList.remove('active');
    }
  };
}

export { ButtonReturn };
