import gql from '~/apollo/user';

export default {
  state: () => ({
    user: {}
  }),

  getters: {
    getUser: state => state.user
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    removeUser(state) {
      state.user = {};
    }
  },

  actions: {
    changePassword({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.changePassword,
          variables: { passwordInput: payload },
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          return data.changePassword;
        })
        .catch(err => {
          return err;
        });
    },
    updateProfile({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.updateProfile,
          variables: payload,
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          commit('setUser', data.updateProfile.user);
          return data.updateProfile;
        })
        .catch(err => {
          return err;
        });
    },
    updateResidence({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.updateResidence,
          variables: payload,
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          commit('setUser', data.updateResidence.user);
          return data.updateResidence;
        })
        .catch(err => {
          return err;
        });
    }
  }
};
