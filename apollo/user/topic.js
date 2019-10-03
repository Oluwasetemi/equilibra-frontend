import gql from 'graphql-tag';

export default {
  requestTopicChange: gql`
    mutation requestTopicChange($topic: changeTopicInputType!) {
      requestTopicChange(topic: $topic) {
        _id
        title
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
        votes
        isClosed
      }
    }
  `,
  vote: gql`
    mutation vote($voteInput: VoteInputType!) {
      vote(voteInput: $voteInput) {
        successMessage
      }
    }
  `,
  closeRequestTopicChangeVoting: gql`
    mutation closeRequestTopicChangeVoting($voteId: ID!) {
      closeRequestTopicChangeVoting(voteId: $voteId) {
        successMessage
        upVotes
        downVotes
      }
    }
  `,
  
};
