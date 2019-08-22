import fragment from '~/apollo/fragment';
import gql from 'graphql-tag';

export default {
  changePassword: gql`
    mutation changePassword($passwordInput: password!) {
      changePassword(passwordInput: $passwordInput) {
        successMessage
        errorMessage
      }
    }
  `,
  updateProfile: gql`
    mutation updateProfile(
      $file: Upload
      $fullName: String!
      $username: String!
    ) {
      updateProfile(file: $file, fullName: $fullName, username: $username) {
        path
        filename
        mimetype
        encoding
        user {
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
          signupStatus
        }
      }
    }
  `,
  updateResidence: gql`
    mutation updateResidence(
      $localGovtResidence: ID!
      $residenceStateConstituency: ID!
      $residenceFederalConstituency: ID!
      $stateOfResidence: ID!
    ) {
      updateResidence(
        localGovtResidence: $localGovtResidence
        residenceStateConstituency: $residenceStateConstituency
        residenceFederalConstituency: $residenceFederalConstituency
        stateOfResidence: $stateOfResidence
      ) {
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
        signupStatus
      }
    }
  `
};
