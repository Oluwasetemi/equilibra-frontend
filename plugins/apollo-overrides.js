// plugins/apollo-overrides.js
export default ({ app }, inject) => {
    app.apolloProvider.defaultOptions = {
      $query: {
        fetchPolicy: 'cache-and-network'
      }
    }
  }