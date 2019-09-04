<template>
  <div class="container pr-0 px-0">
    <loginModal />
    <div class="px-md-3 px-0">
      <div class="row no-gutters flex-row flex-lg-nowrap justify-content-between">
        <div class="px-3 card-container d-lg-block d-none py-4 scrollable">
          <Card :imageURL="imageUrl2.imageUrl" :title="$route.params.id" link />
          <aside class="pt-5">
            <div class="groups border border-bottom-0">
              <ul class="p-0 m-o">
                <li class="header font-weight-bold p-3 border-bottom">Groups</li>
                <div class="group-list">
                  <div class="text-center loader" v-if="loading">
                    <div class="spinner-border text-light" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                  <a
                    v-else
                    href="#"
                    v-for="(room, i) in federalRooms[roomType[$route.params.id]]"
                    :key="i"
                    :title="room.name"
                    @click="setRoom(room)"
                  >
                    <li
                      class="px-4 border-bottom d-flex align-items-center justify-content-between"
                      :class="{selected: currentRoom.slug == room.slug}"
                    >
                      <span>{{room.name}}</span>
                      <div
                        class="join-status d-inline-flex align-items-center justify-content-between"
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
        <nuxt-child :currentRoom="currentRoom" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { roomType } from "~/static/js/constants";
import gql from "~/apollo/user/room";
import imageUrl from "~/assets/images/judiciary_BG.svg";
import Card from "~/components/Forums/forum-card";
import loginModal from "~/components/Authentication/sign-up";
export default {
  layout: "greenNavOnly",
  data() {
    return {
      imageUrl2: { imageUrl },
      roomType,
      loading: true,
      getMyRooms: [],
      currentRoom: { slug: "Vent-The-Steam", currentTopic: null }
    };
  },
  components: {
    Card,
    loginModal
  },
  computed: {
    ...mapGetters("room", ["federalRooms"]),
    ...mapGetters("auth", ["isAuthenticated", "getToken"])
  },
  methods: {
    ...mapActions("room", ["getFederalRooms", "joinRoom", "leaveRoom"]),
    checkRoomStatus(room) {
      this.isMyRoom(room)
        ? this.leaveRoomForum(room)
        : this.joinRoomForum(room);
    },
    setRoom(room) {
      this.currentRoom = room;
      this.$router.push({ query: { group: room.slug } });
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
          this.$toast.success("You have successfully joined the conversation!");
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
        return;
      }
      return this.getMyRooms.some(myRoom => myRoom._id == room._id);
    }
  },
  mounted() {
    if (!this.$route.query.group) {
      this.$router.push({ query: { group: "Vent-The-Steam" } });
    }
    this.getFedRooms();
    if (this.isAuthenticated) {
      this.getAllMyRooms();
    }
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
  opacity: 0;
  border: solid 1px #07834e;
  width: 80px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 13px;
}

li.selected .join-status {
  border: solid 1px white;
  opacity: 1;
}

li.selected:hover > .join-status {
  opacity: 1;
}

li:hover > .join-status {
  opacity: 1;
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
