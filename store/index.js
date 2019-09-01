import gql from '~/apollo/govt';
import Vuex from  'vuex';
import home from './home';
import admin from './admin';
import auth from './auth';
import user from './user';
import room from './room';
import topic from './topic';


export const store = ()=>{
  return new Vuex.Store({
    state: () => ({
      
    }),
  
    getters: {
      
    },
  
    mutations: {
      
    },
  
    actions: {
      
    },
    modules: {
      auth,
      user,
      room,
      admin,
      topic,
      home
    }
  })
}

