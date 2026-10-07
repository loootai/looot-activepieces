import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { loootAuth } from '../auth';
import { loootRequest } from '../client';

export const inspectOperation = createAction({
  auth: loootAuth,
  name: 'inspect_operation',
  displayName: 'Inspect Operation',
  description: 'Read the exact inputs, output and price of an endpoint or job. Free.',
  props: {
    endpointId: Property.ShortText({
      displayName: 'Endpoint ID',
      description: 'An endpoint from a search answer, or a job written as job:people.email.find',
      required: true,
    }),
  },
  async run(context) {
    return loootRequest({
      token: context.auth.secret_text,
      method: HttpMethod.GET,
      path: `/v1/operations/${encodeURIComponent(context.propsValue.endpointId)}`,
    });
  },
});
