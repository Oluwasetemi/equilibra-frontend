<template>
  <div
    class="modal fade"
    id="changeTopic"
    role="dialog"
    aria-labelledby="changeTopicLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="title border-bottom">
          <h4 class="text-center py-3 m-0">CHANGE TOPIC</h4>
        </div>
        <div class="p-4">
          <p class="current-topic text-center" v-if="!currentRoom.currentTopic || !currentRoom.currentTopic._id">
            This room has no topic.
            <br />Create a new topic to begin a conversation
          </p>
          <p class="current-topic text-center" v-else>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            is sed do eiusmod tempor inci did is unt ut labore et dolore magna aliqua um dolor sit ame.
          </p>
          <form class="new-topic" @submit.prevent="changeRoomTopic()">
            <div class="form-input">
              <input
                type="text"
                name="new-topic"
                id="new-topic"
                class="form-control p-3"
                placeholder="Enter new topic"
                v-model="payload.title"
              />
            </div>
            <div class="form-input">
              <textarea
                name="topic-desc"
                id="topic-desc"
                class="w-100 p-3"
                placeholder="Topic Description"
                v-model="payload.description"
              ></textarea>
            </div>
            <button
              class="d-flex green-btn justify-content-between align-items-center w-100 px-4 mt-4"
              type="submit"
              :disabled="loading"
            >
              <div class="spinner-grow text-success" role="status" v-if="loading">
                <span class="sr-only">Loading...</span>
              </div>
              <span>Change Topic</span>
              <img src="~/assets/icons/vote-button-icon.svg" alt />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import gql from "~/apollo/user/room";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  props: ["currentRoom", "hasTopic"],
  data() {
    return {
      loading: false,
      payload: {
        title: "",
        description: ""
      }
    };
  },
  validations: {
    payload: {
      title: {
        required,
        minLength: minLength(2)
      },
      description: {
        required,
        minLength: minLength(2)
      }
    }
  },
  computed: {
    ...mapGetters("auth", ["getToken"])
  },
  methods: {
    ...mapActions("topic", ["requestTopicChange"]),
    changeRoomTopic() {
      this.payload.roomId = this.currentRoom._id;
      this.loading = true;
      this.requestTopicChange(this.payload)
        .then(data => {
          this.loading = false;
          this.payload = {
            title: "",
            description: ""
          };
          $("#changeTopic").modal("toggle");
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    initiateVoteSubscription() {
      this.$apollo.addSmartSubscription("vote", {
        query: gql.vote,
        context: {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        },
        result({ data }) {
          this.$eventBus.$emit("showPopup", data.vote);
        }
      });
    }
  },
  mounted() {
    this.initiateVoteSubscription();
  }
};
</script>

<style scoped>
.modal-dialog {
  max-width: 482px !important;
  width: 100%;
}

form {
  font-weight: 100;
}

input.form-control {
  height: 54px;
  font-size: 16px;
  line-height: 18px;
  color: #666666;
  font-weight: 100;
}

h4 {
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: #07834e;
  font-weight: 700;
}

p.current-topic {
  font-size: 12px;
  color: #434343;
}

textarea {
  height: 160px;
  border: 1px solid #dadada;
  box-sizing: border-box;
  border-radius: 2px;
  font-size: 16px;
  line-height: 18px;
  color: #666666;
  font-weight: 100;
  resize: none;
}

.green-btn {
  background: #07834e;
  box-shadow: 2.7px 5.5px 13.8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  height: 64px;
  border: none;
}

button.close {
  position: absolute;
  right: 0;
  background: #dceee6;
  border-radius: 0px 4px 0px 0px;
  height: 34px;
  width: 40px;
}

.close span {
  color: #07834e;
  font-weight: 100;
}
</style>
