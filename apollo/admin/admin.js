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

  allGovernments: gql `query allGovernmentBasedOnCategory($slug: categoryEnum!){
    allGovernmentBasedOnCategory(slug: $slug){
      id
      name
      slogan
      description
      leader
      cjn
      senatePresident
      speaker
      totalLg
      population
      totalConstituency
      infantMortalityRate
      literacyRate
      unemploymentRat
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

  allTopics: gql `query fetchTopics($query: topicFilter, $limit: Int, $skip: Int){
    fetchTopics(query: $query, limit: $limit, skip: $skip){
      edges {
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
      pageInfo {
        totalCount
      }
    }
  }`,



  allRooms: gql `query fetchRooms($cursor: String, $limit: Int, $skip: Int){
    fetchRooms(cursor: $cursor, limit: $limit, skip: $skip){
      edges {
        _id
        name
        government
        roomType
      }
      pageInfo {
        totalCount
        hasNextPage
      }
    }
  }`,

  createTopic: gql `mutation scheduleTopic($topic: topicInputType!) {
    scheduleTopic(topic: $topic) {
      _id
      title
      closeDate
      rooms {
        _id
      }
      startDate
      isClosed
      createdBy {
        _id
      }
    }
  }`,

  updateTopic: gql `mutation updateTopic($topic: topicInputType!, $topicId: darangiGraphId!) {
    updateTopic(topic: $topic, topicId: $topicId) {
      _id
      title
      rooms
      closeDate
      startDate
      isClosed
      createdBy {
        _id
      }
    }
  }`,

  deleteTopic: gql `mutation deleteTopic($topicId: darangiGraphId!) {
	  deleteTopic(topicId: $topicId) {
      successMessage
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
          image
          _id
        }
      }
      lastMonthComments
      topicsCount
      roomsCount
    }
  }`
}
