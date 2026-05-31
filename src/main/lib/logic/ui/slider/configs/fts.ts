import type { SwiperOptions } from 'swiper/types';
import type Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const syncWrapperHeight = (swiper: Swiper) => {
  const slides = Array.from(swiper.slides) as HTMLElement[];
  if (!slides.length) return;

  const photos = slides.map((s) =>
    s.querySelector<HTMLElement>('.fts-project__photo'),
  );

  const prevSlideTransitions = slides.map((s) => s.style.transition);
  const prevPhotoTransitions = photos.map((p) => (p ? p.style.transition : ''));
  const prevActiveStates = slides.map((s) =>
    s.classList.contains('fts-project--full'),
  );

  slides.forEach((s, i) => {
    s.style.transition = 'none';
    if (photos[i]) photos[i]!.style.transition = 'none';
    s.classList.add('fts-project--full');
  });

  void slides[0].offsetHeight;

  let max = 0;
  slides.forEach((s) => {
    const h = s.getBoundingClientRect().height;
    if (h > max) max = h;
  });

  slides.forEach((s, i) => {
    if (!prevActiveStates[i]) s.classList.remove('fts-project--full');
  });

  void slides[0].offsetHeight;

  slides.forEach((s, i) => {
    s.style.transition = prevSlideTransitions[i];
    if (photos[i]) photos[i]!.style.transition = prevPhotoTransitions[i];
  });

  if (max > 0) {
    swiper.wrapperEl.style.minHeight = `${max}px`;
  }
};

const setFull = (swiper: Swiper, idx: number) => {
  (swiper.slides as HTMLElement[]).forEach((s, i) =>
    s.classList.toggle('fts-project--full', i === idx),
  );
};

export const ftsConfig = (el: HTMLElement): SwiperOptions => {
  const scope = el.closest<HTMLElement>('.fts-projects') ?? el;
  const navPrev = scope.querySelector<HTMLElement>('[data-fts-track-prev]');
  const navNext = scope.querySelector<HTMLElement>('[data-fts-track-next]');
  const pagination = scope.querySelector<HTMLElement>('[data-fts-pagination]');

  let cardClickTarget: number | null = null;

  return {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 18,
    speed: 500,
    threshold: 5,
    longSwipesRatio: 0.2,
    longSwipesMs: 250,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 14,
      },
      1261: {
        slidesPerView: 'auto',
        spaceBetween: 18,
      },
    },
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: navNext,
      prevEl: navPrev,
      disabledClass: 'disabled',
    },
    pagination: {
      el: pagination,
      clickable: true,
      bulletClass: 'fts-controls__dot',
      bulletActiveClass: 'fts-controls__dot--active',
    },
    on: {
      init: (swiper) => {
        swiper.slides.forEach((slide, i) =>
          slide.classList.toggle('fts-project--full', i === 0),
        );
        (swiper.el as HTMLElement).style.height = '';
        swiper.wrapperEl.style.height = '';
        requestAnimationFrame(() => syncWrapperHeight(swiper));

        let raf: number | null = null;
        const schedule = () => {
          if (raf !== null) cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() =>
            requestAnimationFrame(() => syncWrapperHeight(swiper)),
          );
        };

        const observer = new ResizeObserver(schedule);
        observer.observe(swiper.el as HTMLElement);

        window.addEventListener('resize', schedule);

        swiper.on('destroy', () => {
          observer.disconnect();
          window.removeEventListener('resize', schedule);
          if (raf !== null) cancelAnimationFrame(raf);
        });
      },
      resize: (swiper) => syncWrapperHeight(swiper),
      breakpoint: (swiper) => syncWrapperHeight(swiper),
      click: (swiper) => {
        const clickedIndex = swiper.clickedIndex;
        if (typeof clickedIndex !== 'number') return;

        cardClickTarget = clickedIndex;
        setFull(swiper, clickedIndex);

        if (clickedIndex !== swiper.activeIndex) {
          swiper.slideTo(clickedIndex, 500);
        } else {
          cardClickTarget = null;
        }
      },
      slideChange: (swiper) => {
        const idx = cardClickTarget ?? swiper.activeIndex;
        setFull(swiper, idx);
        cardClickTarget = null;
      },
    },
  };
};
