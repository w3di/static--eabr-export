class FilterState {
  private params: URLSearchParams;

  constructor() {
    this.params = new URLSearchParams(window.location.search);
  }

  get(key: string): string | null {
    return this.params.get(key);
  }

  set(key: string, value: string | null | undefined): void {
    if (value === null || value === undefined || value === '') {
      this.params.delete(key);
    } else {
      this.params.set(key, value);
    }
    this.sync();
  }

  private sync(): void {
    const qs = this.params.toString();
    const url = `${window.location.pathname}${qs ? '?' + qs : ''}${window.location.hash}`;
    window.history.replaceState(null, '', url);
  }
}

const filterState = new FilterState();

export { filterState, FilterState };
