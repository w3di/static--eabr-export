import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

class PhoneFormatter {
  static format(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 15);
    const withPlus = digits ? '+' + digits : '';
    return withPlus ? new AsYouType().input(withPlus) : '';
  }

  static normalize(v: string): string {
    const parsed = parsePhoneNumberFromString(v);
    return parsed ? parsed.number : v.trim();
  }
}

export { PhoneFormatter };
