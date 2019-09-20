<template>
  <div
    class="modal fade"
    id="commentModal"
    role="dialog"
    aria-labelledby="commentModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content" v-if="!loading && Object.keys(comment).length > 0">
        <div class="scrollable">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="user-details d-flex px-3 py-2 border-bottom">
            <figure class="m-0 pr-1 d-inline-block">
              <img
                :src="getUser.image || avatar"
                alt
                class="rounded-circle"
                height="40px"
                width="40px"
              />
            </figure>
            <div class="user text-left px-2">
              <div class="username">{{comment.author.username}}</div>
              <div class="user-handle">@{{comment.author.username}}</div>
            </div>
          </div>
          <div class="comment-content p-3">
            <p class="text-left m-0">{{comment.comment}}</p>
          </div>
          <div class="comment-image pb-3" v-if="comment.image">
            <img :src="comment.image" alt="photo content" class="photo-content" />
          </div>
          <div class="grey-wrapper px-3 py-2">
            <div class="time d-inline-block mr-4">
              <span>{{comment.createdAt | formatTime($moment)}}</span> -
              <span>{{comment.createdAt | formatDate($moment)}}</span>
            </div>
            <div class="actions d-inline-block mr-2">
              <likeIcon :commentId="comment._id" :liked="comment.liked" :likes="comment.likes" />

              <span class="replies ml-2">
                <span
                  class="text-center dropdown share-comment position-relative"
                  data-toggle="tooltip"
                  title="Share"
                >
                  <a
                    href="#"
                    class="inline-block px-2"
                    id="shareLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span>Share</span>
                    <img src="~/assets/icons/share.svg" alt />
                  </a>
                  <shareLinkCard class="dropdown-menu share-link" aria-labelledby="shareLink" dat/>
                </span>
              </span>
            </div>
          </div>
          <div class="replies pb-4" v-if="comment.replies.length > 0">
            <div
              class="d-flex comment px-3 py-1 position-relative"
              :class="{active: setClass}"
              v-for="(reply, i) in comment.replies"
              :key="i"
              @click="activeReply = reply._id"
            >
              <figure class="m-0 py-3 pr-1 d-inline-block">
                <img
                  :src="comment.author.image || avatar"
                  alt
                  class="rounded-circle"
                  height="40px"
                  width="40px"
                />
              </figure>
              <div class="form-input position-relative d-inline-block px-2" style="flex-grow: 1">
                <div class="py-3">
                  <div class="user text-left">
                    <span class="username">{{reply.author.username}}</span>
                    <div class="d-block d-md-inline">
                      <span class="user-handle pr-2 px-md-2">@{{reply.author.username}}</span>
                      <span class="time-posted">{{comment.createdAt | formatDate($moment)}}</span>
                    </div>
                  </div>
                  <div class="comment-content pr-3">
                    <p class="text-left m-0">{{reply.comment}}</p>
                  </div>
                  <div class="comment-image pb-3" v-if="reply.image">
                    <img :src="reply.image" alt="photo content" class="photo-reply mt-3" />
                  </div>
                  <div class="actions mr-2 pt-2">
                    <a
                      href="#"
                      class="likes-button d-inline-flex align-items-center justify-content-around px-1"
                      :class="{liked: reply.liked}"
                      @click="toggleLike.id = reply._id, toggleLike.count += 1"
                    >
                      <span class="likes-icon"></span>
                      <span class="position-relative" style="top: -1">{{reply.likes}}</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="options position-absolute">
                <div class="text-center dropdown border-right" data-toggle="tooltip" title="Like">
                  <likeIcon
                    :commentId="reply._id"
                    :liked="reply.liked"
                    :likes="reply.likes"
                    :hideCount="true"
                    :toggleLike="toggleLike"
                  />
                </div>

                <DeleteCommentIcon :commentId="activeReply" v-if="reply.author._id == getUser._id" />
                <div class="text-center dropdown" data-toggle="tooltip" title="Share">
                  <a
                    href="#"
                    class="inline-block px-2"
                    id="shareLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src="~/assets/icons/share.svg" alt />
                  </a>
                  <shareLinkCard class="dropdown-menu share-link-2" aria-labelledby="shareLink" />
                </div>
              </div>
              <ReportCommentIcon :commentId="activeReply" v-if="reply.author._id != getUser._id" class="report-card"/>
            </div>
          </div>
        </div>

        <form
          class="new-comment border-top px-3"
          autocomplete="off"
          @submit.prevent="postReply()"
          :class="{borderGreen: formActive}"
        >
          <div class="form-input position-relative d-flex">
            <label for="replyPhoto" class="m-0" style="display: inline-flex">
              <span class="add-photo-icon mt-2 pt-1" style="position: relative;top: 7px;"></span>
              <input
                type="file"
                name="replyPhoto"
                id="replyPhoto"
                accept="image/*"
                @change="previewReplyImage()"
                hidden
              />
            </label>
            <div class="inline-block" style="flex-grow: 1">
              <input
                type="text"
                name="comment"
                id="comment"
                v-model="payload.comment"
                class="d-inline-block border-0 px-4 w-100"
                placeholder="Type a message..."
              />
              <div class="text-center" :class="{'position-absolute': !imageContent}">
                <figure class="position-relative d-inline-block">
                  <a href="#" class="close" @click="removeReplyImage()" v-if="imageContent">
                    <span>&times;</span>
                  </a>
                  <img
                    ref="replyimageContent"
                    src
                    alt
                    height="340px"
                    class="pb-4"
                    style="max-width: 80%"
                  />
                </figure>
              </div>
            </div>

            <button class="mt-2 pt-1 post-btn" type="submit">
              <span
                class="post-comment-icon"
                data-toggle="tooltip"
                title="Post"
                style="position: relative;top: 7px;"
              ></span>
            </button>
          </div>
        </form>
      </div>
      <div class="py-4 text-center w-100" v-else>
        <div class="spinner-border"></div>
      </div>
    </div>
  </div>
