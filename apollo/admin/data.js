import gql from 'graphql-tag'

export default {
  
  allGovts: gql `query governments($start: Int, $first: Int){
    governments(start: $start, first: $first){
      id
      name
      slug
      description
      updatedAt
    }
  }`,

  

  suspend: gql `mutation suspendAdmin($adminId: ID!) {
    suspendAdmin(id: $adminId) {
      role
      fullName
      username
      email
      successMessage
      isSuspended
      _id
    }
  }`,

}
