type PppNews = {
  id: number;
  date: string;
  dateLabel: string;
  video: boolean;
  title: string;
  image: string;
};

type PppNewsFeed = {
  items: PppNews[];
  total: number;
};

const IMG = '/assets/images/1200x800.svg';

const PPP_NEWS: PppNewsFeed = {
  total: 21,
  items: [
    {
      id: 1,
      date: '2025-12-18',
      dateLabel: '18 декабря 2025',
      video: true,
      title:
        'Евгений Винокуров о&nbsp;перспективах Центральной Азии как одного из&nbsp;наиболее быстрорастущих регионов мира — интервью',
      image: IMG,
    },
    {
      id: 2,
      date: '2025-11-27',
      dateLabel: '27 ноября 2025',
      video: false,
      title:
        'ЕАБР и&nbsp;Правительство Кыргызстана подписали меморандум о&nbsp;развитии проектов ГЧП в&nbsp;транспортной сфере',
      image: IMG,
    },
    {
      id: 3,
      date: '2025-10-14',
      dateLabel: '14 октября 2025',
      video: false,
      title:
        'Запущена программа технического содействия для&nbsp;подготовки bankable-проектов ГЧП',
      image: IMG,
    },
    {
      id: 4,
      date: '2025-09-02',
      dateLabel: '2 сентября 2025',
      video: false,
      title:
        'ЕАБР предоставил финансирование для&nbsp;развития институциональной среды государственно-частного партнерства',
      image: IMG,
    },
    {
      id: 5,
      date: '2025-07-21',
      dateLabel: '21 июля 2025',
      video: true,
      title:
        'Вебинар: лучшие практики структурирования концессионных соглашений в&nbsp;Евразийском регионе',
      image: IMG,
    },
    {
      id: 6,
      date: '2025-06-05',
      dateLabel: '5 июня 2025',
      video: false,
      title:
        'Эксперты ЕАБР представили обзор рынка ГЧП государств-участников за&nbsp;2024 год',
      image: IMG,
    },
    {
      id: 7,
      date: '2025-05-19',
      dateLabel: '19 мая 2025',
      video: false,
      title:
        'Подписано соглашение о&nbsp;софинансировании строительства автодорожного коридора в&nbsp;Узбекистане',
      image: IMG,
    },
    {
      id: 8,
      date: '2025-04-08',
      dateLabel: '8 апреля 2025',
      video: false,
      title:
        'ЕАБР поддержал реформу законодательства о&nbsp;ГЧП в&nbsp;Таджикистане',
      image: IMG,
    },
    {
      id: 9,
      date: '2025-03-12',
      dateLabel: '12 марта 2025',
      video: true,
      title:
        'Видеорепортаж с&nbsp;форума по&nbsp;инфраструктурным инвестициям в&nbsp;Алматы',
      image: IMG,
    },
    {
      id: 10,
      date: '2025-02-26',
      dateLabel: '26 февраля 2025',
      video: false,
      title:
        'Банк запустил образовательный курс по&nbsp;подготовке специалистов в&nbsp;сфере ГЧП',
      image: IMG,
    },
    {
      id: 11,
      date: '2025-01-15',
      dateLabel: '15 января 2025',
      video: false,
      title:
        'Итоги года: ЕАБР профинансировал девять проектов ГЧП в&nbsp;странах-участницах',
      image: IMG,
    },
    {
      id: 12,
      date: '2024-12-10',
      dateLabel: '10 декабря 2024',
      video: false,
      title:
        'Новый механизм гарантий ЕАБР для&nbsp;частных инвесторов инфраструктурных проектов',
      image: IMG,
    },
    {
      id: 13,
      date: '2024-11-03',
      dateLabel: '3 ноября 2024',
      video: true,
      title:
        'Интервью: как&nbsp;ГЧП помогает закрывать инфраструктурный разрыв в&nbsp;Центральной Азии',
      image: IMG,
    },
    {
      id: 14,
      date: '2024-09-22',
      dateLabel: '22 сентября 2024',
      video: false,
      title:
        'ЕАБР и&nbsp;ЕЭК договорились о&nbsp;координации проектов ГЧП на&nbsp;евразийском пространстве',
      image: IMG,
    },
    {
      id: 15,
      date: '2024-08-14',
      dateLabel: '14 августа 2024',
      video: false,
      title:
        'Подписан меморандум о&nbsp;сотрудничестве с&nbsp;Центром ГЧП Республики Казахстан',
      image: IMG,
    },
    {
      id: 16,
      date: '2024-06-30',
      dateLabel: '30 июня 2024',
      video: false,
      title:
        'Опубликовано исследование о&nbsp;потенциале ГЧП в&nbsp;энергетике стран-участниц ЕАБР',
      image: IMG,
    },
    {
      id: 17,
      date: '2024-05-17',
      dateLabel: '17 мая 2024',
      video: false,
      title:
        'ЕАБР провел круглый стол по&nbsp;развитию концессий в&nbsp;сфере ЖКХ',
      image: IMG,
    },
    {
      id: 18,
      date: '2024-03-28',
      dateLabel: '28 марта 2024',
      video: true,
      title:
        'Видео: презентация модельного закона о&nbsp;государственно-частном партнерстве',
      image: IMG,
    },
    {
      id: 19,
      date: '2024-02-09',
      dateLabel: '9 февраля 2024',
      video: false,
      title:
        'Банк сопроводил структурирование первого пилотного проекта ГЧП в&nbsp;Армении',
      image: IMG,
    },
    {
      id: 20,
      date: '2023-11-21',
      dateLabel: '21 ноября 2023',
      video: false,
      title:
        'ЕАБР расширил линейку некредитных продуктов для&nbsp;проектов ГЧП',
      image: IMG,
    },
    {
      id: 21,
      date: '2023-09-29',
      dateLabel: '29 сентября 2023',
      video: false,
      title:
        'Евразийскому банку развития присуждена Премия Центра ГЧП Кыргызстана в&nbsp;номинации «Международный партнер года»',
      image: IMG,
    },
  ],
};

export { PPP_NEWS, type PppNews, type PppNewsFeed };
