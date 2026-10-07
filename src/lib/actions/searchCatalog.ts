import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod, QueryParams } from '@activepieces/pieces-common';
import { loootAuth } from '../auth';
import { loootRequest } from '../client';

export const searchCatalog = createAction({
  auth: loootAuth,
  name: 'search_catalog',
  displayName: 'Search Catalog',
  description: 'Find endpoints and jobs by what you want to do. Free.',
  props: {
    query: Property.ShortText({
      displayName: 'Query',
      description: 'What you want to do, in plain words',
      required: true,
    }),
    limit: Property.Number({ displayName: 'Limit', description: 'Max results', required: false, defaultValue: 50 }),
    category: Property.ShortText({ displayName: 'Category', required: false }),
    provider: Property.ShortText({ displayName: 'Provider', required: false }),
    prefer: Property.StaticDropdown({
      displayName: 'Prefer',
      required: false,
      defaultValue: 'balanced',
      options: {
        options: [
          { label: 'Balanced', value: 'balanced' },
          { label: 'Cheapest', value: 'cheapest' },
          { label: 'Fastest', value: 'fastest' },
          { label: 'Reliable', value: 'reliable' },
        ],
      },
    }),
    maxPriceMicros: Property.Number({
      displayName: 'Max price (micros)',
      description: 'Only endpoints that cost at most this many millionths of a dollar',
      required: false,
    }),
  },
  async run(context) {
    const p = context.propsValue;
    const queryParams: QueryParams = { q: p.query, limit: String(p.limit ?? 50) };
    if (p.category) queryParams['category'] = p.category;
    if (p.provider) queryParams['provider'] = p.provider;
    if (p.prefer) queryParams['prefer'] = p.prefer;
    if (p.maxPriceMicros) queryParams['maxPriceMicros'] = String(p.maxPriceMicros);
    return loootRequest({
      token: context.auth.secret_text,
      method: HttpMethod.GET,
      path: '/v1/catalog/search',
      queryParams,
    });
  },
});