</template>

<script>
import likeIcon from "~/components/Rooms/like-icon";
import avatar from "~/assets/images/avatar.svg";
import gql from "~/apollo/user/comment";
import { mapGetters, mapActions } from "vuex";
import shareLinkCard from "~/components/Rooms/share-link";
import ReportCommentIcon from "~/components/Rooms/report-comment-icon";
import DeleteCommentIcon from "~/components/Rooms/delete-comment-icon";
export default {
  props: ["commentId", "roomId"],
  // asyncData() {

  // }
  data() {
    return {
      avatar,
      showLink: false,
      liked: false,
      file: "",
      formActive: false,
      imageContent: false,
      setClass: false,
      toggleLike: { id: null, count: 0 },
      activeReply: {},
      payload: {
        comment: ""
      },
      fetchComment: {},
      loading: false
    };
  },
  components: {
    shareLinkCard,
    ReportCommentIcon,
    DeleteCommentIcon,
    likeIcon
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    ...mapGetters("auth", ["getToken"]),
    comment() {
      return this.fetchComment;
    }
  },
  filters: {
    formatDate(val, moment) {
      return moment("2019-09-04T03:50:04.428Z")
        .startOf("day")
        .fromNow();
    },
    formatTime(val, moment) {
      return moment("2019-09-04T03:50:04.428Z").format("h:mm:ss a");
    }
  },
  methods: {
    ...mapActions("comment", ["replyComment", "reportComment"]),
    removeReplyImage() {
      this.imageContent = false;
      this.file = "";

      this.$refs.replyimageContent.src = "";
    },
    fetchCommentByID() {
      this.loading = true;
      this.$apollo.addSmartQuery("fetchComment", {
        query: gql.fetchComment,
        variables: {
          commentId: this.commentId
        },
        context: {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        },
        watchLoading(isLoading, countModifier) {
          isLoading ? (this.loading = true) : (this.loading = false);
        },
        result() {
          this.loading = false;
        }
      });
    },
    previewReplyImage() {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => {
        this.imageContent = true;
        this.$refs.replyimageContent.src = e.target.result;
      };
    },
    postReply() {
      this.payload.commentId = this.comment._id;
      this.payload.room = this.roomId;
      if (this.file) this.payload.file = this.file;
      this.loading = true;
      this.replyComment(this.payload)
        .then(data => {
          this.payload.comment = "";
          this.loading = false;
          this.removeReplyImage();
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }

          this.$toast.success("Your reply has been posted");
        })
        .catch(err => {
          this.loading = true;
        });
    }
  },
  mounted() {
    this.fetchCommentByID();
    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
    const self = this;
    $("#commentModal").on("hide.bs.modal", function() {
      self.$emit("closeModal");
    });
  }
};
</script>



