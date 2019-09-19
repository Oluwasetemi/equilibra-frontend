import gql from 'graphql-tag';

export default {
  fetchComments: gql`
    query fetchComments(
      $cursor: String
      $limit: Int
      $skip: Int
      $topicId: ID!
      $roomId: ID!
    ) {
      fetchComments(
        cursor: $cursor
        limit: $limit
        skip: $skip
        topicId: $topicId
        roomId: $roomId
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
          # reporter {
          #   _id
          #   fullName
          #   image
          #   username
          #   image
          # }
          # report
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
            # reporter {
            #   _id
            #   fullName
            #   image
            #   username
            #   image
            # }
            # report
            createdAt
            image
          }
          # reports
          reply
          likes
          liked
          edited
          # reported
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
  fetchComment: gql`
    query fetchComment($commentId: ID!) {
      fetchComment(commentId: $commentId) {
        _id
        comment
        author {
          _id
          fullName
          image
          username
          image
        }
        # reporter {
        #   _id
        #   fullName
        #   image
        #   username
        #   image
        # }
        # report
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
          # reporter {
          #   _id
          #   fullName
          #   image
          #   username
          #   image
          # }
          # report
          likes
          liked
          createdAt
          image
        }
        # reports
        reply
        likes
        liked
        edited
        # reported
        image
        createdAt
        updatedAt
        successMessage
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
      reportComment(reportType: $reportType, commentId: $commentId) {
        successMessage
      }
    }
  `
};
