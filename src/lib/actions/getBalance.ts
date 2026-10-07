import { createAction } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { loootAuth } from '../auth';
import { loootRequest } from '../client';

export const getBalance = createAction({
  auth: loootAuth,
  name: 'get_balance',
  displayName: 'Get Balance',
  description: 'Read the available credit and the top-up link. Free.',
  props: {},
  async run(context) {
    return loootRequest({ token: context.auth.secret_text, method: HttpMethod.GET, path: '/v1/balance' });
  },
});
