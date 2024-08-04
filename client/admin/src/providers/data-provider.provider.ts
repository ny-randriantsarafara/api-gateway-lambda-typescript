import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  fetchUtils,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  Identifier,
  QueryFunctionContext,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from 'react-admin';

const httpClient = fetchUtils.fetchJson;

const appendSortParams = (url: URL, sort: { field?: string; order?: string }): URL => {
  const newUrl = new URL(url.toString());
  if (sort?.field && sort?.order) {
    newUrl.searchParams.append(`${sort.field}.sort`, sort.order.toLowerCase());
  }
  return newUrl;
};

const appendFilterParams = (url: URL, filter: Record<string, any>): URL => {
  const newUrl = new URL(url.toString());
  Object.entries(filter).forEach(([key, value]) => {
    newUrl.searchParams.append(key, value);
  });
  return newUrl;
};

const handleHttpClientResponse = async (url: string | URL) => {
  const { headers, json } = await httpClient(url);
  return { headers, json };
};

export const dataProvider = (baseApiUrl: string): DataProvider => ({
  async create<RecordType, ResultRecordType extends RaRecord<Identifier>>(
    resource: string,
    params: CreateParams,
  ): Promise<CreateResult<ResultRecordType>> {
    const { json } = await httpClient(`${baseApiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  async delete<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: DeleteParams<RecordType>,
  ): Promise<DeleteResult<RecordType>> {
    const { json } = await httpClient(`${baseApiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    });
    return { data: json };
  },

  async deleteMany<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: DeleteManyParams<RecordType>,
  ): Promise<DeleteManyResult<RecordType>> {
    throw new Error(`DELETE many ${resource} not implemented`);
  },

  async getList<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: GetListParams & QueryFunctionContext,
  ): Promise<GetListResult<RecordType>> {
    const url = new URL(`${baseApiUrl}/${resource}`);
    const urlWithSortParams = appendSortParams(url, { field: params?.sort?.field, order: params?.sort?.order });
    const urlWithSortAndFilterParams = appendFilterParams(urlWithSortParams, params.filter);

    const { json } = await handleHttpClientResponse(urlWithSortAndFilterParams);
    return { ...json, total: json.count };
  },

  async getMany<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: GetManyParams<RecordType> & QueryFunctionContext,
  ): Promise<GetManyResult<RecordType>> {
    const url = `${baseApiUrl}/${resource}`;
    const { json } = await handleHttpClientResponse(url);
    return { ...json, total: json.count };
  },

  async getManyReference<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: GetManyReferenceParams & QueryFunctionContext,
  ): Promise<GetManyReferenceResult<RecordType>> {
    const { target, id } = params;
    let url = new URL(`${baseApiUrl}/${resource}`);
    url.searchParams.append(`${target}.eq`, id.toString());

    const { json } = await handleHttpClientResponse(url);
    return { ...json, total: json.count };
  },

  async getOne<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: GetOneParams<RecordType> & QueryFunctionContext,
  ): Promise<GetOneResult<RecordType>> {
    const { json } = await httpClient(`${baseApiUrl}/${resource}/${params.id}`);
    return { data: json };
  },

  async update<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: UpdateParams,
  ): Promise<UpdateResult<RecordType>> {
    const { json } = await httpClient(`${baseApiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  async updateMany<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: UpdateManyParams,
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error(`Update many reference on ${resource} not implemented`);
  },

  async getFiltersValues(resource: string, params: { fields: string[] }): Promise<Record<string, any>> {
    const { json } = await httpClient(`${baseApiUrl}/${resource}/filters-values?fields=${params.fields.join(',')}`);
    return { data: json };
  },
});
