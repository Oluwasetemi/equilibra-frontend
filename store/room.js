import gql from '~/apollo/user/room';

export default {
  state: () => ({
    federalRooms: {
      HOUSE_OF_REPRESENTATIVE: [],
      SENATE: [],
      MINISTRY: [],
      COURT: []
    }
  }),

  getters: {
    federalRooms: state => state.federalRooms
  },

  mutations: {
    setFederalRooms(state, { roomType, data }) {
      state.federalRooms[roomType] = data;
    }
  },

  actions: {
    getFederalRooms({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.getFederalRooms,
          variables: { roomType: payload }
        })
        .then(({ data }) => {
          commit('setFederalRooms', {
            data: data.getFederalRooms,
            roomType: payload
          });
          return data.getFederalRooms;
        })
        .catch(err => {
          return err;
        });
    },
    getRoomById({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.getRoomById,
          variables: { roomId: payload },
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          return data.getRoomById;
        })
        .catch(err => {
          return err;
        });
    },
    joinRoom({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.joinRoom,
          variables: { roomId: payload },
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          },
          refetchQueries: ['getMyRooms']
        })
        .then(({ data }) => {
          return data.joinRoom;
        })
        .catch(err => {
          return err;
        });
    },
    leaveRoom({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.leaveRoom,
          variables: { roomId: payload },
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          },
          refetchQueries: ['getMyRooms']
        })
        .then(({ data }) => {
          return data.leaveRoom;
        })
        .catch(err => {
          return err;
        });
    }
  }
};
