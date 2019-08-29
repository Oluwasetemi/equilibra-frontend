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
        adminStatistics: {},
        token: '',
        user: {},
        isAuthenticated: false,
      }
  })
  
  const getters = {
    users: state => state.sub.users,
    admins: state => state.sub.admins,
    govts: state => state.sub.govts,
    adminStatistics: state=>state.sub.adminStatistics,
    token: state => state.sub.token,
    user: state => state.sub.user,
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
      console.log(state)
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.Admin.statistics,
          variables: {  },
          context: {
            headers: {
              Authorization: `Bearer ${state.sub.token}`
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
          query: gql.Admin.statistics,
          variables: { loginInput: payload },
          context: {
            headers: {
              Authorization: `Bearer ${state.sub.token}`
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

    // fetch admin users
    getAdminUsers({ commit, state }, payload){
      return this.app.apolloProvider.defaultClient
      .query({
        query: gql.Admin.allAdmins,
        variables: { type: payload },
        context: {
          headers: {
            Authorization: `Bearer ${state.sub.token}`
          }
        }
      })
      .then(({ data }) => {
        console.log(data.fetchUsers)
          if(payload === 'ADMIN'){
            commit('setAdmins', data.fetchUsers);
          }
          if(payload === 'USER'){
            commit('setUsers', data.fetchUsers);
          }
          return data.fetchUsers;
        })
        .catch(err => {
          return err;
        });
    },

    // suspend/reactivate a user of type ADMIN
    suspendAdmin({ commit, state }, payload){
      console.log(this.app.apolloProvider)
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: payload.suspended ? gql.Admin.reactivate : gql.Admin.suspend,
          variables: { adminId: payload.adminId },

          context: {
            headers: {
              Authorization: `Bearer ${state.sub.token}`
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
              Authorization: `Bearer ${state.sub.token}`
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

     // create a user of type ADMIN
     createAdmin({ commit, state }, payload){
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
          commit('setAdmins', collection);
          return  data.createAdmin;
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
      if (data.signupStatus || data.authCookie) {
        // Cookie.set('EQUI_AUTH_ADMIN', data.token);
      }
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
  