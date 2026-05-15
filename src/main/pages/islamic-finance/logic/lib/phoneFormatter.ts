import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

class PhoneFormatter {
  static format(raw: string): string {
    const cleaned = raw.replace(/[^\d+]/g, '');
    const withPlus = cleaned.startsWith('+')
      ? cleaned
      : cleaned
        ? '+' + cleaned
        : '';
    return withPlus ? new AsYouType().input(withPlus) : '';
  }

  static normalize(v: string): string {
    const parsed = parsePhoneNumberFromString(v);
    return parsed ? parsed.number : v.trim();
  }
}

export { PhoneFormatter };
