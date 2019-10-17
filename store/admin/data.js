/* eslint-disable */
// Remember to update resetState mutation
import Cookie from "js-cookie";
import gql from "~/apollo/admin";
import ApolloCacheUpdater from "apollo-cache-updater";
const state = () => ({
  sub: {
    governments: [],
    categories: [],
    rooms: []
  }
});

const getters = {
  governments: state => state.sub.governments,
  categories: state => state.sub.categories,
  rooms: state => state.sub.rooms
};

const actions = {
  // fetch all reports by admin
  getAllGovts({ commit, state, rootState }, payload) {
    return this.app.apolloProvider.defaultClient
      .query({
        query: gql.Data.allGovts,
        variables: {
          first: payload.limit,
          start: payload.skip,
          slug: payload.slug
        },
        context: {
          headers: {
            Authorization: `Bearer ${rootState.admin.sub.token}`
          }
        }
      })
      .then(({ data }) => {
        commit("setGovts", data.allGovernmentBasedOnCategory);
        return data.allGovernmentBasedOnCategory;
      })
      .catch(err => {
        return err;
      });
  },

  getStateGovts({ commit, state, rootState }, payload) {
    return this.app.apolloProvider.defaultClient
      .query({
        query: gql.Data.allGovts,
        variables: { slug: payload.slug },
        context: {
          headers: {
            Authorization: `Bearer ${rootState.admin.sub.token}`
          }
        }
      })
      .then(({ data }) => {
        return data.allGovernmentBasedOnCategory;
      })
      .catch(err => {
        return err;
      });
  },

  createGovt({ commit, state, rootState }, payload) {
    let id = payload.id;
    delete payload.id;
    return this.app.apolloProvider.defaultClient
      .mutate({
        mutation: gql.Data.createGovt,
        variables: { id: id, governmentInput: payload },
        context: {
          headers: {
            Authorization: `Bearer ${rootState.admin.sub.token}`
          }
        }
      })
      .then(({ data }) => {
        commit("updateGovernment", data.updateGovernment);
        return data.updateGovernment;
      })
      .catch(err => {
        return err;
      });
  },

  getRooms({ commit, state, rootState }, payload) {
    return this.app.apolloProvider.defaultClient
      .query({
        query: gql.Data.allRooms,
        variables: {
          roomType: payload.roomType,
          skip: payload.skip,
          limit: payload.limit
        },
        context: {
          headers: {
            Authorization: `Bearer ${rootState.admin.sub.token}`
          }
        }
      })
      .then(({ data }) => {
        commit("setRooms", data.fetchAllConstituencyAdmin);
        return data.fetchAllConstituencyAdmin;
      })
      .catch(err => {
        return err;
      });
  },

  updateRoom({ commit, state, rootState }, payload) {
    return this.app.apolloProvider.defaultClient
      .mutate({
        mutation: gql.Data.updateRoom,
        variables: payload,
        context: {
          headers: {
            Authorization: `Bearer ${rootState.admin.sub.token}`
          }
        }
      })
      .then(({ data }) => {
        return data.updateRoom;
      })
      .catch(err => {
        return err;
      });
  },

  createRoom({ commit, state, rootState }, payload) {
    return this.app.apolloProvider.defaultClient
      .mutate({
        mutation: gql.Data.createRoom,
        variables: payload,
        context: {
          headers: {
            Authorization: `Bearer ${rootState.admin.sub.token}`
          }
        }
      })
      .then(({ data }) => {
        return data.createRoom;
      })
      .catch(err => {
        return err;
      });
  },

  deleteRoom({ commit, state, rootState }, payload) {
    return this.app.apolloProvider.defaultClient
      .mutate({
        mutation: gql.Data.deleteRoom,
        variables: payload,
        context: {
          headers: {
            Authorization: `Bearer ${rootState.admin.sub.token}`
          }
        }
      })
      .then(({ data }) => {
        return data.deleteRoom;
      })
      .catch(err => {
        return err;
      });
  },

  getCats({ commit, state, rootState }, payload) {
    return this.app.apolloProvider.defaultClient
      .query({
        query: gql.Data.allCats,
        variables: {},
        context: {
          headers: {
            Authorization: `Bearer ${rootState.admin.sub.token}`
          }
        }
      })
      .then(({ data }) => {
        commit("setCategories", data.categories);
        return data.categories;
      })
      .catch(err => {
        return err;
      });
  },
  // create a user of type ADMIN
  createAdmin({ commit, state }, payload) {
    return this.app.apolloProvider.defaultClient
      .mutate({
        mutation: gql.Admin.create,
        variables: { adminInput: payload },
        context: {
          headers: {
            Authorization: `Bearer ${state.sub.token}`
          }
        }
      })
      .then(({ data }) => {
        let collection = JSON.parse(JSON.stringify(state.sub.admins));
        collection.push(data.createAdmin);
        commit("setAdmins", collection);
        return data.createAdmin;
      })
      .catch(err => {
        return err;
      });
  }
};

const mutations = {
  setGovts(state, payload) {
    state.sub.governments = payload;
  },
  setRooms(state, payload) {
    state.sub.rooms = payload;
  },
  setCategories(state, payload) {
    state.sub.categories = payload;
  },
  updateGovernment(state, govt) {
    let index = state.sub.governments.findIndex(x => x._id === govt._id);
    state.sub.governments[index] = govt;
  },
  resetState(state) {
    state = {
      sub: {}
    };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
