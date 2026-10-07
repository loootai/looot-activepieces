import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { loootAuth } from '../auth';
import { loootRequest } from '../client';

export const getRun = createAction({
  auth: loootAuth,
  name: 'get_run',
  displayName: 'Get Run',
  description: 'Read one run: status, result and cost. Free.',
  props: {
    runId: Property.ShortText({ displayName: 'Run ID', required: true }),
  },
  async run(context) {
    return loootRequest({
      token: context.auth.secret_text,
      method: HttpMethod.GET,
      path: `/v1/runs/${encodeURIComponent(context.propsValue.runId)}`,
    });
  },
});
