<template>
  <div class="close-vote position-fixed">
    <div class="timer d-flex align-items-center justify-content-center ml-auto mb-4">
      <span class="font-weight-bold">
        <Timer @timerComplete="fetchVotingResults" />
      </span>
    </div>
    <div class="content p-3">
      <h4 class="mb-3">Voting for New Topic in progress</h4>
      <p class="suggested">Suggested topic:</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      <p v-if="voteRegistered">Your vote has been registered!</p>
      <div class="d-flex justify-content-between" v-else>
        <a href="#" class="decline py-2" @click="voteTopic(false)">Decline topic</a>
        <button class="accept py-2 px-3" @click="voteTopic(true)">Accept topic</button>
      </div>
    </div>
  </div>
</template>

<script>
import Timer from "~/components/Rooms/timer";
import { voteType } from "~/static/js/constants";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["voteId"],
  data() {
    return {
      loading: false,
      voteType,
      voteRegistered: false,
      votingClosed: false
    };
  },
  components: {
    Timer
  },
  methods: {
    ...mapActions("topic", ["vote", "closeRequestTopicChangeVoting"]),
    voteTopic(accept) {
      const vote = accept ? this.voteType.upVote : this.voteType.downVote;
      this.vote({ vote, voteId: this.voteId })
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.$toast.success("Your vote has been registered!");
          this.voteRegistered = true;
        })
        .catch(err => {});
    },
    fetchVotingResults() {
      this.closeRequestTopicChangeVoting({ voteId: this.voteId })
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.$toast.success(data.successMessage);
          this.votingClosed = true;
        })
        .catch(err => {});
    }
  }
};
</script>


<style scoped>
div.close-vote {
  bottom: 40px;
  right: 20px;
  max-width: 300px;
  z-index: 100;
}

div.content {
  border: 2px solid #26b14f;
  border-radius: 2px;
  background: #ffffff;
}

.timer {
  background: #ffffff;
  border: 2px solid #26b14f;
  border-radius: 50%;
  width: 70px;
  height: 70px;
}

p {
  font-size: 12px;
  line-height: 13px;
  font-weight: 100;
}

p.suggested {
  color: black;
  font-weight: 400;
}
p:last-child {
  color: #444;
}

.timer span {
  color: #747a76;
  font-size: 14px;
  line-height: 16px;
}

h4 {
  font-size: 13px;
  line-height: 15px;
  font-weight: 600;
  text-decoration-line: underline;

  color: #07834e;
}

button.accept {
  background: #26b14f;
  border-radius: 2px;
  border: none;
  color: white;
  font-size: 12px;
  font-weight: 400;
}

a.decline {
  background: transparent;
  border: none;
  color: black;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}
</style>