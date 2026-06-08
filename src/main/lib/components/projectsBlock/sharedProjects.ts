type SharedProject = {
  image: string;
  title: string;
  amountNum: string;
  amountUnit: string;
  bankNum: string;
  bankUnit: string;
  country: string;
  flag: string;
  year: string;
};

const SHARED_PROJECTS: SharedProject[] = [
  {
    image: '/assets/images/projects/fts-project-1.webp',
    title:
      'Производство молочной и&nbsp;мясной продукции полного цикла в&nbsp;Армении',
    amountNum: '388',
    amountUnit: 'млн&nbsp;$',
    bankNum: '300',
    bankUnit: 'млн&nbsp;$',
    country: 'Армения',
    flag: '/assets/images/flags/flag-am.svg',
    year: '2024',
  },
  {
    image: '/assets/images/projects/fts-project-2.webp',
    title: 'Расширение и&nbsp;модернизация Международного аэропорта Алматы',
    amountNum: '388',
    amountUnit: 'млн&nbsp;$',
    bankNum: '300',
    bankUnit: 'млн&nbsp;$',
    country: 'Казахстан',
    flag: '/assets/images/flags/flag-kz.svg',
    year: '2024',
  },
  {
    image: '/assets/images/projects/fts-project-3.webp',
    title:
      'Предоставление кредитной линии ОАО «Айыл банк» для&nbsp;реализации программы микрофинансирования в&nbsp;Кыргызской Республике',
    amountNum: '388',
    amountUnit: 'млн&nbsp;$',
    bankNum: '300',
    bankUnit: 'млн&nbsp;$',
    country: 'Кыргызстан',
    flag: '/assets/images/flags/flag-kg.svg',
    year: '2024',
  },
  {
    image: '/assets/images/projects/fts-project-4.webp',
    title:
      'Предоставление кредитной линии ОАО «Айыл банк» для&nbsp;реализации программы микрофинансирования в&nbsp;Кыргызской Республике',
    amountNum: '388',
    amountUnit: 'млн&nbsp;$',
    bankNum: '300',
    bankUnit: 'млн&nbsp;$',
    country: 'Армения',
    flag: '/assets/images/flags/flag-am.svg',
    year: '2024',
  },
];

export { SHARED_PROJECTS, type SharedProject };
