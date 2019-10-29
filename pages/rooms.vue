<template>
  <div class="container pr-0 px-0">
    <loginModal />
    <div class="px-md-3 px-0">
      <div class="row no-gutters flex-row flex-lg-nowrap justify-content-between">
        <div class="px-3 card-container d-lg-block d-none py-4 scrollable">
          <Card
            :imageURL="imageUrl2.imageUrl"
            :title="$route.params.id"
            link
            :localGovt="localGovt"
          />
          <aside class="pt-5">
            <div class="groups border border-bottom-0">
              <ul class="p-0 m-o">
                <li class="header font-weight-bold p-3 border-bottom">Groups</li>
                <div class="group-list">
                  <div class="text-center loader" v-if="loading">
                    <div class="spinner-border text-secondary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                  <a
                    v-else
                    href="#"
                    v-for="(room, i) in rooms"
                    :key="i"
                    :title="room.name | formatText"
                    @click="setRoom(room)"
                  >
                    <li
                      class="px-4 border-bottom d-flex align-items-center justify-content-between"
                      :class="{selected: currentRoom.slug == room.slug}"
                    >
                      <span class="room-name">{{room.name | formatText}}</span>
                      <div
                        class="join-status align-items-center justify-content-between"
                        @click="checkRoomStatus(room)"
                      >
                        <!-- this.myRooms.some(myRoom => myRoom._id == room._id) -->
                        <span>{{getMyRooms && getMyRooms.some(myRoom => myRoom._id == room._id) ? 'Leave' : 'Join'}}</span>
                        <span class="chat-icon"></span>
                      </div>
                    </li>
                  </a>
                </div>
              </ul>
            </div>
          </aside>
        </div>
        <nuxt-child :currentRoom="currentRoom" :isMyRoom="isMyRoom(currentRoom)" :key="key" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { roomType } from "~/static/js/constants";
import gql from "~/apollo/user/room";
import gqlTopic from "~/apollo/user/topic";
import imageUrl from "~/assets/images/judiciary_BG.svg";
import Card from "~/components/Forums/forum-card";
import loginModal from "~/components/Authentication/sign-up";
export default {
  layout: "greenNavOnly",
  validate({ route, query, redirect }) {
    if (!query.group) {
      redirect(`${route.path}?group=Vent-The-Steam`);
    }
    return true;
  },
  data() {
    return {
      imageUrl2: { imageUrl },
      roomType,
      loading: true,
      getMyRooms: [],
      currentRoom: { slug: "Vent-The-Steam", currentTopic: null },
      localGovt: "",
      key: 0
    };
  },
  components: {
    Card,
    loginModal
  },
  computed: {
    ...mapGetters("room", ["federalRooms", "stateRooms", "ongoingTopicChange"]),
    ...mapGetters("auth", ["isAuthenticated", "getToken"]),
    ...mapGetters("user", ["getUser"]),
    rooms() {
      debugger;
      return this.$route.query.state
        ? this.stateRooms[this.roomType[this.$route.params.id]]
        : this.federalRooms[this.roomType[this.$route.params.id]];
    }
  },
  filters: {
    formatText(val) {
      return val
        .split(" ")
        .map(word => {
          return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
        })
        .join(" ");
    }
  },
  methods: {
    ...mapActions("room", [
      "getFederalRooms",
      "getStateRooms",
      "joinRoom",
      "leaveRoom"
    ]),
    checkRoomStatus(room) {
      this.isMyRoom(room)
        ? this.leaveRoomForum(room)
        : this.joinRoomForum(room);
    },
    setRoom(room) {
      this.key += 1;
      this.currentRoom = room;
      this.$router.push({
        query: {
          group: room.slug,
          id: this.$route.query.id,
          state: this.$route.query.state,
          isOrigin: this.$route.query.isOrigin
        }
      });
    },
    getAllMyRooms() {
      this.$apollo.addSmartQuery("getMyRooms", {
        query: gql.getMyRooms,
        variables: { roomType: this.roomType[this.$route.params.id] },
        context: {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        }
      });
    },
    getFedRooms() {
      let self = this;
      this.getFederalRooms(this.roomType[self.$route.params.id])
        .then(data => {
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          const fedRooms = this.federalRooms[
            this.roomType[this.$route.params.id]
          ];
          this.currentRoom = fedRooms.find(
            room => room.slug == this.$route.query.group
          );
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getStateRooms_() {
      let self = this;
      const payload = {
        roomType: this.roomType[self.$route.params.id],
        isOrigin:
          this.$route.query.isOrigin == true ||
          this.$route.query.isOrigin == "true"
            ? true
            : false
      };
      this.getStateRooms(payload)
        .then(data => {
          this.loading = false;
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          const stateRooms = this.stateRooms[
            this.roomType[this.$route.params.id]
          ];
          this.currentRoom = stateRooms.find(
            room => room.slug == this.$route.query.group
          );
        })
        .catch(err => {
          this.loading = false;
        });
    },
    joinRoomForum(room) {
      if (!this.isAuthenticated) {
        $("#signUpModal").modal("show");
        return;
      }
      this.setRoom(room);
      this.joinRoom(this.currentRoom._id)
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          // this.subscribeToComments();
          this.$toast.success("You have now joined this conversation!");
          // this.subscribeToVote();
        })
        .catch(err => {});
    },
    leaveRoomForum(room) {
      this.setRoom(room);
      this.leaveRoom(this.currentRoom._id)
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            return;
          }
          this.$toast.success("You have now left the conversation!");
        })
        .catch(err => {});
    },
    isMyRoom(room) {
      if (!this.getMyRooms) {
        return false;
      }
      return this.getMyRooms.some(myRoom => myRoom._id == room._id);
    },
    initializeRooms() {
      if (this.isAuthenticated) {
        this.getAllMyRooms();
      }
      if (this.$route.query.state) {
        this.getStateRooms_();
        return;
      }
      this.getFedRooms();
    },
    fetchLGAs(stateID) {
      const self = this;
      this.$store
        .dispatch("localGovernments", {
          stateGovernmentID: stateID
        })
        .then(data => {
          if (data.graphQLErrors) {
            this.$toast.error(data.graphQLErrors[0].message);
            this.loadingLGA = false;
            return;
          }
          this.localGovt = this.getState(data, this.$route.query.id);
        })
        .catch(err => {});
    },
    getState(LGAS, id) {
      let lga = LGAS.find(lga => {
        return lga.id == id;
      });
      return lga ? lga.name : "";
    },
    listenForTopicChange() {
      this.$apollo.addSmartSubscription("topicChange", {
        query: gqlTopic.topicChange,
        context: {
          headers: {
            Authorization: `Bearer ${this.getToken}`
          }
        },
        result({ data }) {
          this.initializeRooms();
        }
      });
    }
  },
  mounted() {
    this.$eventBus.$on("topicChanged", () => {
      this.initializeRooms();
    });
    this.listenForTopicChange();

    if (this.$route.params.id == "LGA" && this.$route.query.id) {
      const stateID = this.$route.query.isOrigin
        ? this.getUser.stateOfOrigin
        : this.getUser.stateOfResidence;
      this.fetchLGAs(stateID);
    }
    this.initializeRooms();
  }
};
</script>

