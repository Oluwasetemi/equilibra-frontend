import gql from 'graphql-tag';

export default {
  sendContactUs: gql`
    mutation sendContactUs(
      $firstName: String!
      $lastName: String
      $email: String
      $message: String
    ) {
      sendContactUs(
        firstName: $firstName
        lastName: $lastName
        email: $email
        message: $message
      ) {
        successMessage
        errorMessage
      }
    }
  `
};
