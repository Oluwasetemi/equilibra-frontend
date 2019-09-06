<template>
  <div class="input-comment border-bottom pb-3 pb-md-0">
    <joinRoomModal :roomId="currentRoom._id" @joinedRoom="postComment(true)" />
    <ChangeTopicModal :currentRoom="currentRoom" :hasTopic="false" />
    <div class="d-flex align-items-center px-2">
      <figure class="m-0 d-flex align-items-center pr-2 pl-3 px d-inline-block">
        <img :src="getUser.image || avatar" alt class="rounded-circle avatar" height="40px" />
      </figure>
      <form
        autocomplete="off"
        class="d-flex align-items-center"
        style="flex-grow: 1"
        @submit.prevent="postComment()"
      >
        <div class="form-input position-relative d-inline-block px-3" style="flex-grow: 1">
          <input
            type="text"
            name="comment"
            id="comment"
            class="w-100 form-control"
            v-model="payload.comment"
          />
          <label for="photo" class="m-0 add-photo d-inline-flex">
            <span class="add-photo-icon mt-2 pt-1"></span>
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              @change="previewImage()"
              hidden
            />
          </label>
        </div>
        <div class="px-2" style="flex: 0 0 140px">
          <button
            class="post d-flex align-items-center justify-content-center"
            type="submit"
            :disabled="(!payload.comment && !imageContent) || loading"
          >
            <div
              class="spinner-grow"
              style="color: green !important;"
              v-if="loading"
            ></div>
            <span>Post</span>
          </button>
        </div>
      </form>
    </div>
    <div class="text-center" :class="{'position-absolute': !imageContent}">
      <figure class="position-relative d-inline-block px-5">
        <a href="#" class="close" @click="removeImage()" v-if="imageContent">
          <span>&times;</span>
        </a>
        <img ref="imageContent" src alt height="340px" class="pb-4" style="max-width: 100%" />
      </figure>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import avatar from "~/assets/images/avatar.svg";
import joinRoomModal from "~/components/Rooms/join-room-modal";
import ChangeTopicModal from "~/components/Rooms/change-topic";
import imageUrl from "~/assets/images/judiciary_BG.svg";
export default {
  props: ["currentRoom", "isMyRoom"],
  data() {
    return {
      loading: false,
      avatar,
      imageUrl2: { imageUrl },
      payload: {
        comment: ""
      },
      file: "",
      imageContent: false
    };
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    ...mapGetters("auth", ["isAuthenticated"])
  },
  components: {
    joinRoomModal,
    ChangeTopicModal
  },
  methods: {
    ...mapActions("comment", ["createComment"]),
    removeImage() {
      this.imageContent = false;
      this.file = "";
      this.$refs.imageContent.src = "";
    },
    previewImage() {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => {
        this.imageContent = true;
        this.$refs.imageContent.src = e.target.result;
      };
    },
    postComment(joinedRoom = false) {
      if (!this.isAuthenticated) {
        $("#signUpModal").modal("show");
        return;
      }
      if (!this.isMyRoom && !joinedRoom) {
        $("#joinRoomModal").modal("show");
        return;
      }
      if (!this.currentRoom.currentTopic) {
        $("#changeTopic").modal("show");
        return;
      }
      this.payload.topic = this.currentRoom.currentTopic._id;
      if (this.file) this.payload.file = this.file;
      this.loading = true;
      this.createComment(this.payload)
        .then(data => {
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.payload.comment = "";
          this.removeImage();
          this.$toast.success("Your comment has been posted");
          this.$eventBus.$emit("fetchComments");
        })
        .catch(err => {
          this.loading = true;
        });
    }
  }
};
</script>


<style scoped>
a.close {
  border: solid 2px #07834e;
  border-radius: 50%;
  height: 25px;
  width: 27px;
  font-weight: 200;
  position: absolute;
  right: -10px;
}

.close span {
  color: #07834e;
  font-weight: 100;
}
.avatar {
  height: 40px;
  width: 40px;
  object-fit: cover;
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

.add-photo-icon {
  mask: url("~assets/icons/add-photo.svg");
  mask-size: cover;
  background-color: #9fa3a3;
  width: 22px;
  height: 18px;
}

label.add-photo {
  position: absolute;
  top: 29%;
  right: 35px;
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
