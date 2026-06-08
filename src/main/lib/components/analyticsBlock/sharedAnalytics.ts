type AnalyticsBook = {
  title: string;
  date: string;
  cover: string;
};

const SHARED_ANALYTICS: AnalyticsBook[] = [
  {
    title: 'Макроэкономический обзор ЕАБР. Сентябрь 2025',
    date: '16 сентября 2025',
    cover: 'linear-gradient(135deg, #1BCE1B 0%, #37EE50 100%)',
  },
  {
    title: 'Макроэкономический прогноз 2026–2028',
    date: '18 декабря 2025',
    cover: 'linear-gradient(135deg, #0097D8 0%, #24D6FF 100%)',
  },
  {
    title:
      'Китай и&nbsp;Евразийский регион: анализ инвестиционных потоков на&nbsp;основе&nbsp;...',
    date: '25 декабря 2025',
    cover: 'linear-gradient(135deg, #2C3142 0%, #4A5070 100%)',
  },
  {
    title: 'Макроэкономический прогноз 2026–2028',
    date: '18 декабря 2025',
    cover: 'linear-gradient(135deg, #A0EDFF 0%, #D9F8FF 100%)',
  },
];

export { SHARED_ANALYTICS, type AnalyticsBook };
