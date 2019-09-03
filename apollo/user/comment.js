import gql from 'graphql-tag';

export default {
  fetchComments: gql`
    query fetchComments(
      $cursor: String
      $limit: Int!
      $skip: Int
      $topicId: ID!
    ) {
      fetchComments(
        cursor: $cursor
        limit: $limit
        skip: $skip
        topicId: $topicId
      ) {
        Comment {
          _id
          comment
          topic
          author
          reporter
          report
          replies
          reports
          likes
          reply
          edited
          reported
          image
          createdAt
          updatedAt
          successMessage
        }
        PageInfo {
          endCursor
          hasNextPage
          totalCount
        }
      }
    }
  `,
  createComment: gql`
    mutation createComment($comment: String!, $topic: ID!, $file: Upload!) {
      createComment(comment: $comment, topic: $topic, file: $file) {
        successMessage
      }
    }
  `,
  editComment: gql`
    mutation createComment($comment: String!, $topic: ID!, $file: Upload!) {
      createComment(comment: $comment, topic: $topic, file: $file) {
        successMessage
      }
    }
  `,
  deleteComment: gql`
    mutation deleteComment($commentId: ID!) {
      deleteComment(commentId: $commentId) {
        successMessage
      }
    }
  `,
  replyComment: gql`
    mutation replyComment($comment: String!, $topic: ID!, $file: Upload!) {
      replyComment(comment: $comment, topic: $topic, file: $file) {
        successMessage
      }
    }
  `,
  likeComment: gql`
    mutation likeComment($commentId: ID!) {
      likeComment(commentId: $commentId) {
        successMessage
      }
    }
  `,
  unLikeComment: gql`
    mutation unLikeComment($commentId: ID!) {
      unLikeComment(commentId: $commentId) {
        successMessage
      }
    }
  `,
  reportComment: gql`
    mutation reportComment($reportTyp: report, $commentId: ID!) {
      reportComment(commentId: $commentId) {
        successMessage
      }
    }
  `
};
