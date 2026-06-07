import { FormValidator, FormSubmitter } from '../../../lib/logic/ui/form';

class ComplianceForm {
  constructor(form: HTMLFormElement) {
    const name = form.querySelector<HTMLInputElement>('#cmpl-name')!;
    const message = form.querySelector<HTMLTextAreaElement>('#cmpl-msg')!;
    const email = form.querySelector<HTMLInputElement>('#cmpl-email')!;
    const phone = form.querySelector<HTMLInputElement>('#cmpl-phone')!;
    const counter = form.querySelector<HTMLElement>('[data-inv-counter]');
    const consentInput = form.querySelector<HTMLInputElement>(
      '.inv-form__consent input[type="checkbox"]',
    )!;
    const consentBlock = form.querySelector<HTMLElement>('.inv-form__bottom')!;
    const submit = form.querySelector<HTMLButtonElement>('.inv-form__submit')!;

    const submitter = new FormSubmitter({
      form,
      submit,
      block: 'inv-form',
      sendingKey: 'inv.compliance.sending',
    });

    new FormValidator({
      form,
      theme: {
        containerSelector: '.inv-field',
        inputErrorClass: 'inv-field__input--error',
        errorMessageClass: 'inv-field__error',
      },
      fields: [
        { input: name, rules: [{ minLength: 2 }], errorKey: 'inv.compliance.errName' },
        {
          input: message,
          rules: [{ minLength: 10 }],
          errorKey: 'inv.compliance.errMsg',
          autoGrow: true,
          counter: counter
            ? { el: counter, max: 1000, maxClass: 'inv-field__counter--max' }
            : undefined,
        },
        { input: email, rules: ['email'], errorKey: 'inv.compliance.errEmail' },
        {
          input: phone,
          rules: ['phone'],
          errorKey: 'inv.compliance.errPhone',
          phoneMask: true,
        },
      ],
      consent: {
        input: consentInput,
        block: consentBlock,
        errorClass: 'inv-form__bottom--consent-error',
      },
      submit,
      readyClass: 'inv-form--ready',
      onValid: submitter.submit,
    });
  }
}

export { ComplianceForm };
