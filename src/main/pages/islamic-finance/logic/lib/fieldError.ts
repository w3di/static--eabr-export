class FieldError {
  static set(el: HTMLElement, msg: string) {
    el.classList.add('isl-field--error');
    const field = el.closest('.isl-field');
    if (!field) return;

    let err = field.querySelector<HTMLElement>('.isl-field__error');
    if (!err) {
      err = document.createElement('div');
      err.className = 'isl-field__error';
      field.appendChild(err);
    }
    err.textContent = msg;
  }

  static clear(el: HTMLElement) {
    el.classList.remove('isl-field--error');
    el.closest('.isl-field')?.querySelector('.isl-field__error')?.remove();
  }
}

export { FieldError };
