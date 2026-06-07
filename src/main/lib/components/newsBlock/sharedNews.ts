type NewsItem = {
  image: string;
  date: string;
  tag: string;
  title: string;
  href: string;
};

const SHARED_NEWS: NewsItem[] = [
  {
    image: '/assets/images/projects/fts-project-2.webp',
    date: '28 ноября 2025',
    tag: 'Машиностроение',
    title: 'Экономики стран Евразии покажут рост до&nbsp;9,3% в&nbsp;2026&nbsp;году: ЕАБР представил новый Макропрогноз',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-1.webp',
    date: '28 ноября 2025',
    tag: 'АПК',
    title: 'Экономики стран Евразии покажут рост до&nbsp;9,3% в&nbsp;2026&nbsp;году: ЕАБР представил новый Макропрогноз',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-3.webp',
    date: '28 ноября 2025',
    tag: 'Энергетика',
    title: 'Экономики стран Евразии покажут рост до&nbsp;9,3% в&nbsp;2026&nbsp;году: ЕАБР представил новый Макропрогноз',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-4.webp',
    date: '28 ноября 2025',
    tag: 'Инфраструктура',
    title: 'Экономики стран Евразии покажут рост до&nbsp;9,3% в&nbsp;2026&nbsp;году: ЕАБР представил новый Макропрогноз',
    href: '#',
  },
];

export { SHARED_NEWS, type NewsItem };
