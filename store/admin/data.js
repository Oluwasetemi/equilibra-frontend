/* eslint-disable */
// Remember to update resetState mutation
import Cookie from 'js-cookie';
import gql from '~/apollo/admin';
import ApolloCacheUpdater from "apollo-cache-updater";
const state = () => ({
      sub: {
        governments: []
      }
  })
  
  const getters = {
    governments: state=> state.sub.governments
  }
  
  const actions = {
    // fetch all reports by admin
    getAllGovts({ commit, state, rootState }, payload){
      return this.app.apolloProvider.defaultClient
      .query({
        query: gql.Data.allGovts,
        variables: {first: payload.limit, start: payload.skip},
        context: {
          headers: {
            Authorization: `Bearer ${rootState.admin.sub.token}`
          }
        }
      })
      .then(({ data }) => {      
          commit('setGovts', data.governments);
          return data.governments;
        })
        .catch(err => {
          return err;
        });
    },

    getAllHOA({ commit, state, rootState }, payload){
      return this.app.apolloProvider.defaultClient
      .query({
        query: gql.Data.allRooms,
        variables: {roomType: payload.roomType, start: payload.skip},
        context: {
          headers: {
            Authorization: `Bearer ${rootState.admin.sub.token}`
          }
        }
      })
      .then(({ data }) => {      
          commit('setGovts', data.governments);
          return data.governments;
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
     
    setGovts(state, payload){
      state.sub.governments = payload;
    },
    resetState(state) {
      state = {
        sub: {
          
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
  