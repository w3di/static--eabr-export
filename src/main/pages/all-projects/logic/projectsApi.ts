import { PROJECTS, type Project } from './projectsData';

type ProjectsQuery = {
  q?: string | null;
  type?: string | null;
  date?: string | null;
  industry?: string | null;
  page?: number;
  perPage?: number;
};

type ProjectsResponse = {
  items: Project[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

class ProjectsApi {
  private static readonly DELAY = 420;
  private static readonly PER_PAGE = 9;

  static fetch(query: ProjectsQuery): Promise<ProjectsResponse> {
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

  private static filter(query: ProjectsQuery): Project[] {
    const q = this.normalize(query.q);
    const type = query.type ? parseInt(query.type, 10) : 0;
    const industries = this.parseIndustries(query.industry);
    const [fromYear, toYear] = this.parseYears(query.date);

    return PROJECTS.filter((p) => {
      if (q && !this.normalize(p.title).includes(q)) return false;
      if (type && p.type !== type) return false;
      if (industries.length && !industries.some((i) => p.industries.includes(i)))
        return false;
      if (fromYear !== null && p.year < fromYear) return false;
      if (toYear !== null && p.year > toYear) return false;
      return true;
    });
  }

  private static normalize(value: string | null | undefined): string {
    return (value || '')
      .replace(/&nbsp;/g, ' ')
      .replace(/ /g, ' ')
      .trim()
      .toLowerCase();
  }

  private static parseIndustries(value: string | null | undefined): number[] {
    if (!value) return [];
    return value
      .split(',')
      .map((s) => parseInt(s, 10))
      .filter((n) => !isNaN(n) && n > 0);
  }

  private static parseYears(
    value: string | null | undefined,
  ): [number | null, number | null] {
    if (!value) return [null, null];
    const years = value
      .split('_')
      .map((iso) => parseInt(iso.split('-')[0], 10))
      .filter((y) => !isNaN(y));
    if (!years.length) return [null, null];
    return [Math.min(...years), Math.max(...years)];
  }
}

export { ProjectsApi, type ProjectsQuery, type ProjectsResponse };
