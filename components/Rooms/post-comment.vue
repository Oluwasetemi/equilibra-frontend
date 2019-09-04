<template>
  <div class="input-comment border-bottom pb-3 pb-md-0">
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
          <img src alt class="position-absolute" />
        </div>
        <div class="px-2" style="flex: 0 0 140px">
          <button class="post" type="submit" :disabled="!payload.comment || loading">Post</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import avatar from "~/assets/images/avatar.png";
import imageUrl from "~/assets/images/judiciary_BG.svg";
export default {
  props: ["currentRoom"],
  data() {
    return {
      loading: false,
      avatar,
      imageUrl2: { imageUrl },
      payload: {
        comment: ""
      }
    };
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    ...mapGetters("auth", ["isAuthenticated"])
  },
  methods: {
    ...mapActions("comment", ["createComment"]),
    showModal(val) {
      if (!this.isAuthenticated) {
        this.$router.push("/login");
        return;
      }
      $(val).modal("show");
    },
    postComment() {
      this.payload.topic = this.currentRoom.currentTopic._id;
      this.loading = true;
      this.createComment(this.payload)
        .then(data => {
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.payload.comment = "";
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
