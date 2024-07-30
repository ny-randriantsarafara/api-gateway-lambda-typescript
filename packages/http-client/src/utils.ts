export const buildQueryString = (queryParams: Record<string, any> = {}): string => {
  return Object.keys(queryParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&');
};
