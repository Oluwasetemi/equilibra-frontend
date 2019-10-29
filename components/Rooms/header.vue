<template>
  <div>
    <loginModal />
    <SuggestTopicModal :currentRoom="currentRoom" />
    <ChangeTopicModal :currentRoom="currentRoom" />
    <joinRoomModal :roomId="currentRoom._id" :changeTopic="true" />
    <div class="forum-header px-4 py-2 d-flex align-items-center">
      <div class="header-content w-100">
        <div class="d-lg-flex justify-content-between">
          <h4 class="d-inline-block mb-lg-2 mb-0">{{currentRoom ? currentRoom.name : '--'}}</h4>
          <div class="d-inline-block mb-2 mb-lg-0">
            <img src="~/assets/icons/avatar2.svg" alt class="mr-1" />
            <span style="font-size: 14px; text-decoration: underline;">Hon. Danjuma Zaccheus</span>
          </div>
        </div>
        <p
          class="description mb-2 mr-md-5 pr-md-5"
          v-if="currentRoom && currentRoom.slug != 'Vent-The-Steam'"
        >{{currentRoom.currentTopic ? currentRoom.currentTopic.title : 'This room has no topic' }}</p>
        <div class="d-flex justify-content-between align-items-end flex-wrap">
          <span class="d-flex align-items-end">
            <div
              class="timer d-flex align-items-center mt-2"
              v-if="currentRoom && currentRoom.currentTopic && currentRoom.slug != 'Vent-The-Steam'"
            >
              <img src="~/assets/icons/timer.svg" alt class="mr-2" />
              <span class="position-relative">
                <span style="font-size: 15px" class="pr-1">{{daysLeft}}</span>Day(s)
                <span style="font-size: 14px" class="px-1">{{hoursLeft}}</span> Hour(s)
                <span class="ml-2" style="font-size: 14px">{{minutesLeft}}</span> Minute(s)
                <span class="secs">{{secondsLeft}}</span>
              </span>
            </div>
            <span
              v-if="ongoingDiscussionVoting && ongoingDiscussionVoting.voteId && isMyRoom && !ongoingDiscussionVoting.resultsIn"
              class="ml-2"
            >
              <a
                href="#"
                style="text-decoration: underline; font-size: 11px;"
                @click="showModal('#voteDiscussionModal')"
              >Voting in progress</a>
            </span>
            <span
              v-if="ongoingDiscussionVoting && ongoingDiscussionVoting.voteId && isMyRoom && ongoingDiscussionVoting.resultsIn"
              class="ml-2"
            >
              <a
                href="#"
                style="text-decoration: underline; font-size: 11px;"
                @click="showModal('#voteResults')"
              >View voting results</a>
            </span>
          </span>

          <div class="topic-actions mt-2" v-if="currentRoom.slug != 'Vent-The-Steam'">
            <button class="suggest-topic mr-2" @click="showModal('#suggestTopic')">Suggest Topic</button>
            <button
              class="change-topic ml-2"
              @click="showModal('#changeTopic')"
            >Change Current Topic</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { endDiscussionTime } from "~/static/js/constants";
import SuggestTopicModal from "~/components/Rooms/suggest-topic";
import joinRoomModal from "~/components/Rooms/join-room-modal";
import ChangeTopicModal from "~/components/Rooms/change-topic";
import loginModal from "~/components/Authentication/sign-up";

export default {
  layout: "greenNavOnly",
  props: ["currentRoom", "isMyRoom", "ongoingDiscussionVoting"],
  data() {
    return {
      startDiscussionVoteTime: this.$moment(endDiscussionTime.startTime),
      timer: 0,
      duration: "...",
      interval: null
    };
  },
  components: {
    SuggestTopicModal,
    ChangeTopicModal,
    loginModal,
    joinRoomModal
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    daysLeft() {
      return `0${parseInt(
        this.$moment
          .utc(this.$moment.duration(this.timer, "seconds").asMilliseconds())
          .format("DD")
      ) - 1}`;
    },
    minutesLeft() {
      return this.$moment
        .utc(this.$moment.duration(this.timer, "seconds").asMilliseconds())
        .format("mm");
    },
    hoursLeft() {
      return this.$moment
        .utc(this.$moment.duration(this.timer, "seconds").asMilliseconds())
        .format("HH");
    },
    secondsLeft() {
      return this.$moment
        .utc(this.$moment.duration(this.timer, "seconds").asMilliseconds())
        .format("ss");
    }
  },
  methods: {
    getTime() {
      const now = this.$moment(new Date());
      this.timer = this.startDiscussionVoteTime.diff(now, "seconds");
      if (this.timer < 0) {
        self.stopTimer();
        return;
      }
      const self = this;
      this.interval = setInterval(() => {
        self.duration = this.$moment
          .utc(this.$moment.duration(this.timer, "seconds").asMilliseconds())
          .format("DD:HH:mm:ss");
        if (self.timer < 0) {
          self.stopTimer();
        }
        self.timer = self.timer - 1;
      }, 1000);
    },

    stopTimer() {
      clearInterval(this.interval);
    },
    showModal(val) {
      if (!this.isAuthenticated) {
        $("#signUpModal").modal("show");
        return;
      }
      if (!this.isMyRoom) {
        $("#joinRoomModal").modal("show");
        return;
      }
      $(val).modal("show");
    }
  },
  mounted() {
    this.getTime();
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
.secs {
  position: absolute;
  top: -3px;
  font-size: 7px;
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
