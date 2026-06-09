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
    title:
      'Экономики стран Евразии покажут рост до&nbsp;9,3% в&nbsp;2026&nbsp;году: ЕАБР представил новый Макропрогноз',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-1.webp',
    date: '28 ноября 2025',
    tag: 'АПК',
    title:
      'Экономики стран Евразии покажут рост до&nbsp;9,3% в&nbsp;2026&nbsp;году: ЕАБР представил новый Макропрогноз',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-3.webp',
    date: '28 ноября 2025',
    tag: 'Энергетика',
    title:
      'Экономики стран Евразии покажут рост до&nbsp;9,3% в&nbsp;2026&nbsp;году: ЕАБР представил новый Макропрогноз',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-4.webp',
    date: '28 ноября 2025',
    tag: 'Инфраструктура',
    title:
      'Экономики стран Евразии покажут рост до&nbsp;9,3% в&nbsp;2026&nbsp;году: ЕАБР представил новый Макропрогноз',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-1.webp',
    date: '12 декабря 2025',
    tag: 'Энергетика',
    title:
      'ЕАБР профинансирует строительство ветропарка мощностью 100&nbsp;МВт в&nbsp;Казахстане',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-2.webp',
    date: '11 декабря 2025',
    tag: 'Транспорт',
    title: 'Открыт новый логистический коридор по&nbsp;маршруту «Север — Юг»',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-3.webp',
    date: '9 декабря 2025',
    tag: 'Финансы',
    title:
      'ЕАБР разместил облигации на&nbsp;50&nbsp;млрд тенге для&nbsp;поддержки МСБ',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-4.webp',
    date: '5 декабря 2025',
    tag: 'АПК',
    title:
      'Запущен агропромышленный кластер в&nbsp;Кыргызстане при&nbsp;поддержке Банка',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-1.webp',
    date: '3 декабря 2025',
    tag: 'Цифровизация',
    title:
      'Фонд цифровых инициатив ЕАБР поддержал 12&nbsp;финтех-стартапов региона',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-2.webp',
    date: '1 декабря 2025',
    tag: 'Инфраструктура',
    title:
      'Модернизация системы водоснабжения Душанбе выходит на&nbsp;новый этап',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-3.webp',
    date: '27 ноября 2025',
    tag: 'ESG',
    title:
      'ЕАБР опубликовал годовой отчёт об&nbsp;устойчивом развитии за&nbsp;2025&nbsp;год',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-4.webp',
    date: '24 ноября 2025',
    tag: 'Промышленность',
    title:
      'В&nbsp;Беларуси открыто производство компонентов для&nbsp;электротранспорта',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-1.webp',
    date: '20 ноября 2025',
    tag: 'Строительство',
    title: 'Банк профинансирует возведение социального жилья в&nbsp;Армении',
    href: '#',
  },
  {
    image: '/assets/images/projects/fts-project-2.webp',
    date: '18 ноября 2025',
    tag: 'Экономика',
    title: 'Совет ЕАБР утвердил инвестиционную программу на&nbsp;2026&nbsp;год',
    href: '#',
  },
];

export { SHARED_NEWS, type NewsItem };
