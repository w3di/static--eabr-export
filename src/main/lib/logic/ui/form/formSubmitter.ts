import i18next from 'i18next';

type SubmitState = 'loading' | 'success' | 'error';

type SubmitterConfig = {
  form: HTMLFormElement;
  submit: HTMLButtonElement;
  block: string;
  sendingKey: string;
  request?: (payload: FormData) => Promise<unknown>;
};

const mockRequest = (): Promise<{ ok: true }> =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (Math.random() < 0.7) {
        resolve({ ok: true });
      } else {
        reject(new Error('mock network error'));
      }
    }, 1200);
  });

class FormSubmitter {
  private cfg: SubmitterConfig;
  private submitLabel: string;
  private pending = false;

  constructor(cfg: SubmitterConfig) {
    this.cfg = cfg;
    this.submitLabel = cfg.submit.textContent || '';
  }

  submit = (): void => {
    if (this.pending) return;
    this.pending = true;
    this.setState('loading');

    const payload = new FormData(this.cfg.form);
    const request = this.cfg.request ?? mockRequest;

    request(payload)
      .then(() => this.setState('success'))
      .catch(() => this.setState('error'))
      .then(() => {
        this.pending = false;
      });
  };

  private setState = (state: SubmitState): void => {
    const { form, submit, block, sendingKey } = this.cfg;

    form.classList.remove(
      `${block}--loading`,
      `${block}--submitted`,
      `${block}--error`,
    );

    if (state === 'loading') {
      form.classList.add(`${block}--loading`);
      submit.disabled = true;
      submit.textContent = i18next.t(sendingKey);
      return;
    }

    submit.disabled = false;
    submit.textContent = this.submitLabel;
    form.classList.add(
      state === 'success' ? `${block}--submitted` : `${block}--error`,
    );
  };
}

export { FormSubmitter, type SubmitterConfig };
