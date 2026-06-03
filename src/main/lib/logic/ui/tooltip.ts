class Tooltip {
  private host: HTMLElement;
  private tip: HTMLElement | null;

  constructor(host: HTMLElement) {
    this.host = host;
    this.tip = host.querySelector<HTMLElement>('.js-tooltip');
    if (!this.tip) return;
    this.host.addEventListener('mouseenter', () => this.position());
  }

  private position() {
    if (!this.tip) return;
    const rect = this.host.getBoundingClientRect();
    this.tip.style.left = `${rect.left + rect.width / 2}px`;
    this.tip.style.bottom = `${window.innerHeight - rect.top + 12}px`;
  }
}

export { Tooltip };