<style scoped>
.dropdown.share-comment {
  background: transparent;
  width: unset;
  height: unset;
}

a.close {
  border: solid 2px #07834e;
  border-radius: 50%;
  height: 25px;
  width: 27px;
  font-weight: 200;
  position: absolute;
  right: -10px;
}
.spinner-border {
  height: 4rem;
  width: 4rem;
  border: 0.4em solid currentColor;
}

img.photo-reply {
  width: 80px;
  object-fit: cover;
  height: 100px;
}

img.photo-content {
  width: 100%;
  object-fit: contain;
  height: 300px;
}

div.scrollable {
  max-height: 80vh;
  overflow-y: scroll;
}

.border-top,
.border,
.border-bottom {
  border-color: #e7e7e7 !important;
}

.dropdown-menu:not(.share-link) {
  /* left: unset !important;
  right: 0; */
  border: none;
}

.share-link {
  z-index: 10;
  top: -10px !important;
    left: 100% !important;
}

.new-comment,
input {
  font-size: 14px;
  font-weight: 100;
}
.modal-content {
  background: white;
  /* transition: all 0.5s; */
}
.modal-content {
  border: 0;
}

input:focus ~ button span {
  background-color: #168a59;
}

button.post-btn {
  background: transparent;
  border: none;
  padding: unset;
  height: unset;
  margin: auto;
}

.likes-button {
  width: 44px;
  height: 20px;
  background: #fbfbfb;
  border: 1px solid #9fa3a3;
  border-radius: 2px;
}

.likes-button.liked {
  background: rgba(254, 34, 34, 0.1);
  border-color: #fe2222;
  color: #fe2222;
}

.likes-button.liked .likes-icon,
.like-icon-outline.liked {
  background-color: #fe2222;
}

.borderGreen.border-top {
  border-top: 1px solid #168a59 !important;
}

/* a.report {
  width: 120px;
  border: 1px solid #ebeced;
  border-radius: 2px;
  position: absolute;
  right: 15px;
  padding: 4px;
  bottom: -10px;
  font-size: 11px;
  color: #000000;
  background: white;
  opacity: 0;
} */
.options {
  border: 1px solid #ebeced;
  border-radius: 2px;
  top: -20px;
  right: 40px;
  height: 26px;
  display: none;
}

.options .dropdown {
  box-shadow: none;
}

.comment:hover {
  /* transition: all 600ms; */
  background: #dceee6;
}

.comment:hover .options {
  display: flex;
}

.comment:hover .report {
  display: inline-block;
  /* transition: all 600ms; */
}

div.dropdown {
  width: 40px;
  height: 24px;
  background: #ffffff;
}

.options a {
  width: 100%;
  height: 24px;
  background: #ffffff;
}

.grey-wrapper {
  background: #f4f4f4;
  font-size: 14px;
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
  background-image: url("~assets/images/forum-header-BG.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
  height: 158px;
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
.user-handle {
  font-size: 14px;
}

.user-handle {
  color: #9fa3a3;
}
span.time-posted {
  font-size: 12px;
  color: #50bc93;
}

.username {
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

.likes-icon {
  mask: url("~assets/icons/like-icon-filled.svg");
  mask-size: cover;
  display: inline-block;
  background-color: #9fa3a3;
  width: 12px;
  height: 10.56px;
}
.like-icon-outline {
  mask: url("~assets/icons/like-icon-outline.svg");
  mask-size: cover;
  display: inline-block;
  background-color: #000000;
  width: 12.57px;
  height: 11px;
}
.add-photo-icon {
  mask: url("~assets/icons/add-photo.svg");
  mask-size: cover;
  display: inline-block;
  background-color: #9fa3a3;
  width: 22px;
  height: 18px;
}
.post-comment-icon {
  mask: url("~assets/icons/post-comment.svg");
  mask-size: cover;
  display: inline-block;
  background-color: #9fa3a3;
  width: 20px;
  height: 17px;
}

button.close {
  position: absolute;
  right: 0;
  background: #dceee6;
  border-radius: 0px 4px 0px 0px;
  height: 34px;
  width: 40px;
}

.close span {
  color: #07834e;
  font-weight: 100;
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 940px;
  }
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
