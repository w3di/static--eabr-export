import i18next from 'i18next';
import { FormValidator } from '../../../lib/logic/ui/form';

type SubmitState = 'loading' | 'success' | 'error';
const STATUSES: Record<SubmitState, SubmitState> = {
  loading: 'loading',
  success: 'success',
  error: 'error',
};

class IslamicForm {
  private form: HTMLFormElement;
  private submit: HTMLButtonElement;
  private submitLabel: string;
  private pending = false;

  constructor(form: HTMLFormElement) {
    this.form = form;

    const email = form.querySelector<HTMLInputElement>('#isl-email')!;
    const phone = form.querySelector<HTMLInputElement>('#isl-phone')!;
    const name = form.querySelector<HTMLInputElement>('#isl-name')!;
    const sum = form.querySelector<HTMLInputElement>('#isl-sum')!;
    const desc = form.querySelector<HTMLTextAreaElement>('#isl-desc')!;
    const consentInput = form.querySelector<HTMLInputElement>(
      'input[type="checkbox"]',
    )!;
    const consentBlock = form.querySelector<HTMLElement>('.isl-form__bottom')!;
    const submit = form.querySelector<HTMLButtonElement>('.isl-submit')!;
    const counter = form.querySelector<HTMLElement>('[data-isl-counter]');

    this.submit = submit;
    this.submitLabel = submit.textContent || '';

    new FormValidator({
      form,
      theme: {
        containerSelector: '.isl-field',
        inputErrorClass: 'isl-field--error',
        errorMessageClass: 'isl-field__error',
      },
      fields: [
        {
          input: email,
          rules: ['email'],
          errorKey: 'islamicFinance.errors.email',
        },
        {
          input: phone,
          rules: ['phone'],
          errorKey: 'islamicFinance.errors.phone',
          phoneMask: true,
        },
        {
          input: name,
          rules: [{ minLength: 2 }],
          errorKey: 'islamicFinance.errors.name',
        },
        {
          input: sum,
          rules: ['number'],
          errorKey: 'islamicFinance.errors.sum',
        },
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
      onValid: () => this.send(),
    });
  }

  private send = () => {
    if (this.pending) return;
    this.pending = true;
    this.setState(STATUSES.loading);

    const payload = new FormData(this.form);

    this.request(payload)
      .then(() => this.setState(STATUSES.success))
      .catch(() => this.setState(STATUSES.error))
      .then(() => {
        this.pending = false;
      });
  };

  private request = (_payload: FormData): Promise<{ ok: true }> =>
    new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (Math.random() < 0.7) {
          resolve({ ok: true });
        } else {
          reject(new Error('mock network error'));
        }
      }, 1200);
    });

  private setState = (state: SubmitState) => {
    this.form.classList.remove(
      'isl-form--loading',
      'isl-form--submitted',
      'isl-form--error',
    );

    if (state === 'loading') {
      this.form.classList.add('isl-form--loading');
      this.submit.disabled = true;
      this.submit.textContent = i18next.t('islamicFinance.sending');
      return;
    }

    this.submit.disabled = false;
    this.submit.textContent = this.submitLabel;

    if (state === 'success') {
      this.form.classList.add('isl-form--submitted');
    } else {
      this.form.classList.add('isl-form--error');
    }
  };
}

export { IslamicForm };
