<template>
  <div
    class="modal fade"
    id="commentModal"
    role="dialog"
    aria-labelledby="commentModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="user-details d-flex px-3 py-2 border-bottom">
          <figure class="m-0 pr-1 d-inline-block">
            <img :src="getUser.image || '~assets/images/avatar.png'" alt class="rounded-circle" height="40px" />
          </figure>
          <div class="user text-left px-2">
            <div class="username">Joseph Makanaki</div>
            <div class="user-handle">@Joseph_Makanaki</div>
          </div>
        </div>
        <div class="comment-content p-3">
          <p class="text-left m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, is sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          </p>
        </div>
        <div class="grey-wrapper px-3 py-2">
          <div class="time d-inline-block mr-4">
            <span>11:46 PM</span> -
            <span>20 Jun 2019</span>
          </div>
          <div class="actions d-inline-block mr-2">
            <span class="likes">
              <img src="~/assets/icons/like-icon-outline.svg" alt />
              <span class="px-1">4</span>
            </span>
            <span class="replies ml-2">
              <img src="~/assets/icons/replies-icon.svg" alt />
              <span class="px-1">10</span>
            </span>
          </div>
        </div>
        <div class="replies pb-4">
          <div class="d-flex comment px-3 py-1 position-relative" :class="{active: setClass}">
            <figure class="m-0 py-3 pr-1 d-inline-block">
              <img :src="getUser.image || '~assets/images/avatar.png'" alt class="rounded-circle" height="40px" />
            </figure>

            <div class="form-input position-relative d-inline-block px-2" style="flex-grow: 1">
              <div class="py-3">
                <div class="user text-left">
                  <span class="username">Joseph Makanaki</span>
                  <div class="d-block d-md-inline">
                    <span class="user-handle pr-2 px-md-2">@Joseph_Makanaki</span>
                    <span class="time-posted">30 mins</span>
                  </div>
                </div>
                <div class="comment-content pr-3">
                  <p class="text-left m-0">Congrats man, that's huge!</p>
                </div>
                <div class="actions mr-2 pt-2">
                  <a
                    href="#"
                    class="likes-button d-inline-flex align-items-center justify-content-around px-1"
                    @click.stop="liked = !liked"
                    :class="{liked}"
                  >
                    <span class="likes-icon"></span>
                    <span class="px-1">4</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="options position-absolute d-flex">
              <div class="text-center dropdown" data-toggle="tooltip" title="Like">
                <a href="#" class="inline-block px-2 border-right text-center">
                  <img src="~/assets/icons/like-icon-outline.svg" alt />
                  <!-- <img src="~/assets/icons/like-icon-red-filled.svg" alt=""> -->
                </a>
              </div>
              <div class="text-center dropdown" data-toggle="tooltip" title="Delete">
                <a
                  id="deleteComment"
                  href="#"
                  class="inline-block px-2 text-center border-right"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src="~/assets/icons/delete-icon.svg" alt />
                </a>
                <deleteCommentCard class="dropdown-menu" aria-labelledby="deleteComment" />
              </div>
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
                <shareLinkCard class="dropdown-menu" aria-labelledby="shareLink" />
              </div>
            </div>
            <span class="text-center dropdown">
              <a
                href="#"
                id="reportComment"
                class="report text-center"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Report Post</a>
              <reportCommentCard aria-labelledby="reportComment" />
            </span>
          </div>
        </div>
        <form
          class="new-comment border-top px-3"
          autocomplete="off"
          @submit.prevent
          :class="{borderGreen: formActive}"
        >
          <div class="form-input position-relative d-flex">
            <label for="photo" class="m-0" style="display: inline-flex">
              <span class="add-photo-icon mt-2 pt-1" style="position: relative;top: 7px;"></span>
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                @change="previewImage()"
                hidden
              />
            </label>
            <div class="inline-block" style="flex-grow: 1">
              <input
                type="text"
                name="comment"
                id="comment"
                class="d-inline-block border-0 px-4 w-100"
                placeholder="Type a message..."
              />
              <div class="text-center">
                <img ref="imageContent" src alt height="340px" class="pb-4" style="max-width: 80%" />
              </div>
            </div>

            <a href class="mt-2 pt-1">
              <span
                class="post-comment-icon"
                data-toggle="tooltip"
                title="Post"
                style="position: relative;top: 7px;"
              ></span>
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import shareLinkCard from "~/components/Rooms/share-link";
import reportCommentCard from "~/components/Rooms/report-comment";
import deleteCommentCard from "~/components/Rooms/delete-comment";
export default {
  data() {
    return {
      showLink: false,
      liked: false,
      formActive: false,
      imageContent: false,
      setClass: false
    };
  },
  components: {
    shareLinkCard,
    reportCommentCard,
    deleteCommentCard
  },
  computed: {
    ...mapGetters("user", ["getUser"])
  },
  methods: {
    previewImage() {
      const avatar = event.target.files[0];
      // this.formData.append("photo", avatar);
      const reader = new FileReader();
      reader.readAsDataURL(avatar);
      reader.onload = e => {
        this.imageContent = true;
        this.$refs.imageContent.src = e.target.result;
      };
    }
  },
  mounted() {
    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
};
</script>



<style scoped>
.border-top,
.border,
.border-bottom {
  border-color: #e7e7e7 !important;
}

.dropdown-menu {
  left: unset !important;
  right: 0;
  border: none;
}

.share-link {
  z-index: 10;
  right: 30px;
  top: 15px;
}

.new-comment,
input {
  font-size: 14px;
  font-weight: 100;
}
.modal-content {
  background: white;
  transition: all 0.5s;
}
.modal-content {
  border: 0;
}

input:focus ~ a span {
  background-color: #168a59;
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

a.report {
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
}
.options {
  border: 1px solid #ebeced;
  border-radius: 2px;
  top: -20px;
  right: 40px;
  height: 26px;
  opacity: 0;
}

.comment:hover {
  /* transition: all 600ms; */
  background: #dceee6;
}

.comment:hover .options,
.comment:hover .report {
  opacity: 1;
  transition: all 600ms;
}

.options a,
div.dropdown {
  width: 40px;
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
