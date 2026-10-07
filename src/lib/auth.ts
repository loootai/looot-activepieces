import { PieceAuth } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { loootRequest } from './client';

export const loootAuth = PieceAuth.SecretText({
  displayName: 'Agent token',
  description:
    'Create one in the looot dashboard under Settings, Agent tokens. Tick catalog.read, runs.read, runs.execute and usage.read. Docs: https://docs.looot.ai/connect/headless',
  required: true,
  validate: async ({ auth }) => {
    try {
      await loootRequest({ token: auth, method: HttpMethod.GET, path: '/v1/balance' });
      return { valid: true };
    } catch (e) {
      const status = (e as { response?: { status?: number } }).response?.status;
      return {
        valid: false,
        error: status === 401 ? 'looot rejected the token (401). Check that it is an active agent token.' : `Could not reach looot: ${(e as Error).message}`,
      };
    }
  },
});
