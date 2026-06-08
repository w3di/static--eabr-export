type PanaPdf = {
  title: string;
  size: string;
};

type PanaBlock = {
  date: string;
  title: string;
  cover: string;
};

type PanaYear = {
  pdfs: PanaPdf[];
  analyticsBlocks: PanaBlock[];
};

const PPP_ANALYTICS: Record<string, PanaYear> = {
  2026: {
    pdfs: [
      { title: 'Дайджест № 2 март-апрель 2026', size: 'PDF, 236.54 KB' },
      { title: 'Дайджест № 1 январь-февраль 2026', size: 'PDF, 236.54 KB' },
    ],
    analyticsBlocks: [
      {
        date: '14 марта 2026',
        title:
          'Межстрановой обзор «Институциональная среда ГЧП на&nbsp;евразийском пространстве: тренды 2026 года»',
        cover: 'linear-gradient(135deg, #1BCE1B 0%, #37EE50 100%)',
      },
      {
        date: '20 февраля 2026',
        title:
          'Страновой обзор «Развитие государственно-частного партнерства в&nbsp;Республике Казахстан»',
        cover: 'linear-gradient(135deg, #0097D8 0%, #24D6FF 100%)',
      },
    ],
  },
  2025: {
    pdfs: [
      { title: 'Дайджест № 6 ноябрь-декабрь 2025', size: 'PDF, 236.54 KB' },
      { title: 'Дайджест № 5 сентябрь-октябрь 2025', size: 'PDF, 236.54 KB' },
    ],
    analyticsBlocks: [
      {
        date: '18 декабря 2025',
        title:
          'Межстрановой обзор «Правовая среда ГЧП на&nbsp;евразийском пространстве»',
        cover: 'linear-gradient(135deg, #1BCE1B 0%, #37EE50 100%)',
      },
      {
        date: '18 декабря 2025',
        title:
          'Страновой обзор «Развитие государственно-частного партнерства в&nbsp;Республике Армения: ключевые этапы и&nbsp;перспективы»',
        cover: 'linear-gradient(135deg, #0097D8 0%, #24D6FF 100%)',
      },
      {
        date: '16 сентября 2025',
        title: 'Трансграничные государственно-частные партнерства',
        cover: 'linear-gradient(135deg, #2C3142 0%, #4A5070 100%)',
      },
      {
        date: '18 декабря 2025',
        title: 'Макроэкономический прогноз 2026–2028',
        cover: 'linear-gradient(135deg, #A0EDFF 0%, #D9F8FF 100%)',
      },
    ],
  },
};

export { PPP_ANALYTICS, type PanaYear, type PanaPdf, type PanaBlock };
