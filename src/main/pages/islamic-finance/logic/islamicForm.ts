import { FormValidator } from '../../../lib/logic/ui/form';

class IslamicForm {
  constructor(form: HTMLFormElement) {
    const email = form.querySelector<HTMLInputElement>('#isl-email')!;
    const phone = form.querySelector<HTMLInputElement>('#isl-phone')!;
    const name = form.querySelector<HTMLInputElement>('#isl-name')!;
    const sum = form.querySelector<HTMLInputElement>('#isl-sum')!;
    const desc = form.querySelector<HTMLTextAreaElement>('#isl-desc')!;
    const consentInput = form.querySelector<HTMLInputElement>('input[type="checkbox"]')!;
    const consentBlock = form.querySelector<HTMLElement>('.isl-form__bottom')!;
    const submit = form.querySelector<HTMLButtonElement>('.isl-submit')!;
    const counter = form.querySelector<HTMLElement>('[data-isl-counter]');

    new FormValidator({
      form,
      theme: {
        containerSelector: '.isl-field',
        inputErrorClass: 'isl-field--error',
        errorMessageClass: 'isl-field__error',
      },
      fields: [
        { input: email, rules: ['email'], errorKey: 'islamicFinance.errors.email' },
        { input: phone, rules: ['phone'], errorKey: 'islamicFinance.errors.phone', phoneMask: true },
        { input: name, rules: [{ minLength: 2 }], errorKey: 'islamicFinance.errors.name' },
        { input: sum, rules: ['number'], errorKey: 'islamicFinance.errors.sum' },
        {
          input: desc,
          rules: [{ minLength: 10 }],
          errorKey: 'islamicFinance.errors.desc',
          autoGrow: true,
          counter: counter
            ? { el: counter, max: 300, maxClass: 'isl-counter--max' }
            : undefined,
        },
      ],
      consent: {
        input: consentInput,
        block: consentBlock,
        errorClass: 'isl-form__bottom--consent-error',
      },
      submit,
      readyClass: 'isl-form--ready',
      submittedClass: 'isl-form--submitted',
    });
  }
}

export { IslamicForm };
