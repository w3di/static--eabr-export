import { filterState } from '../../../lib/logic/ui/filterState';

class SearchFilter {
  private input: HTMLInputElement;
  private debounceId: number | null = null;

  constructor(input: HTMLInputElement) {
    this.input = input;
    const key = input.dataset.filterKey || 'q';

    const initial = filterState.get(key);
    if (initial) this.input.value = initial;

    this.input.addEventListener('input', () => {
      if (this.debounceId !== null) window.clearTimeout(this.debounceId);
      this.debounceId = window.setTimeout(() => {
        filterState.set(key, this.input.value.trim() || null);
      }, 250);
    });
  }
}

export { SearchFilter };
