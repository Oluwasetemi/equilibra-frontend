import gql from '~/apollo/user/contact';

export default {
  state: () => ({}),

  getters: {},

  mutations: {},

  actions: {
    sendContactUs({}, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.sendContactUs,
          variables: payload
        })
        .then(({ data }) => {
          return data.sendContactUs;
        })
        .catch(err => {
          return err;
        });
    }
  }
};
