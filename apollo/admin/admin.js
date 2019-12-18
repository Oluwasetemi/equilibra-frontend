import gql from "graphql-tag";

export default {
  allAdmins: gql`
    query fetchUsers($type: type!, $limit: Int, $skip: Int) {
      fetchUsers(userType: $type, limit: $limit, skip: $skip) {
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
    }
  `,

  allGovernments: gql`
    query allGovernmentBasedOnCategory($slug: categoryEnum!) {
      allGovernmentBasedOnCategory(slug: $slug) {
        id
        name
        category
        stateGovernment
        description
        slogan
        slug
        cjn
        speaker
        leader
        senatePresident
        totalLg
        population
        totalConstituency
        infantMortalityRate
        foreignReserve
        crimeRate
        inflationRate
        budgetPerformanceRate
        budgetPassDate
        budgetSubmissionDate
        plenaryAttendanceRate
        gdpPerHead
        powerGenerated
        literacyRate
        unemploymentRate
        nonOilSectorContributionToGDP
        rulingParty
        touristAttractionCenters
        agriculture
        mineralResources
        museumsAndParks
        createdAt
        updatedAt
      }
    }
  `,

  allTopics: gql`
    query fetchTopics($query: topicFilter, $limit: Int, $skip: Int) {
      fetchTopics(query: $query, limit: $limit, skip: $skip) {
        edges {
          _id
          title
          description
          rooms {
            _id
          }
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
    }
  `,

  allRooms: gql`
    query fetchRooms($cursor: String, $limit: Int, $skip: Int) {
      fetchRooms(cursor: $cursor, limit: $limit, skip: $skip) {
        edges {
          _id
          name
          roomType
          government
        }
      }
    }
  `,

  allReports: gql`
    query fetchReportedComments($limit: Int, $skip: Int) {
      fetchReportedComments(limit: $limit, skip: $skip) {
        edges {
          comment
          _id
          reporter {
            fullName
            _id
            image
          }
          author {
            fullName
            _id
            image
          }
          reports {
            report
            reporter {
              fullName
              _id
              image
            }
          }
          likes
          report
          image
        }
        pageInfo {
          hasNextPage
          totalCount
        }
      }
    }
  `,

  removeComment: gql`
    mutation deleteComment($commentId: ID!) {
      deleteComment(commentId: $commentId) {
        successMessage
      }
    }
  `,

  removeUser: gql`
    mutation suspendUser($id: ID!) {
      suspendUser(id: $id) {
        successMessage
      }
    }
  `,

  createTopic: gql`
    mutation scheduleTopic($topic: topicInputType!) {
      scheduleTopic(topic: $topic) {
        _id
        title
        rooms {
          _id
        }
        description
        isClosed
        startDate
        createdBy {
          _id
        }
      }
    }
  `,

  updateTopic: gql`
    mutation updateTopic($topic: topicInputType!, $topicId: darangiGraphId!) {
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
    }
  `,

  deleteTopic: gql`
    mutation deleteTopic($topicId: darangiGraphId!) {
      deleteTopic(topicId: $topicId) {
        successMessage
      }
    }
  `,

  create: gql`
    mutation createAdmin($adminInput: createAdmin!) {
      createAdmin(adminInput: $adminInput) {
        role
        fullName
        username
        email
        isSuspended
        _id
      }
    }
  `,

  suspend: gql`
    mutation suspendAdmin($adminId: ID!) {
      suspendAdmin(id: $adminId) {
        role
        fullName
        username
        email
        successMessage
        isSuspended
        _id
      }
    }
  `,

  reactivate: gql`
    mutation reactiveAdmin($adminId: ID!) {
      reactiveAdmin(id: $adminId) {
        role
        fullName
        username
        email
        successMessage
        isSuspended
        _id
      }
    }
  `,

  delete: gql`
    mutation deleteAdmin($adminId: ID!) {
      deleteAdmin(id: $adminId) {
        successMessage
      }
    }
  `,

  statistics: gql`
    query adminDashboard {
      adminDashboard {
        usersCount
        adminsCount
        commentCount
        latestComments {
          comment
          author {
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
    }
  `
};
