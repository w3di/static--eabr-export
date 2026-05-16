import { animate, splitText, stagger } from 'animejs';
import { onVisible } from '../../helpers/onvisible';
import { Counter } from '../../ui/counter';

class AnimationInit {
  constructor() {
    this.fadeInSplit();
    this.fadeInText();
    this.quote();
    this.counters();
    this.drawCheck();
    this.titleUnderline();
  }

  private titleUnderline() {
    document
      .querySelectorAll<HTMLElement>('.title--underline, .isl-section-title')
      .forEach((item) => {
        onVisible(item, () => item.classList.add('is-animated'));
      });
  }

  private drawCheck() {
    document
      .querySelectorAll<HTMLElement>('[data-animate="drawCheck"]')
      .forEach((item, i) => {
        onVisible(item, () => {
          setTimeout(() => item.classList.add('is-drawn'), i * 120);
        });
      });
  }

  private fadeInSplit() {
    document
      .querySelectorAll<HTMLElement>('[data-animate="fadeInSplit"]')
      .forEach((item) => {
        const { chars } = splitText(item, { chars: true });
        onVisible(item, () => {
          animate(chars, {
            opacity: { from: 0 },
            y: { from: 40, to: 0 },
            duration: 1250,
            ease: 'out(3)',
            delay: stagger(50),
          });
        });
      });
  }

  private fadeInText() {
    document
      .querySelectorAll<HTMLElement>('[data-animate="fadeInText"]')
      .forEach((item) => {
        const { chars } = splitText(item, { chars: true });
        chars.forEach((c) => {
          (c as HTMLElement).style.opacity = '0';
        });
        item.style.visibility = 'visible';
        onVisible(item, () => {
          animate(chars, {
            opacity: { to: 1 },
            duration: 500,
            ease: 'out(2)',
            delay: stagger(12),
          });
        });
      });
  }

  private quote() {
    document
      .querySelectorAll<HTMLElement>('[data-animate="quote"]')
      .forEach((item) => {
        onVisible(item, () => {
          animate(item, {
            translateX: ['-100%', '0%'],
            duration: 800,
            ease: 'easeOutExpo',
          });
        });
      });
  }

  private counters() {
    document
      .querySelectorAll<HTMLElement>('[data-animate="counter"]')
      .forEach((item) => {
        onVisible(item, () => {
          new Counter(item, { duration: 3000 });
        });
      });
  }
}

export { AnimationInit };
