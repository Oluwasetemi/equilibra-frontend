<template>
  <div
    class="modal fade"
    id="joinRoomModal"
    role="dialog"
    aria-labelledby="joinRoomModalLabel"
    aria-hidden="true"
  >
  
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content mx-auto">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="title d-flex align-items-center mb-4">
          <span class="caution-icon"></span>
          <p class="inline-block m-0 note px-4">Only room members can post comments in a room.</p>
        </div>
        <p class="text-center">Do you want to join this room?</p>
        <div class="buttons d-flex justify-content-between">
          <button
            class="join d-flex justify-content-center align-items-center"
            @click="joinRoomForum()"
            :disabled="loading"
          >
            <div class="spinner-grow text-success" v-if="loading"></div>
            <span>Join</span>
          </button>
          <button class="cancel" @click="closeModal()">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import gql from '~/apollo/user/topic'
export default {
  props: ["roomId"],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions("room", ["joinRoom"]),
    joinRoomForum() {
      $("#joinRoomModal").modal({
        backdrop: "static",
        keyboard: false
      });
      this.loading = true;
      this.joinRoom(this.roomId)
        .then(data => {
          this.loading = false;
          this.closeModal();
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.$emit('joinedRoom')
          //subscribe to vote

          this.$toast.success("You have now joined this conversation!");
        })
        .catch(err => {
          this.loading = false;
        });
    },
    closeModal() {
      $("#joinRoomModal").modal("hide");
    }
  }
};
</script>

<style scoped>
.modal-content {
  border: none;
  width: 400px;
  background: white;
  padding: 30px;
  border: 1px solid rgba(222, 225, 229, 0.5);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

p.note {
  font-size: 18px;
  letter-spacing: -0.4px;
  color: #091f0e;
  font-weight: 400;
}

p {
  font-size: 16px;
  letter-spacing: -0.4px;
  color: #737373;
  line-height: 1.3em;
}

button {
  border-radius: 2px;
  padding: 4.5px;
  font-size: 14px;
  font-weight: 100;
  width: 45%;
}

button.join {
  border: 1px solid #07834e;
  background: #07834e;
  color: white;
}

button.cancel {
  border: 1px solid #e7e7e7;
  color: #737373;
}

button.close {
  position: absolute;
  right: 0;
  top: 0;
  height: 34px;
  width: 40px;
}

.close span {
  color: #000000;
  font-weight: 100;
  font-size: 20px;
}

.caution-icon {
  mask: url("~assets/icons/caution-icon.svg");
  mask-size: cover;
  display: inline-block;
  background-color: #07834e;
  width: 55px;
  height: 34px;
}
</style>
