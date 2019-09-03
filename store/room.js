import gql from '~/apollo/user/room';

export default {
  state: () => ({
    federalRooms: {
      HOUSE_OF_REPRESENTATIVE: [],
      SENATE: [],
      MINISTRY: [],
      COURT: []
    },
    joinedRooms: []
  }),

  getters: {
    federalRooms: state => state.federalRooms,
    getJoinedRooms: state => state.joinedRooms
  },

  mutations: {
    setFederalRooms(state, { roomType, data }) {
      state.federalRooms[roomType] = data;
    },
    addRoom(state, roomId) {
      state.joinedRooms.push(roomId);
    },
    removeRoom(state, id) {
      let rooms = state.joinedRooms;
      rooms.find((roomId, index) => {
        if (roomId == id) {
          rooms.splice(index, 1);
        }
      });
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
          variables: { roomId: payload }
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
          commit('addRoom', data.joinRoom._id);
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
          commit('removeRoom', data.leaveRoom._id);
          return data.leaveRoom;
        })
        .catch(err => {
          return err;
        });
    }
  }
};
