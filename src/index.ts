import { createPiece } from '@activepieces/pieces-framework';
import { PieceCategory } from '@activepieces/shared';
import { loootAuth } from './lib/auth';
import { searchCatalog } from './lib/actions/searchCatalog';
import { inspectOperation } from './lib/actions/inspectOperation';
import { runOperation } from './lib/actions/runOperation';
import { getRun } from './lib/actions/getRun';
import { getBalance } from './lib/actions/getBalance';

export const looot = createPiece({
  displayName: 'looot',
  description: 'Search, inspect and run 2,500+ data API endpoints (emails, companies, SERP, news) with one prepaid balance.',
  auth: loootAuth,
  logoUrl: 'https://raw.githubusercontent.com/loootai/looot-plugin/main/plugins/claude-code/looot/.claude-plugin/icon.png',
  categories: [PieceCategory.SALES_AND_CRM, PieceCategory.MARKETING],
  authors: ['walidboulanouar'],
  actions: [searchCatalog, inspectOperation, runOperation, getRun, getBalance],
  triggers: [],
});
