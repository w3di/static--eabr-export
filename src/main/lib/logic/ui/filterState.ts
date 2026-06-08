type FilterListener = (key: string, value: string | null) => void;

class FilterState {
  private params: URLSearchParams;
  private listeners = new Set<FilterListener>();

  constructor() {
    this.params = new URLSearchParams(window.location.search);
  }

  get(key: string): string | null {
    return this.params.get(key);
  }

  set(key: string, value: string | null | undefined, silent = false): void {
    if (value === null || value === undefined || value === '') {
      this.params.delete(key);
    } else {
      this.params.set(key, value);
    }
    this.sync();
    if (!silent) this.notify(key, value ?? null);
  }

  subscribe(fn: FilterListener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify(key: string, value: string | null): void {
    this.listeners.forEach((fn) => fn(key, value));
  }

  private sync(): void {
    const qs = this.params.toString();
    const url = `${window.location.pathname}${qs ? '?' + qs : ''}${window.location.hash}`;
    window.history.replaceState(null, '', url);
  }
}

const filterState = new FilterState();

export { filterState, FilterState };
