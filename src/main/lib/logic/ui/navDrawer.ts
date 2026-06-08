const DRAWER_BREAKPOINT = '(max-width: 1260px)';

class NavDrawer {
  drawer: HTMLElement;
  toggle: HTMLInputElement | null;
  labels: HTMLLabelElement[];
  siblings: HTMLElement[];
  mql: MediaQueryList;

  constructor(drawer: HTMLElement) {
    this.drawer = drawer;
    this.toggle = drawer.querySelector<HTMLInputElement>('.nav-drawer__toggle');
    this.labels = Array.from(
      drawer.querySelectorAll<HTMLLabelElement>(
        '.nav-drawer__pull, .nav-drawer__close',
      ),
    );
    this.siblings = Array.from(drawer.parentElement?.children || []).filter(
      (el): el is HTMLElement => el !== drawer && el instanceof HTMLElement,
    );
    this.mql = window.matchMedia(DRAWER_BREAKPOINT);

    this.init();
  }

  init() {
    if (!this.toggle) return;

    this.toggle.setAttribute('tabindex', '-1');

    this.labels.forEach((label) => {
      label.setAttribute('tabindex', '0');
      label.setAttribute('role', 'button');
      label.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleDrawer();
        }
      });
    });

    this.toggle.addEventListener('change', () => this.syncInert());
    this.mql.addEventListener('change', () => this.handleBreakpoint());
    this.syncInert();
  }

  private toggleDrawer() {
    if (!this.toggle) return;
    this.toggle.checked = !this.toggle.checked;
    this.toggle.dispatchEvent(new Event('change', { bubbles: true }));
  }

  private syncInert() {
    const open = !!this.toggle?.checked && this.mql.matches;
    this.siblings.forEach((el) => {
      if (open) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  }

  private handleBreakpoint() {
    if (!this.toggle) return;
    if (!this.mql.matches && this.toggle.checked) {
      this.toggle.checked = false;
    }
    this.syncInert();
  }
}

export { NavDrawer };
