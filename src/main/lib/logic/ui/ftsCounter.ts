class FtsCounter {
  private textarea: HTMLTextAreaElement;
  private counter: HTMLElement;
  private max: number;

  constructor(textarea: HTMLTextAreaElement, counter: HTMLElement) {
    this.textarea = textarea;
    this.counter = counter;
    this.max = Number(textarea.maxLength) > 0 ? Number(textarea.maxLength) : 1000;

    this.bind();
    this.update();
    this.autoGrow();
  }

  private bind = () => {
    this.textarea.addEventListener('input', this.onInput);
    window.addEventListener('resize', this.autoGrow);
  };

  private onInput = () => {
    this.update();
    this.autoGrow();
  };

  private update = () => {
    this.counter.textContent = `${this.textarea.value.length}/${this.max}`;
  };

  private autoGrow = () => {
    this.textarea.style.height = 'auto';
    this.textarea.style.height = `${this.textarea.scrollHeight}px`;
  };
}

export { FtsCounter };
