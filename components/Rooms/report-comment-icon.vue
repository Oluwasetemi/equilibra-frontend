<template>
  <span class="text-center dropdown report">
    <a
      href="#"
      id="reportComment"
      :class="{'main-thread': isMainThread}"
      class="report text-center dropdown-toggle"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >Report Post</a>
    <reportCommentCard
      aria-labelledby="reportComment"
      @reportComment="reportComment_"
      :loading="loading"
      :reported="reported"
    />
  </span>
</template>


<script>
import { mapActions } from "vuex";
import reportCommentCard from "~/components/Rooms/report-comment";
export default {
  props: ["commentId", "isMainThread"],
  data() {
    return {
      loading: false,
      reported: false
    };
  },
  components: {
    reportCommentCard
  },
  methods: {
    ...mapActions("comment", ["reportComment"]),
    reportComment_(val) {
      this.loading = true;
      this.reported = false;
      this.reportComment({ reportType: val, commentId: this.commentId })
        .then(data => {
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          $('[data-toggle="dropdown"]')
            .parent()
            .removeClass("show");
          $(".report-comment-dropdown").removeClass("show");
          this.reported = true;
          this.$toast.success(
            "This comment has been reported as " + val.toLowerCase()
          );
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
a.report {
  width: 120px;
  border-radius: 2px;
  right: 15px;
  padding: 4px;
  bottom: -10px;
  font-size: 11px;
  color: #000000;
}

a.report:not(.main-thread) {
  border: 1px solid #ebeced;
  position: absolute;
  display: none;
  background: white;
}
a.report.main-thread {
  text-decoration: underline;
  float: right;
  background: transparent;
}

.comment:hover a.report {
  display: inline-block;
  /* transition: all 600ms; */
}
</style>