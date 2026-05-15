import { Carousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/carousel/carousel.css';
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';
import { Slider } from '../../ui/slider';

type CarouselLike = { page: number; slides: { el: HTMLElement }[] };

class SliderInit {
  constructor() {
    this.sliders();
    this.carousels();
  }

  private sliders() {
    document
      .querySelectorAll<HTMLElement>('[data-slider]')
      .forEach((item) => new Slider(item));
  }

  private carousels() {
    document
      .querySelectorAll<HTMLElement>('[data-carousel="block"]')
      .forEach((item) => {
        const main = item.querySelector<HTMLElement>('[data-carousel="main"]')!;
        const caption = item.querySelector<HTMLElement>(
          '[data-carousel="caption"]',
        )!;

        new Carousel(
          main,
          {
            Thumbs: { type: 'classic' as const },
            Dots: false,
            on: {
              ready: (instance: unknown) =>
                this.setCaption(instance as CarouselLike, caption),
              change: (instance: unknown) =>
                this.setCaption(instance as CarouselLike, caption),
            },
          },
          { Thumbs },
        );
      });
  }

  private setCaption(instance: CarouselLike, el: HTMLElement) {
    const slide = instance.slides[instance.page];
    el.innerHTML = slide.el.getAttribute('data-caption') ?? '';
  }
}

export { SliderInit };
