type PhoneRule = {
  code: string;
  lengths: number[];
  pattern: RegExp;
  groups: number[];
};

const RULES: PhoneRule[] = [
  {
    code: '375',
    lengths: [6, 7, 8, 9, 10, 11],
    pattern:
      /^(?:(?:[12]\d|33|44|902)\d{7}|8(?:0[0-79]\d{5,7}|[1-7]\d{9})|8(?:1[0-489]|[5-79]\d)\d{7}|8[1-79]\d{6,7}|8[0-79]\d{5}|8\d{5})$/,
    groups: [2, 3, 2, 2],
  },
  {
    code: '374',
    lengths: [8],
    pattern: /^(?:[1-489]\d|55|60|77)\d{6}$/,
    groups: [2, 2, 2, 2],
  },
  {
    code: '996',
    lengths: [9, 10],
    pattern: /^(?:8\d{9}|[235-9]\d{8})$/,
    groups: [3, 3, 3],
  },
  {
    code: '992',
    lengths: [9],
    pattern: /^(?:[0-57-9]\d|66)\d{7}$/,
    groups: [3, 3, 3],
  },
  {
    code: '998',
    lengths: [9],
    pattern: /^(?:20|33|[5-9]\d)\d{7}$/,
    groups: [2, 3, 2, 2],
  },
  {
    code: '994',
    lengths: [9],
    pattern: /^(?:365\d{6}|(?:[124579]\d|60|88)\d{7})$/,
    groups: [2, 3, 2, 2],
  },
  {
    code: '995',
    lengths: [9],
    pattern: /^(?:[3-57]\d\d|800)\d{6}$/,
    groups: [3, 3, 3],
  },
  {
    code: '993',
    lengths: [8],
    pattern: /^(?:[1-6]\d|71)\d{6}$/,
    groups: [2, 2, 2, 2],
  },
  {
    code: '380',
    lengths: [9, 10],
    pattern: /^(?:[89]\d{9}|[3-9]\d{8})$/,
    groups: [2, 3, 2, 2],
  },
  {
    code: '373',
    lengths: [8],
    pattern: /^(?:[235-7]\d|[89]0)\d{6}$/,
    groups: [3, 3, 2],
  },
  {
    code: '7',
    lengths: [10, 14],
    pattern: /^(?:8\d{13}|[3-9]\d{9})$/,
    groups: [3, 3, 2, 2],
  },
].sort((a, b) => b.code.length - a.code.length);

class PhoneLite {
  static format(raw: string): string {
    const digits = PhoneLite.digitsOf(raw);
    if (!digits) return '';

    const hit = PhoneLite.match(digits);
    if (!hit) return '+' + PhoneLite.group(digits, [3, 3, 3, 3]);

    const national = PhoneLite.group(hit.national, hit.rule.groups);
    return national ? `+${hit.rule.code} ${national}` : `+${hit.rule.code}`;
  }

  static isValid(value: string): boolean {
    const digits = PhoneLite.digitsOf(value);
    if (!digits) return false;

    const hit = PhoneLite.match(digits);
    if (!hit) return digits.length >= 8 && digits.length <= 15;

    return (
      hit.rule.lengths.includes(hit.national.length) &&
      hit.rule.pattern.test(hit.national)
    );
  }

  private static digitsOf(raw: string): string {
    return raw.replace(/\D/g, '').slice(0, 15);
  }

  private static match(
    digits: string,
  ): { rule: PhoneRule; national: string } | null {
    for (const rule of RULES) {
      if (digits.startsWith(rule.code)) {
        return { rule, national: digits.slice(rule.code.length) };
      }
    }
    return null;
  }

  private static group(num: string, sizes: number[]): string {
    const parts: string[] = [];
    let i = 0;
    for (const size of sizes) {
      if (i >= num.length) break;
      parts.push(num.slice(i, i + size));
      i += size;
    }
    while (i < num.length) {
      parts.push(num.slice(i, i + 3));
      i += 3;
    }
    return parts.join(' ');
  }
}

export { PhoneLite };
