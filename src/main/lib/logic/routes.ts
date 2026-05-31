const ROUTES = {
  index: '/',
  careers: '/careers/',
  careersAbout: '/careers-about/',
  careersInternship: '/careers-internship/',
  careersJobs: '/careers-jobs/',
  contacts: '/contacts/',
  contactsEabr: '/contacts-eabr/',
  contest: '/contest/',
  eventsPrev: '/events-prev/',
  fts: '/fts/',
  ftsProgram1: '/fts-program-1/',
  ftsProgram2: '/fts-program-2/',
  projectDetail: '/project-detail/',
  allProjects: '/all-projects/',
  islamicFinance: '/islamic-finance/',
  newsEvents: '/news-events/',
  newsEventsDetail: '/news-events-detail/',
  ourContribution: '/our-contribution/',
  projects: '/projects/',
  sitemap: '/sitemap/',
  video: '/video/',
} as const;

type RouteKey = keyof typeof ROUTES;
type RoutePath = (typeof ROUTES)[RouteKey];

export { ROUTES };
export type { RouteKey, RoutePath };
