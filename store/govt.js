import gql from "~/apollo/user/govt";
export default {
  actions: {
    getSGs({ commit }) {
      return this.app.apolloProvider.defaultClient
        .query({
          fetchPolicy: "network-only",
          query: gql.governments,
          variables: { slug: "SG", first: 38, start: 0 }
        })
        .then(({ data }) => {
          console.log(data);
          commit("setGovernments", data.allGovernmentBasedOnCategory, {
            root: true
          });
          return data.allGovernmentBasedOnCategory;
        })
        .catch(err => {
          return err;
        });
    }
  }
};
