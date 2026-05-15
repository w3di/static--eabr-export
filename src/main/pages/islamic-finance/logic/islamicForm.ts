import i18next from 'i18next';
import { Validators } from './lib/validators';
import { PhoneFormatter } from './lib/phoneFormatter';
import { FieldError } from './lib/fieldError';

type IslFields = {
  email: HTMLInputElement;
  phone: HTMLInputElement;
  name: HTMLInputElement;
  sum: HTMLInputElement;
  desc: HTMLTextAreaElement;
};

class IslamicForm {
  private form: HTMLFormElement;
  private fields: IslFields;
  private consent: HTMLInputElement;
  private counter: HTMLElement | null;

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.fields = {
      email: form.querySelector('#isl-email')!,
      phone: form.querySelector('#isl-phone')!,
      name: form.querySelector('#isl-name')!,
      sum: form.querySelector('#isl-sum')!,
      desc: form.querySelector('#isl-desc')!,
    };
    this.consent = form.querySelector('input[type="checkbox"]')!;
    this.counter = form.querySelector('[data-isl-counter]');

    this.bind();
  }

  private bind = () => {
    this.form.addEventListener('submit', this.onSubmit);
    this.fields.desc.addEventListener('input', this.updateCounter);
    this.fields.desc.addEventListener('input', this.autoGrowDesc);
    this.fields.phone.addEventListener('input', this.onPhoneInput);
    Object.values(this.fields).forEach((f) => {
      f.addEventListener('input', () => FieldError.clear(f));
    });
    this.consent.addEventListener('change', this.onConsentChange);
    this.consent.addEventListener('keydown', this.onConsentKeydown);
    this.autoGrowDesc();
  };

  private focusFirstError = () => {
    const first = this.form.querySelector<HTMLElement>(
      '.isl-field--error',
    );
    if (first) {
      first.focus();
      return;
    }
    if (this.form.querySelector('.isl-form__bottom--consent-error')) {
      this.consent.focus();
    }
  };

  private onConsentKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.consent.checked = !this.consent.checked;
      this.consent.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  private autoGrowDesc = () => {
    const el = this.fields.desc;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  private onConsentChange = () => {
    this.form
      .querySelector('.isl-form__bottom')
      ?.classList.remove('isl-form__bottom--consent-error');
    this.form.classList.toggle('isl-form--ready', this.consent.checked);
  };

  private onPhoneInput = () => {
    this.fields.phone.value = PhoneFormatter.format(this.fields.phone.value);
  };

  private updateCounter = () => {
    const v = this.fields.desc.value;
    if (!this.counter) return;
    this.counter.textContent = `${v.length}/300`;
    this.counter.classList.toggle('isl-counter--max', v.length >= 300);
  };

  private validate = (): boolean => {
    let ok = true;
    const { email, phone, name, sum, desc } = this.fields;

    if (!Validators.email(email.value)) {
      FieldError.set(email, i18next.t('islamicFinance.errors.email'));
      ok = false;
    }
    if (!Validators.phone(phone.value)) {
      FieldError.set(phone, i18next.t('islamicFinance.errors.phone'));
      ok = false;
    }
    if (!Validators.minLength(name.value, 2)) {
      FieldError.set(name, i18next.t('islamicFinance.errors.name'));
      ok = false;
    }
    if (!Validators.number(sum.value)) {
      FieldError.set(sum, i18next.t('islamicFinance.errors.sum'));
      ok = false;
    }
    if (!Validators.minLength(desc.value, 10)) {
      FieldError.set(desc, i18next.t('islamicFinance.errors.desc'));
      ok = false;
    }
    if (!this.consent.checked) {
      this.form
        .querySelector('.isl-form__bottom')
        ?.classList.add('isl-form__bottom--consent-error');
      ok = false;
    }

    return ok;
  };

  private onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!this.validate()) {
      this.focusFirstError();
      return;
    }

    const data = {
      email: this.fields.email.value.trim(),
      phone: PhoneFormatter.normalize(this.fields.phone.value),
      name: this.fields.name.value.trim(),
      sum: Number(this.fields.sum.value.replace(/[\s,]/g, '')),
      description: this.fields.desc.value.trim(),
      consent: true,
    };

    console.log('Заявка:', data);
    this.form.classList.add('isl-form--submitted');
  };
}

export { IslamicForm };
