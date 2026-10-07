import { httpClient, HttpMethod, QueryParams } from '@activepieces/pieces-common';

export const LOOOT_BASE_URL = 'https://api.looot.ai';

type LoootRequest = {
  token: string;
  method: HttpMethod;
  path: string;
  queryParams?: QueryParams;
  body?: Record<string, unknown>;
};

/** Sends one authenticated request to the looot REST API and returns the JSON body. */
export async function loootRequest<T = unknown>(req: LoootRequest): Promise<T> {
  const response = await httpClient.sendRequest<T>({
    method: req.method,
    url: `${LOOOT_BASE_URL}${req.path}`,
    headers: { Authorization: `Bearer ${req.token}` },
    queryParams: req.queryParams,
    body: req.body,
  });
  return response.body;
}
