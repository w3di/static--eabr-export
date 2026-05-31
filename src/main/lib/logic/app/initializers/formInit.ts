import 'air-datepicker/air-datepicker.css';
import AirDatepicker from 'air-datepicker';
import SlimSelect from 'slim-select';
import 'slim-select/scss';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from '@fancyapps/ui';
import { createPopper } from '@popperjs/core';

class FormInit {
  constructor() {
    this.datePickers();
    this.selects();
    this.modals();
  }

  private datePickers() {
    document
      .querySelectorAll<HTMLElement>('[data-datepicker="block"]')
      .forEach((item) => {
        const input = item.querySelector<HTMLInputElement>(
          '[data-datepicker="field"]',
        )!;
        const head = item.querySelector<HTMLInputElement>(
          '[data-datepicker="head"]',
        )!;

        new AirDatepicker(head, {
          range: true,
          multipleDatesSeparator: '-',
          buttons: ['clear'],

          position({ $datepicker, $target, $pointer, done }) {
            const popper = createPopper($target, $datepicker, {
              placement: 'bottom',
              modifiers: [
                { name: 'flip', options: { padding: { top: 64 } } },
                { name: 'offset', options: { offset: [0, 10] } },
                { name: 'arrow', options: { element: $pointer } },
              ],
            });
            return function completeHide() {
              popper.destroy();
              done();
            };
          },

          onSelect({ formattedDate, datepicker }) {
            let date = '';
            let isComplete = false;
            if (Array.isArray(formattedDate)) {
              if (formattedDate.length === 2 && formattedDate[0] && formattedDate[1]) {
                const [from, to] = formattedDate;
                date = from === to ? from : `${from} - ${to}`;
                isComplete = true;
              } else if (formattedDate[0]) {
                date = formattedDate[0];
              }
            } else if (formattedDate) {
              date = formattedDate;
              isComplete = true;
            }
            input.value = date;
            const inlineLabel = item.dataset.datepickerInlineLabel;
            if (inlineLabel) {
              head.value = date || inlineLabel;
            } else {
              head.value = 'Дата';
            }
            if (isComplete) datepicker.hide();
          },
        });
      });
  }

  private selects() {
    document
      .querySelectorAll<HTMLElement>('[data-select="block"]')
      .forEach((item) => {
        const input = item.querySelector<HTMLInputElement>(
          '[data-select="field"]',
        )!;
        new SlimSelect({
          select: input,
          settings: { showSearch: false },
        });
      });
  }

  private modals() {
    Fancybox.bind('[data-fancybox="menu-aside"]', {
      mainClass: 'fancybox-aside-contents',
      closeButton: false,
    });
  }
}

export { FormInit };
