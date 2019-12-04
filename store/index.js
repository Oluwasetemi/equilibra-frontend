import gql from "~/apollo/user/govt";
export default {
  state: () => ({
    governments: [],
    currentGovernment: {},
    userGovernment: {}
  }),

  getters: {
    governments: state => state.governments,
    currentGovernment: state => state.currentGovernment
  },

  mutations: {
    setGovernments(state, data) {
      state.governments = data;
    },
    setCurrentGovernment(state, data) {
      state.currentGovernment = data;
    },
    setUserGovernment(state, { roomType, data }) {
      if (roomType == "HOUSE_OF_REPRESENTATIVE") {
        roomType = "fedConstituencies";
      } else if (roomType == "HOUSE_OF_ASSEMBLY") {
        roomType = "stateConstituencies";
      } else {
        roomType = "senatorialDistricts";
      }
      state.userGovernment[roomType] = data;
    },
    resetCurrentGovernment(state) {
      state.currentGovernment = {};
    }
  },

  actions: {
    nuxtServerInit({ commit }) {
      return this.app.apolloProvider.defaultClient
        .query({
          fetchPolicy: "no-cache",
          query: gql.governments,
          variables: { slug: "SG", first: 37, start: 0 }
        })
        .then(({ data }) => {
          commit("setGovernments", data.allGovernmentBasedOnCategory);
        })
        .catch(err => {
          return err;
        });
    },
    governmentByFilter({ commit, getters }, { filterBy, payload }) {
      const government = getters.governments.filter(
        govt => govt[filterBy] == payload
      );
      commit("setCurrentGovernment", government[0]);
    },
    governmentByID({ commit }, payload) {
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.governmentByID,
          variables: payload
        })
        .then(({ data }) => {
          return data.governmentByID;
        })
        .catch(err => {
          return err;
        });
    },
    governmentBySlug({ commit }, payload) {
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.governmentBySlug,
          variables: payload
        })
        .then(({ data }) => {
          return data.governmentBySlug;
        })
        .catch(err => {
          return err;
        });
    },
    localGovernments({ commit }, { stateGovernmentID }) {
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.localGovernments,
          variables: { stateGovernmentID }
        })
        .then(({ data }) => {
          return data.localGovernments;
        })
        .catch(err => {
          return err;
        });
    },
    fetchConstituency({ commit }, { stateGovernmentID, roomType }) {
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.fetchConstituency,
          variables: { stateGovernmentID, roomType }
        })
        .then(({ data }) => {
          commit("setUserGovernment", { roomType, data });
          return data.fetchConstituency;
        })
        .catch(err => {
          return err;
        });
    },
    resetCurrentGovernment({ commit }) {
      commit("resetCurrentGovernment");
    }
  }
};
