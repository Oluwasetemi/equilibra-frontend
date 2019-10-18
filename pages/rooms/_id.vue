<template>
  <div class="px-md-3 pl-0 forum-container py-4 scrollable" ref="comments">
    <div class="border border-bottom-0">
      <DiscussionVoteResults
        v-if="ongoingDiscussionVoting_"
        :roomId="currentRoom._id"
        :voteId="currentRoom.voteId"
        :topic="currentRoom.currentTopic"
      />
      <VoteDiscussion
        v-if="ongoingDiscussionVoting_"
        :room="ongoingDiscussionVoting_"
        :topic="currentRoom.currentTopic"
      />
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" appear>
        <TopicChangePopup
          v-if="ongoingTopicVoting"
          :roomId="currentRoom._id"
          @closeTopicChangePopup="closeTopicChange_"
          :room="ongoingTopicVoting"
        />
      </transition>
      <RoomHeader
        :currentRoom="currentRoom"
        :isMyRoom="isMyRoom"
        :ongoingDiscussionVoting="ongoingDiscussionVoting_"
      />
      <PostComment :currentRoom="currentRoom" :isMyRoom="isMyRoom" />
      <Comments :currentRoom="currentRoom" :fetchMore="fetchMore" @fetchedMore="fetchMore = false" />
    </div>
  </div>
</template>

<script>
import Timer from "~/components/Rooms/timer";
import { mapGetters, mapActions } from "vuex";
import RoomHeader from "~/components/Rooms/header";
import { endDiscussionTime } from "~/static/js/constants";
import TopicChangePopup from "~/components/Rooms/vote-topic-change";
import VoteDiscussion from "~/components/Rooms/vote-discussion";
import DiscussionVoteResults from "~/components/Rooms/poll-results";
import Comments from "~/components/Rooms/comments";
import PostComment from "~/components/Rooms/post-comment";
export default {
  props: ["currentRoom", "isMyRoom"],
  validate(data) {
    if (data.params.id) {
      return true;
    }
  },
  data() {
    return {
      fetchMore: false,
      showTopicChangePopup: false,
      voteId: null,
      topicTitle: "",
      topicDescription: "",
      fetchResults: false,
      closeDiscussionInterval: null,
      votingResultsInterval: null,
      startTime: this.$moment(endDiscussionTime.startTime),
      endTime: this.$moment(this.$moment(endDiscussionTime.startTime)).add(
        endDiscussionTime.duration,
        "m"
      ),
      now: this.$moment(new Date()),
      test: endDiscussionTime.test
    };
  },
  components: {
    RoomHeader,
    PostComment,
    Comments,
    TopicChangePopup,
    Timer,
    VoteDiscussion,
    DiscussionVoteResults
  },
  computed: {
    ...mapGetters("room", ["ongoingTopicChange", "ongoingDiscussionVoting"]),
    ongoingTopicVoting() {
      return this.ongoingTopicChange.find(
        room => room.id == this.currentRoom._id
      );
    },
    ongoingDiscussionVoting_() {
      return this.ongoingDiscussionVoting.find(
        room => room.id == this.currentRoom._id
      );
    }
  },
  watch: {
    ongoingDiscussionVoting_(val) {
      if (val && !val.voted) this.showModal("#voteDiscussionModal");
    }
  },
  methods: {
    ...mapActions("room", [
      "getRoomById",
      "initiateRoomVoting",
      "closeTopicChange",
      "initiateRoomDiscussionVoting"
    ]),
    closeTopicChange_() {
      this.closeTopicChange(this.currentRoom._id);
    },
    fetchMoreComments({ target }) {
      if (target.scrollTop + target.clientHeight == target.scrollHeight) {
        this.fetchMore = true;
      }
    },
    showModal(val) {
      $(val).modal("show");
    },
    checkToCloseDiscussion() {
      // debugger
      const b = this.now.diff(this.startTime, "minutes") < 0 
      const a = this.endTime.diff(this.now, "minutes") <= 0
      if (
        this.now.diff(this.startTime, "minutes") < 0 ||
        this.endTime.diff(this.now, "minutes") <= 0 ||
        (!this.currentRoom.currentTopic &&
          !this.currentRoom.currentTopic.title) ||
        !this.isMyRoom ||
        !this.currentRoom.voteId
      ) {
        return;
      }
      if (
        this.ongoingDiscussionVoting_ &&
        this.ongoingDiscussionVoting_.voted
      ) {
        clearInterval(this.closeDiscussionInterval);
        return;
      }
      this.initiateRoomDiscussionVoting({
        id: this.currentRoom._id,
        voteId: this.currentRoom.voteId,
        voted: false,
        resultsIn: false
      });
      this.showModal("#voteDiscussionModal");
      clearInterval(this.closeDiscussionInterval);
    },
    showVotingResults() {
      if (!this.test) return
      debugger
      if (
        !this.currentRoom.voteId ||
        (!this.currentRoom.currentTopic &&
          !this.currentRoom.currentTopic.title) ||
        (!this.ongoingDiscussionVoting_ &&
          this.now.diff(this.endTime, "minutes") < 0)
      ) {
        return;
      }
      this.$eventBus.$emit("fetchDiscussionResults");
      this.showModal("#voteResults");
      clearInterval(this.votingResultsInterval);
    },
    getRoom() {
      this.getRoomById(this.$route.query.id)
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.$eventBus.$on("showPopup", ({ data, roomId }) => {
      if (roomId == this.currentRoom._id && this.isMyRoom) {
        this.initiateRoomVoting({
          id: this.currentRoom._id,
          voteId: data.voteId,
          topicTitle: data.title,
          topicDescription: data.description,
          voted: false,
          votingClosed: false,
          totalUpvotes: 0,
          totalDownVotes: 0,
          topicChanged: false,
          ongoingTimer: false,
          endTime: this.$moment(new Date())
            .add(2, "m")
            .toDate()
        });
      }
    });
    this.getRoom();
    const self = this;
    this.closeDiscussionInterval = setInterval(function() {
      self.checkToCloseDiscussion();
    }, 1000);
    this.votingResultsInterval = setInterval(function() {
      self.showVotingResults();
    }, 1000);
    // }
    this.$refs.comments.addEventListener("scroll", this.fetchMoreComments);
  },
  beforeDestroy() {
    this.$refs.comments.removeEventListener("scroll", this.fetchMoreComments);
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
