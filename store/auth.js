import gql from '~/apollo/auth';
import Cookie from 'js-cookie';

export default {
  state: () => ({
    token: '',
    tempUserDetails: {
      origin: {
        state: '',
        LGA: '',
        stateFedConstituency: '',
        senatorialDistrict: '',
        stateConstituency: ''
      },
      residence: {
        state: '',
        LGA: '',
        stateFedConstituency: '',
        senatorialDistrict: '',
        stateConstituency: ''
      }
    },
    isAuthenticated: false
  }),

  getters: {
    getToken: state => state.token,
    isAuthenticated: state => state.isAuthenticated,
    getTempUserDetails: state => state.tempUserDetails,
  },

  mutations: {
    setToken(state, data) {
      state.token = data.token;
      if (data.signupStatus || data.authCookie) {
        Cookie.set('EQUI_AUTH', data.token);
        state.isAuthenticated = true;
      }
    },

    logout(state) {
      state.token = '';
      state.user = {};
      Cookie.remove('EQUI_AUTH');
      state.isAuthenticated = false;
    },
    setTempUserDetails(state, { type, payload }) {
      // debugger;
      state.tempUserDetails[type] = payload;
    }
  },

  actions: {
    initAuth({ commit }, req) {
      if (req) {
        if (!req.headers.cookie) {
          return;
        }
        const authCookie = req.headers.cookie
          .split(';')
          .find(c => c.trim().startsWith('EQUI_AUTH='));
        if (!authCookie) {
          return;
        }
        const token = authCookie.split('=')[1];
        commit('setToken', { token, authCookie: true });
      }
    },
    signUp({ commit }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.signUp,
          variables: { userInput: payload }
        })
        .then(({ data }) => {
          return data.Signup;
        })
        .catch(err => {
          return err;
        });
    },

    verifyEmail({ commit }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.verifyEmail,
          variables: { token: payload }
        })
        .then(data => {
          commit('setToken', data.verifyEmail);
          commit('user/setUser', data.verifyEmail, { root: true });
          return data;
        })
        .catch(err => {
          return err;
        });
    },
    completeSignup({ commit }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.completeSignup,
          variables: { userInput: payload }
        })
        .then(({ data }) => {
          debugger
          commit('setToken', data.completeSignup);
          commit('user/setUser', data.completeSignup, { root: true });
          return data.completeSignup;
        })
        .catch(err => {
          return err;
        });
    },
    resendEmail({ rootState }) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.resendEmail,
          variables: { email: rootState.user.user.email }
        })
        .then(({ data }) => {
          return data.resendToken;
        })
        .catch(err => {
          return err;
        });
    },
    login({ commit }, payload) {
      return this.app.apolloProvider.defaultClient
        .query({
          query: gql.login,
          variables: { loginInput: payload }
        })
        .then(({ data }) => {
          commit('setToken', data.login);
          commit('user/setUser', data.login, { root: true });
          return data.login;
        })
        .catch(err => {
          return err;
        });
    },
    loginWIthGoogle({ commit }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.google,
          variables: { googleToken: payload }
        })
        .then(({ data }) => {
          commit('setToken', data.google);
          commit('user/setUser', data.google, { root: true });
          return data.google;
        })
        .catch(err => {
          return err;
        });
    },
    loginWIthFacebook({ commit }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.facebook,
          variables: { facebookToken: payload }
        })
        .then(({ data }) => {
          commit('setToken', data.facebook);
          commit('user/setUser', data.facebook, { root: true });
          return data.facebook;
        })
        .catch(err => {
          return err;
        });
    },
    forgotPassword({ commit }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.forgotPassword,
          variables: { email: payload }
        })
        .then(({ data }) => {
          return data.forgotPassword.successMessage;
        })
        .catch(err => {
          return err;
        });
    },
    resetPassword({ commit }, payload) {
      return this.app.apolloProvider.defaultClient
        .mutate({
          mutation: gql.resetPassword,
          variables: { password: payload.password, token: payload.token }
        })
        .then(({ data }) => {
          return data.resetPassword.successMessage;
        })
        .catch(err => {
          return err;
        });
    },

    setTempUserDetails({ commit }, payload) {
      commit('setTempUserDetails', payload);
    },

    logout({ commit }) {
      commit('user/removeUser', null, { root: true });
      commit('logout');
      this.$toast.success('You are now logged out!');
      this.$router.push('/login');
    }
  }
};
