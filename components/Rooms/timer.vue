<template>
  <span>{{ duration }}</span>
</template>

<script>
export default {
  data() {
    return {
      duration: 1.0,
      interval: null,
      timer: 10.0
    };
  },
  mounted() {
    this.startTimer(this.duration);
  },

  methods: {
    startTimer(duration) {
      this.timer = duration * 60;
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
            self.$emit("timerComplete")
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