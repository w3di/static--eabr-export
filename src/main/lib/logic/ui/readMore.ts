class ReadMore {
  private root: HTMLElement;
  private text: HTMLElement | null;
  private btn: HTMLElement | null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.text = root.querySelector<HTMLElement>('[data-readmore-text]');
    this.btn = root.querySelector<HTMLElement>('[data-readmore-btn]');
    if (!this.text || !this.btn) return;

    this.btn.addEventListener('click', this.expand);
    window.addEventListener('resize', this.refresh);
    this.refresh();
  }

  private overflows(): boolean {
    if (!this.text) return false;
    return this.text.scrollHeight - this.text.clientHeight > 1;
  }

  private refresh = () => {
    if (!this.btn || this.root.classList.contains('is-open')) return;
    this.btn.style.display = this.overflows() ? '' : 'none';
  };

  private expand = () => {
    if (!this.btn) return;
    this.root.classList.add('is-open');
    this.btn.style.display = 'none';
  };
}

export { ReadMore };
