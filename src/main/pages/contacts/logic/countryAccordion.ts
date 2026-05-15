class CountryAccordion {
  constructor(toggle: HTMLInputElement) {
    toggle.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        toggle.checked = !toggle.checked;
        toggle.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }
}

export { CountryAccordion };
