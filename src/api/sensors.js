export function fetchSensors(authenticatedAxiosClient, queryParams) {
  const { limit, filterUrlQuery } = queryParams;
  let url = `/sensorregistry/list?limit=${limit}&${filterUrlQuery}&sort=stake`;
  return authenticatedAxiosClient.get(url).then(response => response);
}
