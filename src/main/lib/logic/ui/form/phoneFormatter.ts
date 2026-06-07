import { PhoneLite } from './phoneLite';

class PhoneFormatter {
  static format(raw: string): string {
    return PhoneLite.format(raw);
  }
}

export { PhoneFormatter };
