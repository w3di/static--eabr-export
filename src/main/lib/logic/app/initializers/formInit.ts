import 'air-datepicker/air-datepicker.css';
import AirDatepicker from 'air-datepicker';
import SlimSelect from 'slim-select';
import 'slim-select/scss';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from '@fancyapps/ui';
import { createPopper } from '@popperjs/core';
import { filterState } from '../../ui/filterState';

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

        const filterKey = item.dataset.filterKey;
        const inlineLabel = item.dataset.datepickerInlineLabel;

        const toIso = (s: string): string => {
          const [d, m, y] = s.split('.');
          return y && m && d ? `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}` : '';
        };

        const fromIso = (s: string): Date | null => {
          const [y, m, d] = s.split('-').map(Number);
          return y && m && d ? new Date(y, m - 1, d) : null;
        };

        const dp = new AirDatepicker(head, {
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
            if (inlineLabel) {
              head.value = date || inlineLabel;
            } else {
              head.value = 'Дата';
            }
            if (filterKey) {
              if (!date) {
                filterState.set(filterKey, null);
              } else {
                const isoParts = date.split(' - ').map(toIso).filter(Boolean);
                filterState.set(filterKey, isoParts.join('_') || null);
              }
            }
            if (isComplete) datepicker.hide();
          },
        });

        if (filterKey) {
          const initial = filterState.get(filterKey);
          if (initial) {
            const parsed = initial.split('_').map(fromIso).filter((d): d is Date => d !== null);
            if (parsed.length) {
              dp.selectDate(parsed.length === 1 ? parsed[0] : parsed, { silent: true });
              const display = parsed
                .map((d) =>
                  `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`,
                )
                .join(' - ');
              input.value = display;
              head.value = inlineLabel ? display : 'Дата';
            }
          }
        }
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
