import gql from 'graphql-tag';

export default {
  getFederalRooms: gql`
    query getFederalRooms($roomType: RoomType!) {
      getFederalRooms(roomType: $roomType) {
        _id
        name
        currentTopic
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
        currentTopic
        slug
        government
      }
    }
  `,
  joinRoom: gql`
    mutation joinRoom($roomId: darangiGraphId!) {
      joinRoom(roomId: $roomId) {
        _id
        name
        currentTopic
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
        currentTopic
        slug
        government
        roomType
      }
    }
  `
};
