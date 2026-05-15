type TriggerEvent = 'mouseenter' | 'click';

class CityMapPins {
  private pins: HTMLElement[];
  private current: HTMLElement | null = null;

  constructor(pins: HTMLElement[], trigger: TriggerEvent = 'mouseenter') {
    this.pins = pins;
    this.pins.forEach((pin) => {
      pin.addEventListener(trigger, () => this.open(pin));
      pin.addEventListener('focus', () => this.open(pin));
    });

    const defaultPin =
      this.pins.find((p) => p.dataset.pinDefault === 'true') ?? this.pins[0];
    if (defaultPin) this.open(defaultPin);
  }

  private open(pin: HTMLElement) {
    if (this.current === pin) return;
    if (this.current) {
      this.current.classList.remove('hr-pin--open');
      this.current.style.removeProperty('--shift-x');
    }
    const shift = this.computeShift(pin);
    if (shift !== 0) pin.style.setProperty('--shift-x', `${shift}px`);
    pin.classList.add('hr-pin--open');
    this.current = pin;
  }

  private computeShift(pin: HTMLElement): number {
    const rect = pin.getBoundingClientRect();
    const anchor = rect.left + rect.width / 2;
    const vw = window.innerWidth;
    const margin = 8;
    const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const isMobile = vw <= 1260;
    const openWidth = isMobile ? (216 / 16) * remPx : 283;
    const labelLeft = anchor - openWidth / 2;
    const labelRight = anchor + openWidth / 2;
    if (labelLeft < margin) return margin - labelLeft;
    if (labelRight > vw - margin) return vw - margin - labelRight;
    return 0;
  }
}

export { CityMapPins };
