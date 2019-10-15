<template>
  <div class="text-center dropdown border-right" data-toggle="tooltip" title="Delete">
    <a
      id="deleteComment"
      href="#"
      class="inline-block px-2 text-center"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <span class="delete-icon reply-icon" v-if="isMainThread" title="Delete"></span>
      <img src="~/assets/icons/delete-icon.svg" v-else alt title="Delete" />
    </a>
    <deleteCommentCard
      class="dropdown-menu"
      aria-labelledby="deleteComment"
      @deleteComment="deleteComment_"
      :loading="loading"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import deleteCommentCard from "~/components/Rooms/delete-comment";
export default {
  props: ["commentId", "isMainThread"],
  data() {
    return {
      loading: false
    };
  },
  components: {
    deleteCommentCard
  },
  methods: {
    ...mapActions("comment", ["deleteComment"]),

    deleteComment_() {
      this.loading = true;
      this.deleteComment({ commentId: this.commentId })
        .then(data => {
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.$toast.success("Comment deleted!");
        })
        .catch(err => {
          this.loading = true;
        });
    }
  }
};
</script>

<style scoped>
.delete-icon {
  mask: url("~assets/icons/delete-icon.svg");
  mask-size: cover;
  display: inline-block;
  background-color: #787e7a;
  width: 10px;
  height: 12px;
}
</style>