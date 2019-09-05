import gql from 'graphql-tag';

export default {
  fetchComments: gql`
    query fetchComments(
      $cursor: String
      $limit: Int
      $skip: Int
      $topicId: ID!
    ) {
      fetchComments(
        cursor: $cursor
        limit: $limit
        skip: $skip
        topicId: $topicId
      ) {
        edges {
          _id
          comment
          author {
            _id
            fullName
            image
            username
            image
          }
          reporter {
            _id
            fullName
            image
            username
            image
          }
          report
          replies {
            _id
            comment
            author {
              _id
              fullName
              image
              username
              image
            }
            reporter {
              _id
              fullName
              image
              username
              image
            }
            report
            createdAt
            image
          }
          reports
          reply
          likes
          edited
          reported
          image
          createdAt
          updatedAt
          successMessage
        }
        pageInfo {
          endCursor
          hasNextPage
          totalCount
        }
      }
    }
  `,
  createComment: gql`
    mutation createComment($comment: String!, $topic: ID!, $file: Upload) {
      createComment(comment: $comment, topic: $topic, file: $file) {
        successMessage
      }
    }
  `,
  editComment: gql`
    mutation createComment($comment: String!, $topic: ID!, $file: Upload) {
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
    mutation replyComment($comment: String!, $commentId: ID!, $file: Upload) {
      replyComment(comment: $comment, commentId: $commentId, file: $file) {
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
    mutation reportComment($reportType: report, $commentId: ID!) {
      reportComment(commentId: $commentId) {
        successMessage
      }
    }
  `
};
