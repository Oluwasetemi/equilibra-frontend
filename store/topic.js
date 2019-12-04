import gql from '~/apollo/user/topic';

export default {
  state: () => ({
    voteResults: []
  }),

  getters: {
    federalRooms: state => state.federalRooms,
    discussionVoteResults: state => state.voteResults
  },

  mutations: {
    setFederalRooms(state, { roomType, data }) {
      state.federalRooms[roomType] = data;
    },
    setDiscussionVoteResults(state, data) {
      // state.voteResults[data.voteId] = data.data;;
      state.voteResults.push(data);
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
    },
    suggestTopic({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.suggestTopic,
          variables: payload,
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          return data.suggestTopic;
        })
        .catch(err => {
          return err;
        });
    },
    vote({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.vote,
          variables: { voteInput: payload },
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          return data.vote;
        })
        .catch(err => {
          return err;
        });
    },
    closeRequestTopicChangeVoting({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.closeRequestTopicChangeVoting,
          variables: payload,
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          return data.closeRequestTopicChangeVoting;
        })
        .catch(err => {
          return err;
        });
    },
    closeTopicDiscussionVoting({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.closeTopicDiscussionVoting,
          variables: payload,
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          commit('setDiscussionVoteResults', {
            ...data.closeTopicDiscussionVoting,
            voteId: payload.voteId
          });
          return data.closeTopicDiscussionVoting;
        })
        .catch(err => {
          return err;
        });
    }
  }
};
