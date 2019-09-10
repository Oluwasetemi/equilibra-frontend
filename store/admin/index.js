/* eslint-disable */
// Remember to update resetState mutation
import Cookie from 'js-cookie';
import gql from '~/apollo/admin';
import ApolloCacheUpdater from "apollo-cache-updater";
const state = () => ({
      sub: {
        users: [],
        admins: [],
        govts: [],
        reports: [],
        adminStatistics: {},
        token: '',
        user: {},
        rooms: [],
        topics: [],
        gems: [],
        isAuthenticated: false,
      }
  })
  
  const getters = {
    users: state => state.sub.users,
    admins: state => state.sub.admins,
    govts: state => state.sub.govts,
    adminStatistics: state=>state.sub.adminStatistics,
    token: state => state.sub.token,
    reports: state => state.sub.reports,
    user: state => state.sub.user,
    topics: state => state.sub.topics,
    rooms: state => state.sub.rooms,
    isAuthenticated: state => state.sub.isAuthenticated,
  }
  
  const actions = {
    login({ commit }, payload){
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.Auth.login,
          variables: { loginInput: payload },
          // context: {
          //   headers: {
          //     Authorization: `Bearer ${rootState.auth.token}`
          //   }
          // }
        })
        .then(({ data }) => {
          commit('admin/setToken', data.login, { root: true });
          commit('admin/setUser', data.login, { root: true });
          return data.login;
        })
        .catch(err => {
          return err;
        });
    },

    // fetch admin dashboard statistics
    getAdminStatistics({ commit, getters, state }, payload){
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.Admin.statistics,
          variables: {  },
          context: {
            headers: {
              Authorization: `Bearer ${Cookie.get('EQUI_AUTH_ADMIN')}`
            }
          }
        })
        .then(({ data }) => {
          commit('setAdminStatistics', data.adminDashboard);
          return data.adminDashboard;
        })
        .catch(err => {
          return err;
        });
    },


    // fetch list of rooms
    getRooms({ commit, state }, payload){
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.Admin.allRooms,
          variables: { cursor: payload.cursor, skip: payload.skip, limit: payload.limit },
          context: {
            headers: {
              Authorization: `Bearer ${Cookie.get('EQUI_AUTH_ADMIN')}`
            }
          }
        })
        .then(({ data }) => {
          commit('setRooms', data.fetchRooms);
          return data.fetchRooms;
        })
        .catch(err => {
          return err;
        });
    },

    // fetch admin users
    getAdminUsers({ commit, state }, payload){
      return this.app.apolloProvider.defaultClient
      .query({
        query: gql.Admin.allAdmins,
        variables: { type: payload.type, limit: payload.limit, skip: payload.skip },
        context: {
          headers: {
            Authorization: `Bearer ${Cookie.get('EQUI_AUTH_ADMIN')}`
          }
        }
      })
      .then(({ data }) => {
          if(payload.type === 'ADMIN'){
            commit('setAdmins', data.fetchUsers.edges);
          }
          if(payload.type === 'USER'){
            commit('setUsers', data.fetchUsers);
          }
          return data.fetchUsers;
        })
        .catch(err => {
          return err;
        });
    },

    // fetch all reports by admin
    getReports({ commit, state }, payload){
      return this.app.apolloProvider.defaultClient
      .query({
        query: gql.Admin.allReports,
        variables: {},
        context: {
          headers: {
            Authorization: `Bearer ${Cookie.get('EQUI_AUTH_ADMIN')}`
          }
        }
      })
      .then(({ data }) => {          
          commit('setReports', data.fetchReportedComments);
          return data.fetchReportedComments;
        })
        .catch(err => {
          return err;
        });
    },

    // fetch all reports by admin
    getAllTopics({ commit, state }, payload){
      return this.app.apolloProvider.defaultClient
      .query({
        query: gql.Admin.allTopics,
        variables: {query: payload.query,limit: payload.limit, skip: payload.skip},
        context: {
          headers: {
            Authorization: `Bearer ${Cookie.get('EQUI_AUTH_ADMIN')}`
          }
        }
      })
      .then(({ data }) => {   
          console.log(data)       
          commit('setTopics', data.fetchTopics);
          return data.getTopics;
        })
        .catch(err => {
          return err;
        });
    },

    // suspend/reactivate a user of type ADMIN
    suspendAdmin({ commit, state }, payload){
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: payload.suspended ? gql.Admin.reactivate : gql.Admin.suspend,
          variables: { adminId: payload.adminId },

          context: {
            headers: {
              Authorization: `Bearer ${Cookie.get('EQUI_AUTH_ADMIN')}`
            }
          }
        })
        .then(({ data }) => {
          return  payload.suspended ? data.reactiveAdmin: data.suspendAdmin;
        })
        .catch(err => {
          return err;
        });
    },

    // delete a user of type ADMIN
    deleteAdmin({ commit, state }, payload){
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.Admin.delete,
          variables: { adminId: payload.adminId },
          context: {
            headers: {
              Authorization: `Bearer ${Cookie.get('EQUI_AUTH_ADMIN')}`
            }
          }
        })
        .then(({ data }) => {
          commit('setAdmins', state.sub.admins.filter(e=>e._id!==payload.adminId));
          return  data.deleteAdmin;
        })
        .catch(err => {
          return err;
        });
    },

    // delete a topic of type topicType
    deleteTopic({ commit, state }, payload){
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.Admin.deleteTopic,
          variables: { topicId: payload.topicId },
          context: {
            headers: {
              Authorization: `Bearer ${Cookie.get('EQUI_AUTH_ADMIN')}`
            }
          }
        })
        .then(({ data }) => {
          commit('setTopics', state.sub.admins.filter(e=>e._id!==payload.topicId));
          return  data.deleteTopic;
        })
        .catch(err => {
          return err;
        });
    },

    // create a user of type ADMIN
    createAdmin({ commit, state }, payload){
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.Admin.create,
          variables: { adminInput: payload },
          context: {
            headers: {
              Authorization: `Bearer ${Cookie.get('EQUI_AUTH_ADMIN')}`
            }
          }
        })
        .then(({ data }) => {
          let collection = JSON.parse(JSON.stringify(state.sub.admins));
          collection.push(data.createAdmin);
          commit('setAdmins', collection);
          return  data.createAdmin;
        })
        .catch(err => {
          return err;
        });
    },

    // create a topic
    saveTopic({ commit, state }, payload){
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.Admin.createTopic,
          variables: { topic: payload.topic },
          context: {
            headers: {
              Authorization: `Bearer ${Cookie.get('EQUI_AUTH_ADMIN')}`
            }
          }
        })
        .then(({ data }) => {
          let collection = JSON.parse(JSON.stringify(state.sub.topics));
          collection.edges.push(data.scheduleTopic);
          commit('setTopics', collection);
          return  data.scheduleTopic;
        })
        .catch(err => {
          return err;
        });
    },

    // create a topic
    updateTopic({ commit, state }, payload){
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.Admin.updateTopic,
          variables: { topic: payload.topic, topicId: payload._id },
          context: {
            headers: {
              Authorization: `Bearer ${Cookie.get('EQUI_AUTH_ADMIN')}`
            }
          }
        })
        .then(({ data }) => {
          let collection = JSON.parse(JSON.stringify(state.sub.topics));
          collection.edges.push(data.updateTopic);
          commit('setTopics', collection);
          return  data.updateTopic;
        })
        .catch(err => {
          return err;
        });
    },
  }
  
  const mutations = {
    setToken(state, data) {
      state.sub.token = data.token;
      state.sub.isAuthenticated = true;
      Cookie.set('EQUI_AUTH_ADMIN', data.token);
    },
    logout(state) {
      state.sub.token = '';
      state.sub.user = {};
      Cookie.remove('EQUI_AUTH_ADMIN');
      state.sub.isAuthenticated = false;
    },
    setUser(state, payload) {
      state.sub.user = payload;
    },
    setTopics(state, payload){
      state.sub.topics = payload;
    },
    setRooms(state, payload){
      state.sub.rooms = payload;
    },
    setReports(state, payload){
      state.sub.reports = payload;
    },
    setUsers(state, users) {
      state.sub.users = users
    },
    setAdmins(state, admins) {
      state.sub.admins = admins
    },
    setGovts(state, govts) {
      state.sub.govts = govts
    },
    setAdminStatistics(state, stats){
      state.sub.adminStatistics = stats
    },
  
  
    resetState(state) {
      state = {
        sub: {
          users: [],
          admins: [],
          govts: [],
          adminStatistics: {},
          token: '',
          user: [],
          reports: [],
          isAuthenticated: false,
        }
      };
    },
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  }
  