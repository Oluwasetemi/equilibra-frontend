<template>
  <div>
    <CommentModal
      :commentId="activeComment ? activeComment._id : null"
      :roomId="currentRoom._id"
      v-if="openModal"
      @closeModal="openModal = false"
    />
    <ImageModal :img="imageModalSrc" />
    <div class="comments" v-if="fetchComments.edges.length > 0">
      <div
        class="d-flex px-2 comment border-bottom"
        v-for="(comment, i) in fetchComments.edges"
        :key="i"
        :id="comment._id"
        
      >
        <figure class="m-0 py-3 pr-1 pl-4 px d-inline-block">
          <img
            :src="comment.author.image || avatar"
            alt
            class="rounded-circle avatar"
            height="40px"
          />
        </figure>
        <div
          class="form-input position-relative d-inline-block px-3"
          style="flex-grow: 1"
        >
          <div class="comment py-3">
            <div class="user text-left">
              <span class="username">{{ comment.author.username }}</span>
              <div class="d-block d-md-inline">
                <span class="user-handle pr-2 px-md-2"
                  >@{{ comment.author.username }}</span
                >
                <span class="time-posted">{{
                  comment.createdAt | formatDate($moment)
                }}</span>
              </div>
            </div>
            <div class="comment-content mt-2 pr-3">
              <p class="text-left">{{ comment.comment }}</p>
            </div>

            <div
              class="comment-image pb-3"
              v-if="comment.images && comment.images.length > 0"
            >
              <div class="row">
                <a
                  class="col-md-2"
                  v-for="(image, i) in comment.images"
                  :key="i"
                  data-toggle="modal"
                  data-target="#imageModal"
                  @click="imageModalSrc = $event.target.src"
                >
                  <img
                    :src="image"
                    alt="photo content"
                    class="img-fluid"
                    style="cursor: pointer"
                  />
                </a>
              </div>
            </div>
            <div class="actions mr-2">
              <likeIcon
                :commentId="comment._id"
                :liked="comment.liked"
                :likes="comment.likes"
              />
              <a
                href="#"
                class="replies ml-2"
                data-toggle="modal"
                data-target="#commentModal"
                @click="(activeComment = comment), (openModal = true)"
              >
                <span data-toggle="tooltip" title="Reply">
                  <img src="~/assets/icons/replies-icon.svg" alt />
                  <span class="px-1">{{ comment.replies.length }}</span>
                </span>
              </a>
              <DeleteCommentIcon
                :commentId="comment._id"
                v-if="comment.author._id == getUser._id"
                :isMainThread="true"
                class="d-inline border-0 no-shadow ml-2 position-relative"
                style="top: 2px"
              />
              <ReportCommentIcon
                :commentId="comment._id"
                v-if="comment.author._id != getUser._id"
                class=" ml-2"
                :isMainThread="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5 border-bottom">
      <div class="spinner-border text-center" v-if="loadingComments"></div>
      <div v-else>
        <img
          src="~/assets/images/no-chat.svg"
          alt
          style="height: 150px"
          class="mb-4"
        />
        <p
          class="m-0"
          style="font-size: 24px; color: #737373; font-weight: 600"
        >
          No ongoing chat
        </p>
        <p class="color: #737373;">Be the first to leave a comment</p>
      </div>
    </div>
    <div class="text-center">
      <div
        class="spinner-border text-center mt-4"
        v-if="fetchComments.pageInfo.hasNextPage && loadingMoreComments"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import likeIcon from '~/components/Rooms/like-icon';
