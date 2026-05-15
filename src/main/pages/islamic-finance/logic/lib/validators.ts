import { parsePhoneNumberFromString } from 'libphonenumber-js';

class Validators {
  static email(v: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  static phone(v: string): boolean {
    const p = parsePhoneNumberFromString(v.trim());
    return !!p && p.isValid();
  }

  static minLength(v: string, n: number): boolean {
    return v.trim().length >= n;
  }

  static number(v: string): boolean {
    const cleaned = v.replace(/[\s,]/g, '');
    return cleaned.length > 0 && !isNaN(Number(cleaned));
  }
}

export { Validators };
