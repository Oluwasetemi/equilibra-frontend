import gql from 'graphql-tag'

export default {
  allAdmins: gql `query fetchUsers($type: type!, $limit: Int, $skip: Int){
    fetchUsers(userType: $type, limit: $limit, skip: $skip){
      edges {
        role
        fullName
        username
        email
        isSuspended
        _id
      }
      pageInfo {
        totalCount
        hasNextPage
      }
    }
  }`,

  allReports: gql `query fetchReportedComments{
    fetchReportedComments{
      comment
      topic{
        _id
        title
        createdBy{
          fullName
          image
          _id
        }
      }
      author{
        fullName
        image
        _id
      }
      reporter{
        fullName
        image
        _id
      }
      _id
    }
  }`,

  allTopics: gql `query getTopics($query: topicFilter){
    getTopics(query: $query){
      _id
      title
      closeDate
      startDate
      isClosed
      createdBy {
        fullName
        image
      }
    }
  }`,

  allRooms: gql `query fetchRooms($cursor: String, $limit: Int, $skip: Int){
    fetchRooms(cursor: $cursor, limit: $limit, skip: $skip){
      edges {
        _id
        name
        currentTopic
        government
        roomType
      }
      pageInfo {
        totalCount
        hasNextPage
      }
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
