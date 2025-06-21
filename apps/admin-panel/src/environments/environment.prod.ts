export const environment = {
  production: true,
  root: `${window.location.protocol}//${window.location.hostname.toString()}/admin-api/`,
  wsEndpoint: `${window.location.protocol.replace('http','ws')}//${window.location.hostname.toString()}/admin-api/graphql`
};
