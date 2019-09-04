import gql from '~/apollo/user/room';

export default {
  state: () => ({
    federalRooms: {
      HOUSE_OF_REPRESENTATIVE: [],
      SENATE: [],
      MINISTRY: [],
      COURT: []
    },
    myRooms: []
  }),

  getters: {
    federalRooms: state => state.federalRooms,
    myRooms: state => state.myRooms
  },

  mutations: {
    setFederalRooms(state, { roomType, data }) {
      state.federalRooms[roomType] = data;
    },
    setMyRooms(state, data) {
      state.myRooms = data;
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
    getMyRooms({ commit, rootState }) {
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.getMyRooms,
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          commit('setMyRooms', data.getMyRooms);
          return data.getMyRooms;
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
          }
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
          }
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
