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
  `
};
