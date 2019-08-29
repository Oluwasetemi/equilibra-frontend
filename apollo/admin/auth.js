import gql from 'graphql-tag'

export default {
    login: gql `query login($loginInput: loginInput!){
        login(loginInput: $loginInput){
          token
          role
          fullName
          signupStatus
          successMessage
          email
        }
      }`
}