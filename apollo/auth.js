import fragment from '~/apollo/fragment';
import gql from 'graphql-tag';

export default {
  login: gql`
    query login($loginInput: loginInput!) {
      login(loginInput: $loginInput) {
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
  `,
  google: gql`
    mutation google($googleToken: accessToken!) {
      google(googleToken: $googleToken) {
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
  `,
  facebook: gql`
    mutation facebook($facebookToken: accessToken!) {
      facebook(facebookToken: $facebookToken) {
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
  `,

  forgotPassword: gql`
    mutation forgotPassword($email: String!) {
      forgotPassword(email: $email) {
        successMessage
        errorMessage
      }
    }
  `,
  completeSignup: gql`
    mutation completeSignup($userInput: completeSignupInput!) {
      completeSignup(userInput: $userInput) {
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
  `,
  signUp: gql`
    mutation Signup($userInput: signupInput!) {
      Signup(userInput: $userInput) {
        token
        successMessage
        errorMessage
      }
    }
  `,
  verifyEmail: gql`
    mutation verifyEmail($token: String!) {
      verifyEmail(token: $token) {
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
  `,
  resendEmail: gql`
    mutation resendToken($email: String!) {
      resendToken(email: $email) {
        successMessage
        errorMessage
      }
    }
  `,
  forgotPassword: gql`
    mutation forgotPassword($email: String!) {
      forgotPassword(email: $email) {
        successMessage
        errorMessage
      }
    }
  `,
  resetPassword: gql`
    mutation resetPassword($password: String!, $token: String!) {
      resetPassword(password: $password, token: $token) {
        successMessage
        errorMessage
      }
    }
  `
};
