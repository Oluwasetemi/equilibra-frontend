import gql from 'graphql-tag';

export default {
  governments: gql`
    query allGovernmentBasedOnCategory(
      $slug: categoryEnum!
      $first: Int
      $start: Int
    ) {
      allGovernmentBasedOnCategory(slug: $slug, first: $first, start: $start) {
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
        touristAttractionCenters
        agriculture
        mineralResources
        museumsAndParks
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
        touristAttractionCenters
        agriculture
        mineralResources
        museumsAndParks
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
        touristAttractionCenters
        agriculture
        mineralResources
        museumsAndParks
      }
    }
  `,
  governmentByID: gql`
    query governmentByID($governmentID: ID!) {
      governmentByID(governmentID: $governmentID) {
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
        touristAttractionCenters
        agriculture
        mineralResources
        museumsAndParks
      }
    }
  `,
  governmentBySlug: gql`
    query governmentBySlug($slug: String!) {
      governmentBySlug(slug: $slug) {
        id
        name
      }
    }
  `
};