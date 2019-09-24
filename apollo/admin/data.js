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
    query fetchConstituency($roomType: fetchConstituency!) {
      fetchConstituency(roomType: $roomType) {
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
