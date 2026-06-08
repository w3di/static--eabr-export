import {
  KEY_PRODUCTS,
  FUNDS,
} from '../../../src/main/pages/key-products/keyProducts';
import { BANK_PROGRAMS } from '../../../src/main/pages/bank-programs/bankPrograms';
import { FTS_PARTNERS } from '../../../src/main/pages/fts/ftsPartners';
import { PPP_ANALYTICS } from '../../../src/main/pages/ppp-analytics/pppAnalytics';
import { COMPLIANCE_DOCS } from '../../../src/main/pages/investors/logic/complianceDocs';
import { INVESTORS } from '../../../src/main/pages/investors/investors';

type PageData = Record<string, unknown>;

const PAGE_DATA: Record<string, PageData> = {
  investors: INVESTORS,
  'ppp-analytics': {
    analytics: PPP_ANALYTICS,
  },
  'investors/compliance': {
    docs: COMPLIANCE_DOCS,
  },
  'key-products': {
    keyProducts: KEY_PRODUCTS,
    funds: FUNDS,
  },
  'bank-programs': {
    programs: BANK_PROGRAMS,
  },
  fts: {
    partners: FTS_PARTNERS,
  },
};

export { PAGE_DATA, type PageData };
