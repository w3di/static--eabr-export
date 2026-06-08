import i18next from 'i18next';
import { Validators } from './validators';
import { PhoneFormatter } from './phoneFormatter';
import { FieldError, type ErrorTheme } from './fieldError';

type Rule = 'required' | 'email' | 'phone' | 'number' | { minLength: number };

type FieldDef = {
  input: HTMLInputElement | HTMLTextAreaElement;
  rules: Rule[];
  errorKey: string;
  phoneMask?: boolean;
  counter?: { el: HTMLElement; max: number; maxClass: string };
  autoGrow?: boolean;
};

type ConsentDef = {
  input: HTMLInputElement;
  block: HTMLElement;
  errorClass: string;
};

type FormConfig = {
  form: HTMLFormElement;
  theme: ErrorTheme;
  fields: FieldDef[];
  consent?: ConsentDef;
  submit: HTMLButtonElement;
  readyClass?: string;
  submittedClass?: string;
  onValid?: () => void;
};

class FormValidator {
  private cfg: FormConfig;

  constructor(cfg: FormConfig) {
    this.cfg = cfg;
    this.bind();
    this.initCounters();
    this.initAutoGrow();
    this.updateReady();
  }

  private bind = () => {
    this.cfg.form.addEventListener('submit', this.onSubmit);

    this.cfg.fields.forEach((f) => {
      f.input.addEventListener('input', () => this.onFieldInput(f));
      if (f.phoneMask) {
        f.input.addEventListener('input', () => this.onPhoneInput(f));
      }
    });

    if (this.cfg.consent) {
      this.cfg.consent.input.addEventListener('change', this.onConsentChange);
      this.cfg.consent.input.addEventListener('keydown', this.onConsentKeydown);
    }
  };

  private initCounters = () => {
    this.cfg.fields.forEach((f) => {
      if (f.counter) this.updateCounter(f);
    });
  };

  private initAutoGrow = () => {
    this.cfg.fields.forEach((f) => {
      if (f.autoGrow) this.autoGrow(f.input as HTMLTextAreaElement);
    });
    window.addEventListener('resize', this.resizeAutoGrows);
  };

  private resizeAutoGrows = () => {
    this.cfg.fields.forEach((f) => {
      if (f.autoGrow) this.autoGrow(f.input as HTMLTextAreaElement);
    });
  };

  private onFieldInput = (f: FieldDef) => {
    FieldError.clear(f.input, this.cfg.theme);
    if (f.counter) this.updateCounter(f);
    if (f.autoGrow) this.autoGrow(f.input as HTMLTextAreaElement);
    this.updateReady();
  };

  private onPhoneInput = (f: FieldDef) => {
    f.input.value = PhoneFormatter.format(f.input.value);
  };

  private onConsentChange = () => {
    if (!this.cfg.consent) return;
    this.cfg.consent.block.classList.remove(this.cfg.consent.errorClass);
    this.updateReady();
  };

  private onConsentKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' || !this.cfg.consent) return;
    e.preventDefault();
    this.cfg.consent.input.checked = !this.cfg.consent.input.checked;
    this.cfg.consent.input.dispatchEvent(
      new Event('change', { bubbles: true }),
    );
  };

  private updateCounter = (f: FieldDef) => {
    if (!f.counter) return;
    const len = f.input.value.length;
    f.counter.el.textContent = `${len}/${f.counter.max}`;
    f.counter.el.classList.toggle(f.counter.maxClass, len >= f.counter.max);
  };

  private autoGrow = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  private allFilled = (): boolean =>
    this.cfg.fields.every((f) => f.input.value.trim().length > 0);

  private consentOk = (): boolean =>
    !this.cfg.consent || this.cfg.consent.input.checked;

  private updateReady = () => {
    const ready = this.allFilled() && this.consentOk();
    if (this.cfg.readyClass) {
      this.cfg.form.classList.toggle(this.cfg.readyClass, ready);
    }
    this.cfg.submit.disabled = !ready;
  };

  private testRule = (rule: Rule, v: string): boolean => {
    if (rule === 'required') return Validators.required(v);
    if (rule === 'email') return Validators.email(v);
    if (rule === 'phone') return Validators.phone(v);
    if (rule === 'number') return Validators.number(v);
    return Validators.minLength(v, rule.minLength);
  };

  private validate = (): boolean => {
    let ok = true;

    this.cfg.fields.forEach((f) => {
      const passes = f.rules.every((rule) =>
        this.testRule(rule, f.input.value),
      );
      if (!passes) {
        FieldError.set(f.input, i18next.t(f.errorKey), this.cfg.theme);
        ok = false;
      }
    });

    if (this.cfg.consent && !this.cfg.consent.input.checked) {
      this.cfg.consent.block.classList.add(this.cfg.consent.errorClass);
      ok = false;
    }

    return ok;
  };

  private focusFirstError = () => {
    const first = this.cfg.form.querySelector<HTMLElement>(
      `.${this.cfg.theme.inputErrorClass}`,
    );
    if (first) {
      first.focus();
      return;
    }
    if (
      this.cfg.consent?.block.classList.contains(this.cfg.consent.errorClass)
    ) {
      this.cfg.consent.input.focus();
    }
  };

  private onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!this.validate()) {
      this.focusFirstError();
      return;
    }
    if (this.cfg.submittedClass) {
      this.cfg.form.classList.add(this.cfg.submittedClass);
    }
    this.cfg.onValid?.();
  };
}

export { FormValidator, type FormConfig, type FieldDef, type Rule };
