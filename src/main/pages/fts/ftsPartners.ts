type Partner = {
  name: string;
  image: string;
  href: string;
};

const FTS_PARTNERS: Partner[] = [
  {
    name: 'WFP',
    image: '/assets/images/partners/wfp.webp',
    href: 'https://www.wfp.org/',
  },
  {
    name: 'UNDP',
    image: '/assets/images/partners/undp.webp',
    href: 'https://www.undp.org/',
  },
  {
    name: 'CAREC',
    image: '/assets/images/partners/carec.webp',
    href: 'https://www.carecprogram.org/',
  },
  {
    name: 'ESCAP',
    image: '/assets/images/partners/escap.webp',
    href: 'https://www.unescap.org/',
  },
  {
    name: 'OSCE',
    image: '/assets/images/partners/osce.webp',
    href: 'https://www.osce.org/',
  },
  {
    name: 'UNIDO',
    image: '/assets/images/partners/unido.webp',
    href: 'https://www.unido.org/',
  },
  {
    name: 'UNFPA',
    image: '/assets/images/partners/unfpa.webp',
    href: 'https://www.unfpa.org/',
  },
];

export { FTS_PARTNERS, type Partner };
