import i18next from 'i18next';
import { FormValidator } from '../../../lib/logic/ui/form';

class FtsForm {
  constructor(form: HTMLFormElement) {
    const name = form.querySelector<HTMLInputElement>('#fts-name')!;
    const email = form.querySelector<HTMLInputElement>('#fts-email')!;
    const phone = form.querySelector<HTMLInputElement>('#fts-phone')!;
    const message = form.querySelector<HTMLTextAreaElement>('#fts-message')!;
    const counter = form.querySelector<HTMLElement>('[data-fts-counter]');
    const consentInput = form.querySelector<HTMLInputElement>('.fts-form__consent input[type="checkbox"]')!;
    const consentBlock = form.querySelector<HTMLElement>('.fts-form__bottom')!;
    const submit = form.querySelector<HTMLButtonElement>('.fts-form__submit')!;

    this.bindFile(form);

    new FormValidator({
      form,
      theme: {
        containerSelector: '.fts-form__field',
        inputErrorClass: 'fts-form__input--error',
        errorMessageClass: 'fts-form__error',
      },
      fields: [
        { input: name, rules: [{ minLength: 2 }], errorKey: 'fts.errors.name' },
        { input: email, rules: ['email'], errorKey: 'fts.errors.email' },
        {
          input: message,
          rules: [{ minLength: 10 }],
          errorKey: 'fts.errors.message',
          autoGrow: true,
          counter: counter
            ? { el: counter, max: 1000, maxClass: 'fts-form__counter--max' }
            : undefined,
        },
        { input: phone, rules: ['phone'], errorKey: 'fts.errors.phone', phoneMask: true },
      ],
      consent: {
        input: consentInput,
        block: consentBlock,
        errorClass: 'fts-form__bottom--consent-error',
      },
      submit,
      readyClass: 'fts-form--ready',
      submittedClass: 'fts-form--submitted',
    });
  }

  private bindFile = (form: HTMLFormElement) => {
    const input = form.querySelector<HTMLInputElement>('[data-fts-file]');
    const textEl = form.querySelector<HTMLElement>('[data-fts-file-text]');
    if (!input || !textEl) return;

    const defaultKey = textEl.getAttribute('data-i18n') || 'fts.fields.fileBtn';

    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (file) {
        textEl.removeAttribute('data-i18n');
        textEl.textContent = file.name;
      } else {
        textEl.setAttribute('data-i18n', defaultKey);
        textEl.textContent = i18next.t(defaultKey);
      }
    });
  };
}

export { FtsForm };
