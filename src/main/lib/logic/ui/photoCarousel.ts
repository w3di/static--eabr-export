class PhotoCarousel {
  private root: HTMLElement;
  private stage: HTMLElement;
  private thumbs: HTMLButtonElement[];
  private prev: HTMLButtonElement;
  private next: HTMLButtonElement;
  private copy: HTMLElement | null;
  private index = 0;

  constructor(root: HTMLElement) {
    this.root = root;
    this.stage = root.querySelector<HTMLElement>('[data-pc-stage]')!;
    this.thumbs = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[data-pc-thumb]'),
    );
    this.prev = root.querySelector<HTMLButtonElement>('[data-pc-prev]')!;
    this.next = root.querySelector<HTMLButtonElement>('[data-pc-next]')!;
    this.copy = root.querySelector<HTMLElement>('[data-pc-copy]');

    this.thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => this.go(i));
    });
    this.prev.addEventListener('click', () => this.go(this.index - 1));
    this.next.addEventListener('click', () => this.go(this.index + 1));
  }

  private go(target: number) {
    const total = this.thumbs.length;
    const next = ((target % total) + total) % total;
    if (next === this.index) return;

    const src = this.thumbs[next].dataset.pcSrc!;
    this.stage.style.backgroundImage = `url('${src}')`;

    const copyright = this.thumbs[next].dataset.pcCopyright;
    if (this.copy && copyright) this.copy.textContent = copyright;

    this.thumbs[this.index].classList.remove('is-active');
    this.thumbs[next].classList.add('is-active');
    this.index = next;
  }
}

export { PhotoCarousel };
