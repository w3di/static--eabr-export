import { parsePhoneNumberFromString } from 'libphonenumber-js';

class Validators {
  static required(v: string): boolean {
    return v.trim().length > 0;
  }

  static email(v: string): boolean {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v.trim());
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
