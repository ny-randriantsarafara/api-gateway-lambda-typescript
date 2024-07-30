// API related types
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export type HttpRequest = Omit<APIGatewayProxyEvent, 'body'> & { body: any };
export type HttpResponse = APIGatewayProxyResult;
export type Middleware = (input: HttpRequest) => Promise<any>;

// Database connection related types
export type Connect<ConnectionResponse> = (databaseUri: string) => Promise<ConnectionResponse>;
