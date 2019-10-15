<template>
  <span>{{duration }}</span>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["endTime", "votingClosed", "ongoingTimer"],
  data() {
    return {
      interval: null,
      timer: 0,
      duration: "--"
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    ...mapActions("room", ["setRoomVotingField"]),
    startTimer() {
      const date1 = this.$moment(new Date());
      const date2 = this.$moment(this.endTime);
      if (date2.diff(date1, "minutes") <= 0) {
        this.duration = "0:00";
        this.$emit("timerComplete");
        this.stopTimer();
        this.setRoomVotingField({
          roomId: this.roomId,
          data: { ongoingTimer: false }
        });
        return;
      }
      this.timer = date2.diff(date1, "seconds");
      let minutes = 0;
      let seconds = 0;
      const self = this;
      this.interval = setInterval(() => {
        minutes = parseInt(self.timer / 60, 10);
        seconds = parseInt(self.timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        self.duration = minutes + ":" + seconds;

        self.timer = self.timer - 1;
        if (self.timer < 0) {
          self.$emit("timerComplete");
          self.stopTimer();
        }
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.interval);
    }
  }
};
</script>