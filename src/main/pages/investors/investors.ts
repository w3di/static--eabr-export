import { formatSize } from '../../data/fileSize';

type InvDoc = { title: string; file: string; size: string };
type TxRow = {
  date: string;
  amount: string;
  instrument: string;
  maturity: string;
  coupon: string;
};

const pdf = (title: string, file: string): InvDoc => ({
  title,
  file,
  size: formatSize(file),
});

const ICONS = '/assets/images/products';
const DOCS = '/assets/docs/investors';

const INVESTORS = {
  pageNav: [
    {
      href: '#reports',
      label: 'Финансовые отчеты',
      i18n: 'inv.pagenav.reports',
    },
    {
      href: '#disclosure',
      label: 'Раскрытие информации',
      i18n: 'inv.pagenav.disclosure',
    },
    {
      href: '#corporate',
      label: 'Корпоративные отчеты',
      i18n: 'inv.pagenav.corporate',
    },
    { href: '#debt', label: 'Долговые инструменты', i18n: 'inv.pagenav.debt' },
    {
      href: '#transactions',
      label: 'История транзакций',
      i18n: 'inv.pagenav.transactions',
    },
    {
      href: '#treasury',
      label: 'Казначейские инструменты',
      i18n: 'inv.pagenav.treasury',
    },
    {
      href: '#ratings',
      label: 'Кредитные рейтинги',
      i18n: 'inv.pagenav.ratings',
    },
  ],

  stats: [
    {
      label: 'Накопленный инвестиционный портфель',
      num: '$19,6',
      unit: 'млрд',
      i18n: 'inv.stats.portfolio',
    },
    {
      label: 'Уставный капитал',
      num: '$8,5',
      unit: 'млрд',
      i18n: 'inv.stats.capital',
    },
  ],

  ratings: [
    {
      agency: 'АКРА',
      scales: [
        { value: 'A-', label: 'глобальный', i18n: 'inv.rating.global' },
        { value: 'AAA', label: 'национальный', i18n: 'inv.rating.national' },
      ],
    },
    {
      agency: 'CCXI',
      scales: [
        { value: 'A-', label: 'глобальный', i18n: 'inv.rating.global' },
        { value: 'AAA', label: 'национальный', i18n: 'inv.rating.national' },
      ],
    },
  ],

  reportYears: ['2025', '2024', '2023', '2022', '2021', '2020'],

  reports: [
    pdf('Финансовая отчетность за 2025 год', `${DOCS}/fin-report-2025.pdf`),
    pdf(
      'Отчет о раскрытии информации об устойчивом развитии за 2025 год',
      `${DOCS}/esg-disclosure-2025.pdf`,
    ),
    pdf(
      'Сокращенная промежуточная финансовая отчетность за шестимесячный период, закончившийся 30 июня 2025 года',
      `${DOCS}/interim-fin-2025-h1.pdf`,
    ),
  ],

  disclosureLinks: [
    'Уведомления',
    'Существенные факты',
    'Отчеты эмитента',
    'Учредительные документы',
    'Предоставление информации',
  ],

  corporateCards: [
    { title: 'Годовые отчеты', icon: `${ICONS}/icon-report-annual.svg` },
    {
      title: 'Отчеты об устойчивом развитии',
      icon: `${ICONS}/icon-report-esg.svg`,
    },
  ],

  debtPrograms: [
    'Программа EMTN',
    'Программа ECP',
    'Выпуск местных облигаций в России',
    'Выпуск местных облигаций в Казахстане',
    'Выпуск местных облигаций в Армении',
    'Международные долговые инструменты',
  ],

  txByYear: {
    '2025': [
      {
        date: '28.12.2023',
        amount: '50 млрд тенге',
        instrument: 'Облигации, ISIN KZX000001003',
        maturity: '27.06.2027',
        coupon: '14,20%',
      },
      {
        date: '28.12.2023',
        amount: '10 млрд рублей',
        instrument: 'Облигации серии 003P-009, ISIN RU000A107EA1',
        maturity: '13.12.2028',
        coupon: 'RUONIA+1,70%',
      },
      {
        date: '15.08.2023',
        amount: '20 млн $ США',
        instrument: 'Облигации, ISIN AMEABRB21ER0',
        maturity: '15.08.2026',
        coupon: '6,00%',
      },
      {
        date: '03.08.2023',
        amount: '25 млрд тенге',
        instrument: 'Облигации, ISIN KZ2D00009958',
        maturity: '20.04.2028',
        coupon: '15,50%',
      },
      {
        date: '14.07.2023',
        amount: '6 млрд рублей',
        instrument: 'Облигации серии 003Р-008, ISIN RU000A106JX4',
        maturity: '07.07.2028',
        coupon: 'RUONIA+2%',
      },
    ] as TxRow[],
    '2024': [] as TxRow[],
    '2023': [] as TxRow[],
    '2022': [] as TxRow[],
    '2021': [] as TxRow[],
    '2020': [] as TxRow[],
  },

  ratingAgencies: [
    {
      agency: 'АКРА',
      desc: 'Кредитный рейтинг эмитента по глобальной шкале: A-. По национальной шкале: AAA (RU). Прогноз: стабильный.',
      docs: [
        pdf(
          'Рейтинговое решение ACRA от 13 марта 2026 года',
          `${DOCS}/acra-2026-03-13.pdf`,
        ),
        pdf(
          'Рейтинговое решение ACRA от 12 сентября 2025 года',
          `${DOCS}/acra-2025-09-12.pdf`,
        ),
        pdf(
          'Рейтинговое решение ACRA от 4 апреля 2025 года',
          `${DOCS}/acra-2025-04-04.pdf`,
        ),
        pdf(
          'Рейтинговое решение ACRA от 16 октября 2024 года',
          `${DOCS}/acra-2024-10-16.pdf`,
        ),
        pdf(
          'Рейтинговое решение ACRA от 27 апреля 2024 года',
          `${DOCS}/acra-2024-04-27.pdf`,
        ),
        pdf(
          'Рейтинговое решение ACRA от 9 ноября 2023 года',
          `${DOCS}/acra-2023-11-09.pdf`,
        ),
      ],
    },
    {
      agency: 'CCXI',
      desc: 'Кредитный рейтинг эмитента по глобальной шкале: Ag. По национальной шкале: AAA. Прогноз: стабильный.',
      docs: [
        pdf(
          'Рейтинговое действие CCXI от 5 сентября 2025 года',
          `${DOCS}/ccxi-2025-09-05.pdf`,
        ),
        pdf(
          'Рейтинговое действие CCXI от 5 сентября 2024 года',
          `${DOCS}/ccxi-2024-09-05.pdf`,
        ),
        pdf(
          'Рейтинговое действие CCXI от 28 декабря 2023 года',
          `${DOCS}/ccxi-2023-12-28.pdf`,
        ),
      ],
    },
  ],
};

export { INVESTORS, type InvDoc, type TxRow };
