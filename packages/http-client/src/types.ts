export type RequestParams = {
  path: string;
  body?: any;
  queryParams?: Record<string, any>;
  options?: RequestInit;
};

export type CustomResponse = {
  status: number;
  data?: any;
  error?: string;
};

export type HttpClient = {
  get(params: RequestParams): Promise<CustomResponse>;
  post(params: RequestParams): Promise<CustomResponse>;
  put(params: RequestParams): Promise<CustomResponse>;
  delete(params: RequestParams): Promise<CustomResponse>;
};
