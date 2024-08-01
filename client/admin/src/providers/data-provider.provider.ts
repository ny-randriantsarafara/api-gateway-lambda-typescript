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
} from "react-admin";

const httpClient = fetchUtils.fetchJson;

export const dataProvider = (baseApiUrl: string): DataProvider => ({
  async create<RecordType, ResultRecordType extends RaRecord<Identifier>>(
    resource: string,
    params: CreateParams
  ): Promise<CreateResult<ResultRecordType>> {
    const { json } = await httpClient(`${baseApiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },
  async delete<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: DeleteParams<RecordType>
  ): Promise<DeleteResult<RecordType>> {
    const { json } = await httpClient(
      `${baseApiUrl}/${resource}/${params.id}`,
      {
        method: "DELETE",
      }
    );
    return { data: json };
  },
  async deleteMany<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: DeleteManyParams<RecordType>
  ): Promise<DeleteManyResult<RecordType>> {
    throw new Error(`DELETE many ${resource} not implemented`);
  },
  async getList<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: GetListParams & QueryFunctionContext
  ): Promise<GetListResult<RecordType>> {
    const url = `${baseApiUrl}/${resource}`;

    const { headers, json } = await httpClient(url);
    return {
      data: json,
      total: json.length,
    };
  },
  async getMany<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: GetManyParams<RecordType> & QueryFunctionContext
  ): Promise<GetManyResult<RecordType>> {
    const url = `${baseApiUrl}/${resource}`;

    const { headers, json } = await httpClient(url);
    return {
      data: json,
    };
  },
  async getManyReference<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: GetManyReferenceParams & QueryFunctionContext
  ): Promise<GetManyReferenceResult<RecordType>> {
    const { target, id } = params;

    const url = new URL(`${baseApiUrl}/${resource}`);
    url.searchParams.append(target, id.toString());

    const { headers, json } = await httpClient(url);

    return { data: json, total: json.length };
  },
  async getOne<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: GetOneParams<RecordType> & QueryFunctionContext
  ): Promise<GetOneResult<RecordType>> {
    const { json } = await httpClient(`${baseApiUrl}/${resource}/${params.id}`);
    return {
      data: json,
    };
  },
  async update<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult<RecordType>> {
    const { json } = await httpClient(
      `${baseApiUrl}/${resource}/${params.id}`,
      {
        method: "PUT",
        body: JSON.stringify(params.data),
      }
    );
    return { data: json };
  },
  async updateMany<RecordType extends RaRecord<Identifier>>(
    resource: string,
    params: UpdateManyParams
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error(`Update many reference on ${resource} not implemented`);
  },
});
