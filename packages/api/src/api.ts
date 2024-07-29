import { HttpRequest, HttpResponse, Middleware } from './types';

// TODO: Return the correct status code according to the error
export const api = () => {
  const registeredMiddlewares = new Map<string, Middleware[]>();

  const register = (method: string, uri: string, ...middlewares: Middleware[]) => {
    registeredMiddlewares.set(`${method}${uri}`, middlewares);
  };

  const execute = async (input: HttpRequest): Promise<HttpResponse> => {
    const routeMiddlewares = registeredMiddlewares.get(`${input.httpMethod}${input.resource}`);

    if (typeof routeMiddlewares === 'undefined') {
      throw new Error('Route is not registered');
    }

    let request;

    try {
      request = { ...input, body: JSON.parse(input.body as string) };
    } catch (error) {
      return { statusCode: 400, body: 'Invalid JSON input' };
    }

    try {
      request = { ...input, body: JSON.parse(input.body as string) };
    } catch (error) {
      return { statusCode: 400, body: 'Invalid JSON input' };
    }
    for (const middleware of routeMiddlewares) {
      request = await middleware(request);
    }
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(request),
    };
  };

  return {
    register,
    execute,
  };
};
