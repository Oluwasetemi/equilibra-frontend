import gql from 'graphql-tag'

export default {
  allAdmins: gql `query fetchUsers($type: type!){
    fetchUsers(type: $type){
      role
      fullName
      username
      email
      isSuspended
      _id
    }
  }`,

  create: gql `mutation createAdmin($adminInput: createAdmin!) {
      createAdmin(adminInput: $adminInput) {
        role
        fullName
        username
        email
        isSuspended
        _id
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

  reactivate: gql `mutation reactiveAdmin($adminId: ID!) {
    reactiveAdmin(id: $adminId) {
      role
      fullName
      username
      email
      successMessage
      isSuspended
      _id
    }
  }`,

  delete: gql `mutation deleteAdmin($adminId: ID!) {
	  deleteAdmin(id: $adminId) {
      successMessage
	  }
  }`,
  
  statistics: gql `query adminDashboard{
    adminDashboard{
      usersCount
      adminsCount
      commentCount
      latestComments{
        comment
        author{
         fullName
          username
          _id
        }
      }
      lastMonthComments
      topicsCount
      roomsCount
    }
  }`
}
