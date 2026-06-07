import {
  KEY_PRODUCTS,
  FUNDS,
} from '../../../src/main/pages/key-products/keyProducts';
import { BANK_PROGRAMS } from '../../../src/main/pages/bank-programs/bankPrograms';

type PageData = Record<string, unknown>;

const PAGE_DATA: Record<string, PageData> = {
  'key-products': {
    keyProducts: KEY_PRODUCTS,
    funds: FUNDS,
  },
  'bank-programs': {
    programs: BANK_PROGRAMS,
  },
};

export { PAGE_DATA, type PageData };
