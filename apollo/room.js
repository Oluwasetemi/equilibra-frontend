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
};
