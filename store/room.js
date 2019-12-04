import gql from '~/apollo/user/room';

export default {
  state: () => ({
    federalRooms: {
      HOUSE_OF_REPRESENTATIVE: [],
      SENATE: [],
      MINISTRY: [],
      COURT: []
    },
    stateRooms: {
      HOUSE_OF_ASSEMBLY: [],
      COURT: [],
      MINISTRY: [],
      LGA: []
    },
    ongoingTopicChange: [],
    ongoingDiscussionVoting: [],
    count: 0
  }),

  getters: {
    federalRooms: state => state.federalRooms,
    stateRooms: state => state.stateRooms,
    ongoingTopicChange: state => state.ongoingTopicChange,
    ongoingDiscussionVoting: state => state.ongoingDiscussionVoting
  },

  mutations: {
    setFederalRooms(state, { roomType, data }) {
      state.federalRooms[roomType] = data;
    },
    setStateRooms(state, { roomType, data }) {
      state.stateRooms[roomType] = data;
    },

    setRoomDiscussionVotingDetails(state, data) {
      if (state.ongoingDiscussionVoting.find(room => room.id == data.id))
        return;
      state.ongoingDiscussionVoting.push(data);
    },
    setRoomVotingDetails(state, data) {
      if (state.ongoingTopicChange.find(room => room.id == data.id)) return;
      state.ongoingTopicChange.push(data);
    },
    toggleVotingStatus(state, roomId) {
      state.ongoingTopicChange.forEach(room => {
        if (room.id == roomId) {
          room.voted = true;
        }
      });
    },
    toggleRoomDiscussionVotingStatus(state, roomId) {
      state.ongoingDiscussionVoting.forEach(room => {
        if (room.id == roomId) {
          room.voted = true;
        }
      });
    },
    toggleRoomDiscussionResultStatus(state, roomId) {
      state.ongoingDiscussionVoting.forEach(room => {
        if (room.id == roomId) {
          room.resultsIn = true;
        }
      });
    },
    setRoomVotingFields(state, data) {
      state.ongoingTopicChange.forEach(room => {
        if (room.id == data.roomId) {
          const keys = Object.keys(data.data);
          for (let key of keys) {
            room[key] = data.data[key];
          }
        }
      });
    },
    deleteRoom(state, roomId) {
      state.ongoingTopicChange.forEach((room, i) => {
        if (room.id == roomId) {
          state.ongoingTopicChange.splice(i, 1);
        }
      });
    }
  },

  actions: {
    getFederalRooms({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.getFederalRooms,
          variables: { roomType: payload },
          fetchPolicy: 'network-only'
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
    getStateRooms({ commit, rootState }, payload) {
      return this.app.apolloProvider.defaultClient
        .query({
          fetchPolicy: 'no-cache',
          query: gql.getStateRooms,
          variables: payload,
          fetchPolicy: 'network-only',
          context: {
            headers: {
              Authorization: `Bearer ${rootState.auth.token}`
            }
          }
        })
        .then(({ data }) => {
          commit('setStateRooms', {
            data: data.getStateRooms,
            roomType: payload.roomType
          });
          return data.getStateRooms;
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
    },
    initiateRoomVoting({ commit }, payload) {
      commit('setRoomVotingDetails', payload);
    },
    initiateRoomDiscussionVoting({ commit }, payload) {
      commit('setRoomDiscussionVotingDetails', payload);
    },
    toggleVotingStatus({ commit }, payload) {
      commit('toggleVotingStatus', payload);
    },
    setRoomVotingField({ commit }, payload) {
      commit('setRoomVotingFields', payload);
    },
    toggleRoomDiscussionVotingStatus({ commit }, payload) {
      commit('toggleRoomDiscussionVotingStatus', payload);
    },
    toggleRoomDiscussionResultStatus({ commit }, payload) {
      commit('toggleRoomDiscussionResultStatus', payload);
    },
    closeTopicChange({ commit }, payload) {
      commit('deleteRoom', payload);
    }
  }
};
