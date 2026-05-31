class PhotoCarousel {
  private root: HTMLElement;
  private stage: HTMLElement;
  private thumbs: HTMLButtonElement[];
  private prev: HTMLButtonElement;
  private next: HTMLButtonElement;
  private index = 0;

  constructor(root: HTMLElement) {
    this.root = root;
    this.stage = root.querySelector<HTMLElement>('[data-pc-stage]')!;
    this.thumbs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-pc-thumb]'));
    this.prev = root.querySelector<HTMLButtonElement>('[data-pc-prev]')!;
    this.next = root.querySelector<HTMLButtonElement>('[data-pc-next]')!;

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

    this.thumbs[this.index].classList.remove('is-active');
    this.thumbs[next].classList.add('is-active');
    this.index = next;
  }
}

export { PhotoCarousel };
