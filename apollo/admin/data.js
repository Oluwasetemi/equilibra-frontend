import gql from 'graphql-tag'

export default {
  
  allGovts: gql `query governments($start: Int, $first: Int){
    governments(start: $start, first: $first){
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
      unemploymentRate
    }
  }`,

  allRooms: gql `query fetchConstituency($roomType: fetchConstituency!){
    fetchConstituency(roomType: $roomType){
      _id
      name
      
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

}
