<template>
  <div class="container">
    <div v-if="!isLoading">
      <b-button @click="updatePlayers()">Refresh</b-button>
      <h1 class="title">My Favorite Players</h1>
      <div v-if="hasData">
        <PlayerShow
          v-for="p in players"
          :PlayerID="p.PlayerID"
          :fullname="p.fullname"
          :teamName="p.team"
          :teamID="p.team_id"
          :image_path="p.image_path"
          :PositionID="p.position_id"
          :key="p.PlayerID"
          :nationality="p.nationality"
          :birthdate="p.birthdate"
          :birthplace="p.birthplace"
          :height="p.height"
          :weight="p.weight"
          :playerPosition="p.playerPosition"
          :common_name="p.common_name"
        ></PlayerShow>
      </div>
      <h1 v-else>There is No Favorite Players</h1>
    </div>
    <h1 v-else>Loading data, please wait</h1>
  </div>
</template>

<script>
import PlayerShow from "./PlayerShow.vue";
export default {
  name: "FavoritePlayers",
  components: {
    PlayerShow,
  },
  date() {
    return {
      loading: true,
    };
  },
  computed: {
    players() {
      return this.$root.store.favPlayers;
    },
    isLoading() {
      return this.loading;
    },
    hasData() {
      if (this.players[0].PlayerID) {
        return true;
      }
      return false;
    },
  },
  methods: {
    async updatePlayers() {
      // console.log("response");
      try {
        this.$root.toast(
          "Favorite Players",
          "System Refrashing, please wait....",
          "success"
        );
        this.axios.defaults.withCredentials = true;
        console.log(this.$root.store.username);
        const response = await this.axios.get(
          "http://localhost:3000/users/FavoritePlayers"
        );
        this.loading = false;
        const players = response.data;
        this.axios.defaults.withCredentials = false;
        this.$root.store.favPlayers = [];
        this.$root.store.favPlayers.push(...players);
        console.log(response);
      } catch (error) {
        console.log("error in update players");
        console.log(error);
      }
    },
  },
  created() {
    this.$root.store.setItem("favPlayers", []);
  },
  async mounted() {
    console.log("favorite players mounted");
    if (this.$root.store.favPlayers.length == 0) {
      await this.$root.store.setItem("favPlayers", []);
      this.updatePlayers();
    } else {
      this.loading = false;
    }
  },
};
</script>

<style></style>
