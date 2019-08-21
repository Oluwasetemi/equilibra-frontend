import gql from 'graphql-tag';
export const user = gql`
  fragment userInfo on user {
    _id
    fullName
    successMessage
    errorMessage
    token
    email
    password
    image
    dob
    createdAt
    updatedAt
    username
    role
    isVerified
    isSuspended
    stateOfOrigin
    stateOfResidence
    localGovtOrigin
    stateConstituency
    stateOfResidenceConstituency
    stateFedConstituency
    stateOfResidenceFedConstituency
    senatorialDistrict
    stateOfResidenceSenatorialDistrict
  }
`;