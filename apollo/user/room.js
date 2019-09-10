import gql from 'graphql-tag';

export default {
  getFederalRooms: gql`
    query getFederalRooms($roomType: RoomType!) {
      getFederalRooms(roomType: $roomType) {
        _id
        name
        currentTopic {
          _id
          title
          closeDate
          startDate
          votes
          isClosed
        }
        slug
        government
      }
    }
  `,
  getStateRooms: gql`
    query getStateRooms($roomType: RoomType, $isOrigin: Boolean) {
      getStateRooms(roomType: $roomType, isOrigin: $isOrigin) {
        _id
        name
        currentTopic {
          _id
          title
          closeDate
          startDate
          votes
          isClosed
        }
        slug
        government
      }
    }
  `,
  getRoomById: gql`
    query getRoomById($roomId: darangiGraphId!) {
      getRoomById(roomId: $roomId) {
        _id
        name
        currentTopic {
          _id
          title
          closeDate
          startDate
          votes
          isClosed
        }
        slug
        government
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
        currentTopic {
          _id
          title
          closeDate
          startDate
          votes
          isClosed
        }
        slug
        government
        roomType
      }
    }
  `,
  leaveRoom: gql`
    mutation leaveRoom($roomId: darangiGraphId!) {
      leaveRoom(roomId: $roomId) {
        _id
        name
        currentTopic {
          _id
          title
          closeDate
          startDate
          votes
          isClosed
        }
        slug
        government
        roomType
      }
    }
  `
};
