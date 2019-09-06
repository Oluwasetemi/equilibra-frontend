import gql from 'graphql-tag';

export default {
  governments: gql`
    query allGovernmentBasedOnCategory($slug: categoryEnum!) {
      allGovernmentBasedOnCategory(slug: $slug) {
        id
        name
        category
        description
        slogan
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
        slug
        gdpPerHead
        powerGenerated
        literacyRate
        unemploymentRate
        nonOilSectorContributionToGDP
        rulingParty
        touristAttraction
        agriculture
        mineralResources
        museumAndParks
      }
    }
  `,
  governmentBySlug: gql`
    query governmentBySlug($slug: ID!) {
      governmentBySlug(slug: $slug) {
        id
        name
        category
        description
        slogan
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
        slug
        gdpPerHead
        powerGenerated
        literacyRate
        unemploymentRate
        nonOilSectorContributionToGDP
        rulingParty
        touristAttraction
        agriculture
        mineralResources
        museumAndParks
      }
    }
  `,
  fetchConstituency: gql`
    query fetchConstituency(
      $stateGovernmentID: ID!
      $roomType: fetchConstituency!
    ) {
      fetchConstituency(
        stateGovernmentID: $stateGovernmentID
        roomType: $roomType
      ) {
        _id
        name
        slug
        government
      }
    }
  `,
  localGovernments: gql`
    query localGovernments($stateGovernmentID: ID!) {
      localGovernments(stateGovernmentID: $stateGovernmentID) {
        id
        name
        category
        description
        slogan
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
        slug
        gdpPerHead
        powerGenerated
        literacyRate
        unemploymentRate
        nonOilSectorContributionToGDP
        rulingParty
        touristAttraction
        agriculture
        mineralResources
        museumAndParks
      }
    }
  `
};
