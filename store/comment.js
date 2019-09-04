import gql from '~/apollo/user/comment';

export default {
  state: () => ({
    comments: {
      edges: [],
      pageInfo: []
    }
  }),

  getters: {
    comments: state => state.comments
  },

  mutations: {
    setComments(state, payload) {
      state.comments = payload;
    }
  },

  actions: {
    fetchComments({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.fetchComments,
          variables: payload,
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          commit('setComments', data.fetchComments);
          return data.fetchComments;
        })
        .catch(err => {
          return err;
        });
    },
    createComment({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.createComment,
          variables: payload,
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          },
          refetchQueries: [
            {
              query: gql.fetchComments,
              variables: { topicId: payload.topic, limit: 10 },
              context: {
                headers: {
                  Authorization: `Bearer ${rootState.auth.token}`
                }
              }
            }
          ]
        })
        .then(({ data }) => {
          return data.createComment;
        })
        .catch(err => {
          return err;
        });
    },
    editComment({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.editComment,
          variables: payload,
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          return data.editComment;
        })
        .catch(err => {
          return err;
        });
    },
    deleteComment({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.deleteComment,
          variables: payload,
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          return data.deleteComment;
        })
        .catch(err => {
          return err;
        });
    },
    replyComment({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.replyComment,
          variables: payload,
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          return data.replyComment;
        })
        .catch(err => {
          return err;
        });
    },
    likeComment({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.likeComment,
          variables: payload,
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          return data.likeComment;
        })
        .catch(err => {
          return err;
        });
    },
    unLikeComment({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.unLikeComment,
          variables: payload,
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          return data.unLikeComment;
        })
        .catch(err => {
          return err;
        });
    }
  },
  reportComment({ commit, rootState }, payload) {
    return this.app.apolloProvider.defaultClient
      .mutate({
        mutation: gql.reportComment,
        variables: payload,
        context: {
          headers: {
            Authorization: `Bearer ${rootState.auth.token}`
          }
        }
      })
      .then(({ data }) => {
        return data.reportComment;
      })
      .catch(err => {
        return err;
      });
  }
};
