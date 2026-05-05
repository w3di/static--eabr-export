interface CounterOptions {
    duration?: number;
}

class Counter {
    private readonly el: HTMLElement;
    private readonly target: number;
    private readonly decimals: number;
    private readonly duration: number;
    private raf: number | null = null;

    constructor(el: HTMLElement, options: CounterOptions = {}) {
        this.el = el;
        this.duration = options.duration ?? 2000;

        const raw = el.textContent!.trim().replace(',', '.');
        this.target = parseFloat(raw);
        this.decimals = raw.includes('.') ? raw.split('.')[1].length : 0;

        this.animate();
    }

    private ease(t: number): number {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    private format(value: number): string {
        if (this.decimals === 0) return Math.round(value).toString();
        return value.toFixed(this.decimals).replace('.', ',');
    }

    private animate(): void {
        this.el.textContent = this.format(0);
        const start = performance.now();

        const tick = (now: number): void => {
            const t = Math.min((now - start) / this.duration, 1);
            this.el.textContent = this.format(this.ease(t) * this.target);
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