<style scoped>
.loader {
  padding: 10px;
  border-radius: 4px;
  border-bottom: solid 1px #dee2e6;
}

.join-status {
  background: white;
  color: #07834e;
  padding: 5px 13px;
  display: none;
  border: solid 1px #07834e;
  width: 80px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 13px;
}

li.selected .join-status {
  border: solid 1px white;
  display: inline-flex;
}

li.selected:hover > .join-status {
  display: inline-flex;
}

li:hover > .join-status {
  display: inline-flex;
}

li .join-status:hover {
  color: white;
  background: #07834e;
  border: solid 1px #07834e !important;
}

li .join-status:hover .chat-icon {
  background-color: white;
}

aside ul {
  overflow-y: scroll;
  max-height: calc(100vh - (80px + 3rem));
}

div.group-list {
  max-height: 550px;
  overflow-y: scroll;
}
a li {
  height: 55px;
}

a li:hover .room-name {
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.scrollable {
  overflow-y: scroll;
  max-height: calc(100vh - 80px);
}
/* Groups */
.groups {
  border-radius: 4px;
  color: #000000;
  background: white;
}

.groups .border-bottom:not(.selected) {
  border-color: #e7e7e7 !important;
}
.groups li.header {
  font-size: 16px;
}
.groups li:not(.header) {
  font-size: 15px;
  font-weight: 400;
}
.selected {
  background: #dceee6;
  /* border-left: solid 3px #07834e; */
  position: relative;
}

.selected:before {
  content: "";
  width: 3px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #07834e;
}

/* Groups end */
.border {
  border-color: #e7e7e7;
}
.actions {
  font-size: 12px;
}
.card-container {
  flex: 0 0 30%;
}
.forum-container {
  flex: 0 0 100%;
}
.forum-header {
  background-image: url("~assets/images/forum-header-BG.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
  height: 158px;
  color: white;
}

h4 {
  font-weight: 600;
  font-size: 18px;
}

p {
  font-size: 13px;
}

.comments p,
p,
span.user-handle {
  font-size: 14px;
}

span.time-posted {
  font-size: 12px;
  color: #50bc93;
}

span.username {
  font-size: 15px;
  color: #000000;
}

.comment-content {
  color: #181818;
}

input {
  height: 48px;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 2px;
}
button {
  background: #26b14f;
  border-radius: 2px;
  color: white;
  border: 0;
  height: 48px;
  width: 100%;
  max-width: 120px;
  /* padding: 0 5px; */
  border: none;
}

a {
  color: inherit;
  text-decoration: none;
}

.chat-icon {
  mask: url("~assets/icons/chat-icon.svg");
  mask-size: cover;
  display: inline-block;
  background-color: #07834e;
  width: 12.57px;
  height: 12px;
}

@media (min-width: 768px) {
  .forum-container {
    flex: 0 0 70%;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1400px !important;
  }
}
</style>
