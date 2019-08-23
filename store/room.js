import gql from '~/apollo/room';

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
    },
    removeUser(state) {
      state.user = {};
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
    }
  }
};
