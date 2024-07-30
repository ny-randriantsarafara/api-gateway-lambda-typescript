import { HttpClient } from '@packages/http-client';

type GeneralParameters = {
  service: 'route' | 'table' | 'match' | 'nearest' | 'trip';
  version: string;
  profile: 'car' | 'bike' | 'foot' | 'driving';
};

type Longitude = number;
type Latitude = number;

type Coordinates = {
  source: [Longitude, Latitude];
  destination: [Longitude, Latitude];
};

export type GetRoute<T extends any> = (coordinates: Coordinates) => Promise<T>;

export type OSRMRepository<T extends any> = {
  getRoute: GetRoute<T>;
};

export const osrmRepositoryBuilder = <T extends any>(
  httpClient: HttpClient,
  generalParameters: GeneralParameters,
  serviceOptions: Record<string, any>
): OSRMRepository<T> => {
  const getRoute = async (coordinates: Coordinates) => {
    const endpoint = `${generalParameters.service}/${generalParameters.version}/${generalParameters.profile}/${coordinates.source[0]},${coordinates.source[1]};${coordinates.destination[0]},${coordinates.destination[1]}`;

    const result = await httpClient.get({
      path: endpoint,
      queryParams: serviceOptions,
    });
    if (typeof result.data === 'undefined') {
      throw new Error('Could not get route');
    }
    return result.data;
  };
  return { getRoute };
};
