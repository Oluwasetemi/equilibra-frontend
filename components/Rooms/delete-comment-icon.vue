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
      <img src="~/assets/icons/delete-icon.svg" alt />
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
  props: ["commentId"],
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