import gql from 'graphql-tag';

export default {
  requestTopicChange: gql`
    mutation requestTopicChange($topic: changeTopicInputType!) {
      requestTopicChange(topic: $topic) {
        _id
        title
        closeDate
        startDate
        votes
        isClosed
      }
    }
  `,
  suggestTopic: gql`
    mutation suggestTopic($title: String!, $description: String!) {
      suggestTopic(title: $title, description: $description) {
        _id
        title
        closeDate
        startDate
        votes
        isClosed
      }
    }
  `
};
