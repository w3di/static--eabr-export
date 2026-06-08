import { PPP_NEWS, type PppNews } from './pppNewsData';

const FEED = PPP_NEWS.items;

type PppNewsQuery = {
  q?: string | null;
  date?: string | null;
  page?: number;
  perPage?: number;
};

type PppNewsResponse = {
  items: PppNews[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

class PppNewsApi {
  private static readonly DELAY = 420;
  private static readonly PER_PAGE = 9;

  static fetch(query: PppNewsQuery): Promise<PppNewsResponse> {
    const perPage = query.perPage || this.PER_PAGE;
    const filtered = this.filter(query);
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const page = Math.min(Math.max(1, query.page || 1), totalPages);
    const start = (page - 1) * perPage;
    const items = filtered.slice(start, start + perPage);

    return new Promise((resolve) => {
      window.setTimeout(
        () => resolve({ items, page, perPage, total, totalPages }),
        this.DELAY,
      );
    });
  }

  private static filter(query: PppNewsQuery): PppNews[] {
    const q = this.normalize(query.q);
    const [from, to] = this.parseDates(query.date);

    return FEED.filter((n) => {
      if (q && !this.normalize(n.title).includes(q)) return false;
      if (from && n.date < from) return false;
      if (to && n.date > to) return false;
      return true;
    });
  }

  private static normalize(value: string | null | undefined): string {
    return (value || '')
      .replace(/&nbsp;/g, ' ')
      .replace(/\u00A0/g, ' ')
      .trim()
      .toLowerCase();
  }

  private static parseDates(
    value: string | null | undefined,
  ): [string | null, string | null] {
    if (!value) return [null, null];
    const dates = value.split('_').filter(Boolean).sort();
    if (!dates.length) return [null, null];
    return [dates[0], dates[dates.length - 1]];
  }
}

export { PppNewsApi, type PppNewsQuery, type PppNewsResponse };
