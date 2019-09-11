import gql from '~/apollo/user/govt';
export default {
    
      actions: {
        getSGs({ commit }) {
          return this.app.apolloProvider.defaultClient
            .query({
              fetchPolicy: 'network-only',
              query: gql.governments,
              variables: { slug: 'SG' }
            })
            .then(({ data }) => {
                console.log(data);
              commit('setGovernments', data.allGovernmentBasedOnCategory, {root: true});
            })
            .catch(err => {
              return err;
            });
        },
        
      }
}