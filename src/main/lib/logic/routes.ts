const ROUTES = {
  index: './index.html',
  careers: './careers.html',
  careersAbout: './careers-about.html',
  careersInternship: './careers-internship.html',
  careersJobs: './careers-jobs.html',
  contacts: './contacts.html',
  contactsEabr: './contacts-eabr.html',
  contest: './contest.html',
  eventsPrev: './events-prev.html',
  islamicFinance: './islamic-finance.html',
  newsEvents: './news-events.html',
  newsEventsDetail: './news-events-detail.html',
  ourContribution: './our-contribution.html',
  video: './video.html',
} as const;

type RouteKey = keyof typeof ROUTES;
type RoutePath = (typeof ROUTES)[RouteKey];

export { ROUTES };
export type { RouteKey, RoutePath };
