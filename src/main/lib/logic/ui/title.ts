class Title {
  el: HTMLElement;
  private observer!: IntersectionObserver;

  constructor(el: HTMLElement) {
    this.el = el;
    this.wrap();
    this.observe();
  }

  private wrap(): void {
    if (this.el.querySelector(':scope > .title__inner')) return;

    const span = document.createElement('span');
    span.className = 'title__inner';

    while (this.el.firstChild) {
      span.appendChild(this.el.firstChild);
    }

    this.el.appendChild(span);
  }

  private observe(): void {
    this.observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animate();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    this.observer.observe(this.el);
  }

  private animate(): void {
    this.el.classList.add('is-animated');
  }
}

export { Title };