import gql from '~/apollo/user/comment';
import avatar from '~/assets/images/avatar.svg';
import DeleteCommentIcon from '~/components/Rooms/delete-comment-icon';
import ReportCommentIcon from '~/components/Rooms/report-comment-icon';
import CommentModal from '~/components/Rooms/view-comment-modal';
import ImageModal from '~/components/Rooms/image-modal';
import imageUrl from '~/assets/images/judiciary_BG.svg';
export default {
  layout: 'greenNavOnly',
  props: ['currentRoom', 'fetchMore'],
  data() {
    return {
      liked: false,
      avatar,
      fetchComments: {
        edges: [],
        pageInfo: []
      },
      key: 0,
      openModal: false,
      activeComment: null,
      imageUrl2: { imageUrl },
      loadingComments: false,
      loadingMoreComments: false,
      imageModalSrc: null
    };
  },
  components: {
    CommentModal,
    DeleteCommentIcon,
    ReportCommentIcon,
    likeIcon,
    ImageModal
  },
  computed: {
    ...mapGetters('user', ['getUser']),
    ...mapGetters('auth', ['isAuthenticated', 'getToken']),
    fetchMoreComments() {
      return this.fetchMore;
    },
    totalComments() {
      if (this.fetchComments) {
        if (this.fetchComments.pageInfo)
          return this.fetchComments.pageInfo.totalCount;
      }
    }
  },
  filters: {
    formatDate(val, moment) {
      val = new Date(Number(val)).toISOString();
      const now = new Date();
      let duration = moment.duration(moment(now).diff(moment(val)));
      if (duration.asDays() > 9) {
        return moment(val).format('Do MMMM YYYY, h:mm:ss a');
      }
      if (duration.asHours() >= 24) {
        return (
          moment(val).fromNow() + '\xa0\xa0' + moment(val).format('h:mm:ss a')
        );
      }
      return moment(val).fromNow();
    }
  },
  watch: {
     totalComments(val) {
      this.$eventBus.$emit('totalComments', val)
    },
    'currentRoom.currentTopic'(val) {
      if (!val) {
        this.fetchComments = {
          edges: [],
          pageInfo: []
        };
        return;
      }
      this.fetchRoomComments();
    },
    fetchMoreComments(val) {
      if (val && this.fetchComments.pageInfo.hasNextPage) {
        this.loadingMoreComments = true;
        const cursor = this.fetchComments.pageInfo.endCursor;
        const topicId = this.currentRoom.currentTopic._id;
        const self = this;
        this.$apollo.queries.fetchComments.fetchMore({
          variables: {
            cursor
          },
          fetchPolicy: 'cache-and-network',
          context: {
            headers: {
              Authorization: `Bearer ${self.getToken}`
            }
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            this.$emit('fetchedMore');
            this.loadingMoreComments = false;
            const newComments = fetchMoreResult.fetchComments.edges;
            const oldComments = previousResult.fetchComments.edges;
            return newComments.length
              ? {
                  fetchComments: {
                    __typename: previousResult.fetchComments.__typename,
                    // Merging the tag list
                    edges: [...oldComments, ...newComments],
                    pageInfo: fetchMoreResult.fetchComments.pageInfo
                  }
                }
              : previousResult;
          }
        });
        this.$emit('fetchedMore');
      }
    }
  },
  methods: {
    fetchRoomComments() {
      this.$apollo.addSmartQuery('fetchComments', {
        query: gql.fetchComments,
        variables: {
          limit: 10,
          topicId: this.currentRoom.currentTopic._id,
          roomId: this.currentRoom._id
        },
        fetchPolicy: 'cache-and-network',
        context: {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        },
        subscribeToMore: [
          {
            document: gql.subscribeToComments,
            updateQuery: (previous, { subscriptionData }) => {
              if (!subscriptionData.data.comments) return;
              subscriptionData.data.comments.createdAt = Date.parse(
                subscriptionData.data.comments.createdAt
              );
              subscriptionData.data.comments.updatedAt = Date.parse(
                subscriptionData.data.comments.updatedAt
              );
              previous.fetchComments.edges = [
                subscriptionData.data.comments,
                ...previous.fetchComments.edges
              ];
              return previous;
            }
          }
        ],
        watchLoading(isLoading, countModifier) {
          isLoading
            ? (this.loadingComments = true)
            : (this.loadingComments = false);
        }
      });
    },
    showModal(val) {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }
      this.openModal = true;
      $(val).modal('show');
    }
  },
  mounted() {
    if (this.currentRoom.currentTopic) {
      this.fetchRoomComments();
    }
  }
};
</script>

<style>
.modal-backdrop.show {
  opacity: 0.3;
}
.modal-backdrop {
  background: #171725;
  opacity: 0.3;
}
</style>

<style scoped>
.no-shadow {
  box-shadow: none !important;
}
.avatar {
  height: 40px;
  width: 40px;
  object-fit: cover;
}

img.photo-content {
  /* width: 100%; */
  /* object-fit: contain; */
  height: 100px;
}

.timer {
  font-size: 9px;
  border: 1px solid white;
  padding: 5px 12px;
  height: 35px;
  border-radius: 3px;
}

button.suggest-topic {
  background: #07834e;
  border: 1px solid #ffffff;
  border-radius: 2px;
  height: 42px;
  color: white;
  width: 180px;
  font-size: 14px;
}
button.change-topic {
  color: #07834e;
  border: 1px solid #ffffff;
  border-radius: 2px;
  height: 42px;
  background: white;
  width: 180px;
  font-size: 14px;
}
.scrollable {
  overflow-y: scroll;
  max-height: calc(100vh - 80px);
}
/* Groups */
.groups {
  border-radius: 4px;
  color: #000000;
  background: white;
}

.groups .border-bottom:not(.selected) {
  border-color: #e7e7e7 !important;
}

.groups li.header {
  font-size: 16px;
}
.groups li:not(.header) {
  font-size: 15px;
}
.selected {
  background: #dceee6;
  border-left: solid 3px #07834e;
}

/* Groups end */
.border {
  border-color: #e7e7e7;
}
.actions {
  font-size: 12px;
}
.card-container {
  flex: 0 0 30%;
}
.forum-container {
  flex: 0 0 100%;
}
.forum-header {
  background-image: url('~assets/images/forum-header-BG.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
  min-height: 158px;
  color: white;
}

h4 {
  font-weight: 600;
  font-size: 20px;
}

p {
  font-size: 13px;
}

.comments p,
p,
span.user-handle {
  font-size: 14px;
}

span.time-posted {
  font-size: 12px;
  color: #50bc93;
}

span.username {
  font-size: 15px;
  font-weight: 400;
  color: #000000;
}

.comment-content {
  color: #181818;
}

input {
  height: 48px;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 2px;
}
button.post {
  background: #26b14f;
  border-radius: 2px;
  color: white;
  border: 0;
  height: 48px;
  width: 100%;
  max-width: 120px;
  /* padding: 0 5px; */
  border: none;
}

a {
  color: inherit;
  text-decoration: none;
}
@media (min-width: 992px) {
  .forum-container {
    flex: 0 0 70%;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1400px !important;
  }
}
</style>
