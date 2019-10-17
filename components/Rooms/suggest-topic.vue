<template>
  <div
    class="modal fade"
    id="suggestTopic"
    role="dialog"
    aria-labelledby="suggestTopicLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="title border-bottom">
          <h4 class="text-center py-3 m-0">SUGGEST NEW TOPIC</h4>
        </div>
        <div class="p-4">
          <p class="current-topic text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            is sed do eiusmod tempor inci did is unt ut labore et dolore magna aliqua um dolor sit ame.
          </p>
          <form class="new-topic" @submit.prevent="suggestRoomTopic()">
            <div class="form-input">
              <input
                type="text"
                name="new-topic-suggestion"
                id="new-topic-suggestion"
                class="form-control p-3"
                placeholder="Enter new topic"
                v-model="payload.title"
              />
            </div>
            <div class="form-input">
              <textarea
                name="topic-suggestion-desc"
                id="topic-suggestion-desc"
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
              <span>Suggest Topic</span>
              <img src="~/assets/icons/vote-button-icon.svg" alt />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["currentRoom"],
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
  methods: {
    ...mapActions("topic", ["suggestTopic"]),
    suggestRoomTopic() {
      this.loading = true;
      this.suggestTopic(this.payload)
        .then(data => {
          this.loading = false;
          this.payload = {
            title: "",
            description: ""
          };
          $("#suggestTopic").modal("hide");
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.$toast.success("Your suggestion has been registered");
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>


<style scoped>
.modal-content {
  max-width: 482px;
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

button {
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
