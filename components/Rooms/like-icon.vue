<template>
  <a
    href="#"
    class="likes"
    data-toggle="tooltip"
    title="Like"
    @click="liked ? UnlikeComment(): LikeComment()"
  >
    <img src="~/assets/icons/like-icon-outline.svg" alt v-if="!liked" />
    <img src="~/assets/icons/like-icon-red-filled.svg" alt v-else />
    <span class="px-1">{{likes}}</span>
  </a>
</template>


<script>
import { mapActions } from "vuex";
export default {
  props: ["commentId", "liked", "likes"],
  methods: {
    ...mapActions("comment", ["likeComment", "unLikeComment"]),
    LikeComment() {
      this.likeComment({ commentId: this.commentId })
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
        //   this.$eventBus("reRender");
        })
        .catch(err => {});
    },
    UnlikeComment() {
      this.unLikeComment({ commentId: this.commentId })
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
        //   this.$eventBus.$emit("reRender");
        })
        .catch(err => {});
    }
  }
};
</script>