<template>
  <div class="px-md-3 pl-0 forum-container py-4 scrollable">
    <CommentModal />
    <SuggestTopicModal />
    <ChangeTopicModal :currentRoom="currentRoom"/>

    <div class="border">
      <div class="forum-header px-4 py-2 d-flex align-items-center">
        <div class="header-content w-100">
          <div class="d-flex justify-content-between">
            <h4 class="d-inline-block mb-2">{{currentRoom ? currentRoom.name : 'Vent the steam'}}</h4>
            <div class="d-inline-block">
              <img src="~/assets/icons/avatar2.svg" alt class="mr-1" />
              <span style="font-size: 14px; text-decoration: underline;">Hon. Danjuma Zaccheus</span>
            </div>
          </div>

          <p class="description mb-2 mr-md-5 pr-md-5" v-if="currentRoom">
            {{currentRoom ? currentRoom.currentTopic || 'This room has no topic' : 'This room has no topic'}}
          </p>
          <div
            class="d-flex justify-content-between align-items-end flex-wrap"
          >
            <div class="timer d-flex align-items-center mt-2">
              <img src="~/assets/icons/timer.svg" alt class="mr-2" />
              <span>
                <span style="font-size: 15px" class="pr-1">5</span>Day(s)
                <span style="font-size: 14px" class="px-1">15</span> HOUR(s)
                <span class="ml-2" style="font-size: 14px">56</span> Minute(s)
              </span>
            </div>
            <div class="topic-actions mt-2">
              <button
                class="suggest-topic mr-2"
                data-toggle="modal"
                data-target="#suggestTopic"
              >Suggest Topic</button>
              <button
                class="change-topic ml-2"
                data-toggle="modal"
                data-target="#changeTopic"
              >Change Current Topic</button>
            </div>
          </div>
        </div>
      </div>
      <div class="input-comment border-bottom pb-3 pb-md-0">
        <div class="d-flex align-items-center px-2">
          <figure class="m-0 d-flex align-items-center pr-2 pl-3 px d-inline-block">
            <img src="~/assets/images/avatar.png" alt class="rounded-circle" height="40px" />
          </figure>
          <form autocomplete="off" class="d-flex align-items-center" style="flex-grow: 1">
            <div class="form-input position-relative d-inline-block px-3" style="flex-grow: 1">
              <input type="text" name="comment" id="comment" class="w-100 form-control" />
              <img src alt class="position-absolute" />
            </div>

            <div class="px-2" style="flex: 0 0 140px">
              <button class="post">Post</button>
            </div>
          </form>
        </div>
      </div>
      <div class="comments">
        <div class="d-flex px-2 comment">
          <figure class="m-0 py-3 pr-1 pl-4 px d-inline-block">
            <img src="~/assets/images/avatar.png" alt class="rounded-circle" height="40px" />
          </figure>

          <div class="form-input position-relative d-inline-block px-3" style="flex-grow: 1">
            <div class="comment py-3">
              <div class="user text-left">
                <span class="username">Joseph Makanaki</span>
                <div class="d-block d-md-inline">
                  <span class="user-handle pr-2 px-md-2">@Joseph_Makanaki</span>
                  <span class="time-posted">30 mins</span>
                </div>
              </div>
              <div class="comment-content mt-2 pr-3">
                <p class="text-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, is sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                </p>
              </div>
              <div class="actions mr-2">
                <a
                  href="#"
                  class="likes"
                  data-toggle="tooltip"
                  title="Like"
                  @click="liked = !liked"
                >
                  <img src="~/assets/icons/like-icon-outline.svg" alt v-if="!liked" />
                  <img src="~/assets/icons/like-icon-red-filled.svg" alt v-if="liked" />
                  <span class="px-1">{{!liked ? 4 : 4+1}}</span>
                </a>
                <a href="#" class="replies ml-2" data-toggle="modal" data-target="#commentModal">
                  <span data-toggle="tooltip" title="Reply">
                    <img src="~/assets/icons/replies-icon.svg" alt />
                    <span class="px-1">10</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentModal from "~/components/Rooms/view-comment-modal";
import SuggestTopicModal from "~/components/Rooms/suggest-topic";
import ChangeTopicModal from "~/components/Rooms/change-topic";
import imageUrl from "~/assets/images/judiciary_BG.svg";
import Card from "~/components/Forums/forum-card";
export default {
  layout: "greenNavOnly",
  props: ['currentRoom'],
  data() {
    return {
      liked: false,
      imageUrl2: { imageUrl },
      groups: [
        {
          name: "High Court",
          link: ""
        },
        {
          name: "Customary Court of Appeal",
          link: ""
        },
        {
          name: "Magistrate Court",
          link: ""
        },
        {
          name: "Customary Court",
          link: ""
        },
        {
          name: "Customary Court of Appeal",
          link: ""
        },
        {
          name: "Magistrate Court",
          link: ""
        }
      ]
    };
  },
  components: {
    Card,
    CommentModal,
    SuggestTopicModal,
    ChangeTopicModal
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
