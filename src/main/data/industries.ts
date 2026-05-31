type IndustryStat = {
  num: string;
  unit?: string;
  label: string;
  date: string;
};

type Industry = {
  slug: string;
  label: string;
  labelHtml?: string;
  title: string;
  image: string;
  hero?: string;
  stats: IndustryStat[];
};

const DEFAULT_STATS: IndustryStat[] = [
  {
    num: '$260',
    unit: 'млн',
    label: 'Текущий инвестиционный портфель ЕАБР составляет',
    date: 'На&nbsp;31&nbsp;декабря 2025&nbsp;года',
  },
  {
    num: '$1250',
    unit: 'млн',
    label: 'Во&nbsp;всех государствах-участниках Банка.',
    date: 'На&nbsp;31&nbsp;декабря 2025&nbsp;года',
  },
];

const INDUSTRIES: Industry[] = [
  {
    slug: 'metallurgy',
    label: 'Металлургия',
    title: 'МЕТАЛЛУРГИЯ',
    image: '/assets/images/industries/metallurgy.webp',
    stats: DEFAULT_STATS,
  },
  {
    slug: 'machinery',
    label: 'Машиностроение',
    title: 'МАШИНОСТРОЕНИЕ',
    image: '/assets/images/industries/machinery.webp',
    stats: DEFAULT_STATS,
  },
  {
    slug: 'transport',
    label: 'Транспорт',
    title: 'ТРАНСПОРТ',
    image: '/assets/images/industries/transport.webp',
    stats: DEFAULT_STATS,
  },
  {
    slug: 'finance',
    label: 'Финансовый сектор',
    labelHtml: 'Финансовый<br>сектор',
    title: 'ФИНАНСОВЫЙ СЕКТОР',
    image: '/assets/images/industries/finance.webp',
    stats: DEFAULT_STATS,
  },
  {
    slug: 'mining',
    label: 'Горнодобывающая промышленность',
    labelHtml: 'Горнодобывающая<br>промышленность',
    title: 'ГОРНОДОБЫВАЮЩАЯ ПРОМЫШЛЕННОСТЬ',
    image: '/assets/images/industries/mining.webp',
    stats: DEFAULT_STATS,
  },
  {
    slug: 'energy',
    label: 'Энергетика',
    title: 'ЭНЕРГЕТИКА',
    image: '/assets/images/industries/energy.webp',
    stats: DEFAULT_STATS,
  },
  {
    slug: 'other-infra',
    label: 'Иная инфраструктура',
    labelHtml: 'Иная<br>инфраструктура',
    title: 'ИНАЯ ИНФРАСТРУКТУРА',
    image: '/assets/images/industries/other-infra.webp',
    stats: DEFAULT_STATS,
  },
  {
    slug: 'chemistry',
    label: 'Химическая промышленность',
    labelHtml: 'Химическая<br>промышленность',
    title: 'ХИМИЧЕСКАЯ ПРОМЫШЛЕННОСТЬ',
    image: '/assets/images/industries/chemistry.webp',
    stats: DEFAULT_STATS,
  },
  {
    slug: 'construction',
    label: 'Строительство',
    title: 'СТРОИТЕЛЬСТВО',
    image: '/assets/images/industries/construction.webp',
    stats: DEFAULT_STATS,
  },
  {
    slug: 'agro',
    label: 'АПК',
    title: 'АПК',
    image: '/assets/images/industries/agro.webp',
    stats: DEFAULT_STATS,
  },
  {
    slug: 'digital',
    label: 'Цифровые проекты',
    title: 'ЦИФРОВЫЕ ПРОЕКТЫ',
    image: '/assets/images/industries/digital.webp',
    stats: DEFAULT_STATS,
  },
];

export { INDUSTRIES };
export type { Industry, IndustryStat };
