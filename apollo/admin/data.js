import gql from "graphql-tag";

export default {
  allGovts: gql`
    query allGovernmentBasedOnCategory(
      $start: Int
      $first: Int
      $slug: categoryEnum!
    ) {
      allGovernmentBasedOnCategory(start: $start, first: $first, slug: $slug) {
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
        category
        totalConstituency
        infantMortalityRate
        literacyRate
        unemploymentRate
      }
    }
  `,

  allRooms: gql`
    query fetchAllConstituencyAdmin(
      $limit: Int
      $skip: Int
      $roomType: fetchConstituency
    ) {
      fetchAllConstituencyAdmin(
        limit: $limit
        skip: $skip
        roomType: $roomType
      ) {
        edges {
          name
          _id
          government
        }
        pageInfo {
          totalCount
          hasNextPage
        }
      }
    }
  `,

  updateRoom: gql`
    mutation updateRoom($room: UpdateRoomInputType, $roomId: darangiGraphId) {
      updateRoom(room: $room, roomId: $roomId) {
        _id
        name
        government
      }
    }
  `,

  createRoom: gql`
    mutation createRoom($room: RoomInputType!) {
      createRoom(room: $room) {
        _id
        name
        government
      }
    }
  `,

  deleteRoom: gql`
    mutation deleteRoom($roomId: darangiGraphId) {
      deleteRoom(roomId: $roomId) {
        _id
        name
      }
    }
  `,

  allCats: gql`
    query categories {
      categories {
        id
        name
        slug
      }
    }
  `,

  createGovt: gql`
    mutation updateGovernment($id: ID!, $governmentInput: governmentInput!) {
      updateGovernment(id: $id, governmentInput: $governmentInput) {
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
        category
        totalConstituency
        infantMortalityRate
        literacyRate
        unemploymentRate
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
  `
};
