interface CounterOptions {
  duration?: number;
  from?: number;
}

class Counter {
  private readonly el: HTMLElement;
  private readonly target: number;
  private readonly from: number;
  private readonly decimals: number;
  private readonly duration: number;
  private raf: number | null = null;

  constructor(el: HTMLElement, options: CounterOptions = {}) {
    this.el = el;
    this.duration = options.duration ?? 2000;

    const raw = el.textContent!.trim().replace(',', '.');
    this.target = parseFloat(raw);
    this.decimals = raw.includes('.') ? raw.split('.')[1].length : 0;

    const fromAttr = el.dataset.counterFrom;
    if (typeof options.from === 'number') {
      this.from = options.from;
    } else if (fromAttr === 'now') {
      this.from = new Date().getFullYear();
    } else if (fromAttr) {
      this.from = parseFloat(fromAttr);
    } else {
      this.from = 0;
    }

    this.animate();
  }

  private ease(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  private format(value: number): string {
    if (this.decimals === 0) return Math.round(value).toString();
    return value.toFixed(this.decimals).replace('.', ',');
  }

  private animate(): void {
    this.el.textContent = this.format(this.from);
    const start = performance.now();

    const tick = (now: number): void => {
      const t = Math.min((now - start) / this.duration, 1);
      const value = this.from + (this.target - this.from) * this.ease(t);
      this.el.textContent = this.format(value);
      if (t < 1) this.raf = requestAnimationFrame(tick);
    };

    this.raf = requestAnimationFrame(tick);
  }

  cancel(): this {
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    this.raf = null;
    return this;
  }
}

export { Counter };
