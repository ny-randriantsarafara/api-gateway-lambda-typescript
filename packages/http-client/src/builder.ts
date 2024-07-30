import { CustomResponse, HttpClient, RequestParams } from './types';
import { buildQueryString } from './utils';

export const builder = (baseUrl: string): HttpClient => {
  const fetchAndHandleResponse = async ({
    path,
    body,
    queryParams,
    options,
  }: RequestParams): Promise<CustomResponse> => {
    try {
      const queryString = buildQueryString(queryParams);
      const url = `${baseUrl}/${path}${queryString ? `?${queryString}` : ''}`;
      console.log('Requesting:', url);
      const fetchOptions = body
        ? {
            method: options?.method || 'GET',
            headers: { 'Content-Type': 'application/json', ...options?.headers },
            body: JSON.stringify(body),
            ...options,
          }
        : options;

      const response = await fetch(url, fetchOptions);
      const data = await response.json();
      return { status: response.status, data };
    } catch (error) {
      console.error('Request failed:', error);
      return { status: 500, error: 'Internal Server Error' }; // Customize error handling as needed
    }
  };

  return {
    get: (params: RequestParams) =>
      fetchAndHandleResponse({
        ...params,
        options: { method: 'GET', ...params.options },
      }),
    post: (params: RequestParams) =>
      fetchAndHandleResponse({
        ...params,
        options: { method: 'POST', ...params.options },
      }),
    put: (params: RequestParams) =>
      fetchAndHandleResponse({
        ...params,
        options: { method: 'PUT', ...params.options },
      }),
    delete: (params: RequestParams) =>
      fetchAndHandleResponse({
        ...params,
        options: { method: 'DELETE', ...params.options },
      }),
  };
};
