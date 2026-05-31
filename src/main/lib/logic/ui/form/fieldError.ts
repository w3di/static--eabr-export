type ErrorTheme = {
  containerSelector: string;
  inputErrorClass: string;
  errorMessageClass: string;
};

class FieldError {
  static set(el: HTMLElement, msg: string, theme: ErrorTheme) {
    el.classList.add(theme.inputErrorClass);
    const field = el.closest(theme.containerSelector);
    if (!field) return;

    let err = field.querySelector<HTMLElement>(`.${theme.errorMessageClass}`);
    if (!err) {
      err = document.createElement('div');
      err.className = theme.errorMessageClass;
      field.appendChild(err);
    }
    err.textContent = msg;
  }

  static clear(el: HTMLElement, theme: ErrorTheme) {
    el.classList.remove(theme.inputErrorClass);
    el.closest(theme.containerSelector)
      ?.querySelector(`.${theme.errorMessageClass}`)
      ?.remove();
  }
}

export { FieldError, type ErrorTheme };
