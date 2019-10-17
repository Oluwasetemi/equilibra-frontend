import { onError } from 'apollo-link-error';
export default function(context) {
  const errorLink = onError(
    ({ graphQLErrors, networkError, response, operation }) => {
      // if (operation.operationName !== 'verifyEmail') {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) {
        // context.app.$toast(`[Network error]: ${networkError}`);
        console.log(`[Network error]: ${networkError}`);
      }
      return;
    }
  );
  return {
    onError: errorLink,
    httpEndpoint: 'https://api.equilibra.test.natterbase.com',
    wsEndpoint: 'wss://api.equilibra.test.natterbase.com:5505/subscriptions',
    persisting: false,
    websocketsOnly: false,
    httpLinkOptions: {
      credentials: 'same-origin',
      connectToDevTools: true
    }
  };
}
