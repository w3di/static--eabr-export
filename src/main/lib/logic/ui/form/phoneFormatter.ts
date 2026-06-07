import { AsYouType } from 'libphonenumber-js';

class PhoneFormatter {
  static format(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 15);
    const withPlus = digits ? '+' + digits : '';
    return withPlus ? new AsYouType().input(withPlus) : '';
  }
}

export { PhoneFormatter };
