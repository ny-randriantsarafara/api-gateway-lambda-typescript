import { HttpRequest, HttpResponse, Middleware } from './types';

// TODO: Return the correct status code according to the error
export const api = (...middlewares: Middleware[]) => {
  return async (input: HttpRequest): Promise<HttpResponse> => {
    let response;
    try {
      response = { ...input, body: JSON.parse(input.body as string) };
    } catch (error) {
      return { statusCode: 400, body: 'Invalid JSON input' };
    }
    for (const middleware of middlewares) {
      response = await middleware(response);
    }
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  };
};
