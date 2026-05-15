type PinState = 'before' | 'pinned' | 'after';

class StepsLineFill {
  private el: HTMLElement;
  private wrapper: HTMLElement;
  private items: HTMLElement[];
  private rafId: number | null = null;
  private state: PinState | null = null;
  private stepsHeight = 0;
  private wrapperHeight = 0;

  constructor(el: HTMLElement) {
    this.el = el;
    const parent = el.parentElement;
    if (!parent) throw new Error('StepsLineFill: no parent');
    this.wrapper = parent;
    this.items = Array.from(el.querySelectorAll<HTMLElement>('.hr-step-item'));

    this.measure();
    window.addEventListener('scroll', this.schedule, { passive: true });
    window.addEventListener('resize', this.onResize);
    this.update();
  }

  private measure = () => {
    this.el.style.position = '';
    this.el.style.top = '';
    this.el.style.left = '';
    this.el.style.bottom = '';
    this.el.style.width = '';
    this.wrapper.style.minHeight = '';
    this.state = null;

    this.stepsHeight = this.el.offsetHeight;
    this.wrapperHeight = this.wrapper.offsetHeight;
    this.wrapper.style.minHeight = `${this.wrapperHeight}px`;
  };

  private onResize = () => {
    this.measure();
    this.schedule();
  };

  private schedule = () => {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.update();
    });
  };

  private update = () => {
    const wrapperRect = this.wrapper.getBoundingClientRect();
    const stickyTop = window.innerHeight * 0.15;
    const scrollRange = this.wrapperHeight - this.stepsHeight;
    if (scrollRange <= 0) return;

    const wrapperTopInViewport = wrapperRect.top;
    const wrapperBottomInViewport = wrapperRect.bottom;

    let progress = 0;
    let nextState: PinState;

    if (wrapperTopInViewport >= stickyTop) {
      nextState = 'before';
      progress = 0;
    } else if (wrapperBottomInViewport <= stickyTop + this.stepsHeight) {
      nextState = 'after';
      progress = 1;
    } else {
      nextState = 'pinned';
      progress = (stickyTop - wrapperTopInViewport) / scrollRange;
    }

    if (nextState !== this.state) {
      this.applyState(nextState);
      this.state = nextState;
    }

    if (nextState === 'pinned') {
      this.el.style.left = `${wrapperRect.left}px`;
      this.el.style.width = `${this.wrapper.offsetWidth}px`;
    }

    const clamped = Math.max(0, Math.min(1, progress));
    this.el.style.setProperty('--fill', clamped.toString());

    const total = this.items.length;
    const fadeZone = 0.15;
    this.items.forEach((item, i) => {
      const threshold = total > 1 ? i / (total - 1) : 0;
      const p = (clamped - (threshold - fadeZone)) / fadeZone;
      const clampedP = Math.max(0, Math.min(1, p));
      item.style.setProperty('--item-fill', clampedP.toString());
    });
  };

  private applyState = (state: PinState) => {
    const stickyTop = window.innerHeight * 0.15;
    if (state === 'before') {
      this.el.style.position = '';
      this.el.style.top = '';
      this.el.style.left = '';
      this.el.style.right = '';
      this.el.style.bottom = '';
      this.el.style.width = '';
    } else if (state === 'pinned') {
      this.el.style.position = 'fixed';
      this.el.style.top = `${stickyTop}px`;
      this.el.style.bottom = '';
      this.el.style.right = '';
    } else {
      this.el.style.position = 'absolute';
      this.el.style.top = '';
      this.el.style.left = '0';
      this.el.style.right = '0';
      this.el.style.bottom = '0';
      this.el.style.width = '';
    }
  };
}

export { StepsLineFill };
