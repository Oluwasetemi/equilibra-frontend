export const state = () => ({
  token: ''
});

export const getters = {};

export const mutations = {
  setToken(state, token) {
    state.token = token;
  }
};

export const actions = {
  signUp({ commit }, payload) {
    this.$axios.$post({
      query: `
        mutation SignUp($userInput: signupInput!) {
            signUp(payload) {
                successMessage
            }
        }`,
        variables: {

        }
    });
  }
};
