import gql from '~/apollo/topic';

export default {
  state: () => ({}),

  getters: {
    federalRooms: state => state.federalRooms
  },

  mutations: {
    setFederalRooms(state, { roomType, data }) {
      state.federalRooms[roomType] = data;
    }
  },

  actions: {
    requestTopicChange({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.requestTopicChange,
          variables: { topic: payload },
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          return data.requestTopicChange;
        })
        .catch(err => {
          return err;
        });
    }
  }
};
