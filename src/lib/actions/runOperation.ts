import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { loootAuth } from '../auth';
import { loootRequest } from '../client';

export const runOperation = createAction({
  auth: loootAuth,
  name: 'run_operation',
  displayName: 'Run Operation',
  description: 'Run an endpoint or job. Spends prepaid credit; a failed call costs nothing.',
  props: {
    endpointId: Property.ShortText({
      displayName: 'Endpoint ID',
      description: 'An endpoint from a search answer, or a job written as job:people.email.find',
      required: true,
    }),
    input: Property.Json({
      displayName: 'Input',
      description: 'The input object. Use the exact field names that Inspect Operation lists.',
      required: true,
      defaultValue: {},
    }),
    idempotencyKey: Property.ShortText({
      displayName: 'Idempotency key',
      description: 'Same key and same input never pays twice. Leave empty to use the flow run ID.',
      required: false,
    }),
    fallback: Property.Checkbox({
      displayName: 'Fallback',
      description: 'Try the next provider of the same job when the first finds nothing. Works with job: IDs.',
      required: false,
      defaultValue: true,
    }),
    maxCostUsd: Property.Number({
      displayName: 'Max cost (USD)',
      description: 'Cap for the whole fallback route. Empty or 0 means no extra cap.',
      required: false,
    }),
    wait: Property.Number({
      displayName: 'Wait (seconds)',
      description: 'How long to wait for the result before returning a run ID. 0 returns at once.',
      required: false,
      defaultValue: 20,
    }),
  },
  async run(context) {
    const p = context.propsValue;
    const input = (typeof p.input === 'string' ? JSON.parse(p.input) : p.input) as Record<string, unknown>;
    const body: Record<string, unknown> = {
      endpointId: p.endpointId,
      input,
      idempotencyKey: (p.idempotencyKey ?? '').trim() || `activepieces-${context.run.id}`,
      wait: p.wait ?? 20,
    };
    if (p.fallback !== false) {
      body['fallback'] = p.maxCostUsd && p.maxCostUsd > 0 ? { enabled: true, maxCostUsd: p.maxCostUsd } : true;
    }
    return loootRequest({
      token: context.auth.secret_text,
      method: HttpMethod.POST,
      path: '/v1/runs',
      body,
    });
  },
});
