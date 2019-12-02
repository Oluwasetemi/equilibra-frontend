import gql from 'graphql-tag';

export default {
  getFederalRooms: gql`
    query getFederalRooms($roomType: RoomType!) {
      getFederalRooms(roomType: $roomType) {
        _id
        name
        voteId
        currentTopic {
          _id
          title
          description
          votes
          isClosed
          voteId
        }
        slug
        members {
          _id
        }
      }
    }
  `,
  getStateRooms: gql`
    query getStateRooms($roomType: RoomType, $isOrigin: Boolean) {
      getStateRooms(roomType: $roomType, isOrigin: $isOrigin) {
        _id
        name
        voteId
        currentTopic {
          _id
          title
          description
          votes
          isClosed
          voteId
        }
        slug
        members {
          _id
        }
        # government
      }
    }
  `,
  getRoomById: gql`
    query getRoomById($roomId: darangiGraphId!) {
      getRoomById(roomId: $roomId) {
        _id
        name
        voteId
        currentTopic {
          _id
          title
          description
          votes
          isClosed
          voteId
        }
        slug
        members {
          _id
        }
        # government
      }
    }
  `,
  getMyRooms: gql`
    query getMyRooms {
      getMyRooms {
        _id
      }
    }
  `,
  joinRoom: gql`
    mutation joinRoom($roomId: darangiGraphId!) {
      joinRoom(roomId: $roomId) {
        _id
        name
        voteId
        currentTopic {
          _id
          description
          title
          # closeDate
          # startDate
          votes
          isClosed
        }
        slug
        members {
          _id
        }
        # government
        # roomType
      }
    }
  `,
  leaveRoom: gql`
    mutation leaveRoom($roomId: darangiGraphId!) {
      leaveRoom(roomId: $roomId) {
        _id
        name
        voteId
        currentTopic {
          _id
          title
          description
          # closeDate
          # startDate
          votes
          isClosed
        }
        slug
        # government
        # roomType
      }
    }
  `,
    vote: gql`
    subscription {
      vote {
        _id
        title
        voteId
        description
        # closeDate
        # startDate
        votes
        isClosed
        description
        # createdBy
      }
    }
  `
};
