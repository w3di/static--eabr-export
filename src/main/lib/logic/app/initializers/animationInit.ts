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
    this.grow();
  }

  private grow() {
    document
      .querySelectorAll<HTMLElement>('[data-animate="grow"]')
      .forEach((item) => {
        item.style.opacity = '0';
        const play = () =>
          animate(item, {
            scale: [0.2, 1],
            opacity: [0, 1],
            ease: 'outElastic(1, .5)',
            duration: 1200,
          });
        onVisible(item, () => setTimeout(play, 200));
        item.addEventListener('click', play);
      });
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
            duration: 650,
            ease: 'out(3)',
            delay: stagger(18),
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
    const items = Array.from(
      document.querySelectorAll<HTMLElement>('[data-animate="counter"]'),
    );
    if (!items.length) return;

    const groups = new Map<Element, HTMLElement[]>();
    items.forEach((item) => {
      const key = item.closest('section') || document.body;
      const list = groups.get(key) || [];
      list.push(item);
      groups.set(key, list);
    });

    groups.forEach((list, key) => {
      let started = false;
      onVisible(key as HTMLElement, () => {
        if (started) return;
        started = true;
        list.forEach((item) => new Counter(item, { duration: 1800 }));
      });
    });
  }
}

export { AnimationInit };
