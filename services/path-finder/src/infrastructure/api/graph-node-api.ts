import { api, HttpRequest, HttpResponse } from '@packages/api';

const graphNodeApi = api();

graphNodeApi.register('POST', '/graph-nodes', async request => {});

export const handler = async (event: HttpRequest): Promise<HttpResponse> => graphNodeApi.execute(event);
