<template>
  <div class="container">
    <h1 align="center">{{ info.fullname }}</h1>
    <div id="player-info-div">
      <b-img fluid :src="info.image_path"></b-img>
      <div>
        <router-link :to="`/TeamPage/:${this.info.team_id}`">
          Current Team Name: {{ info.team_name }}</router-link
        >
        <h6>Player position: {{ info.position_id }}</h6>
        <h6>Common name: {{ info.common_name }}</h6>
        <h6>Birthdate: {{ info.birthdate }}</h6>
        <h6>Birth country: {{ info.birthcountry }}</h6>
        <h6>Nationality: {{ info.nationality }}</h6>
        <h6 v-if="info.height != null">Height: {{ info.height }}</h6>
        <h6 v-if="info.weight != null">Weight: {{ info.weight }}</h6>
      </div>
      <div>
        <b-button
          v-if="addButton"
          size="md"
          id="addFavoritePlayer"
          pill
          variant="outline-danger"
          @click="addPlayerToFavorites()"
          >Add to favorite</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayerPageComponent",
  components: {},
  data() {
    return {
      info: null,
    };
  },
  computed: {
    addButton() {
      if (this.$root.store.username) {
        return true;
      }
      return false;
    },
  },
  async mounted() {
    this.$root.toast(
      "Players Page",
      "Loading data, please wait....",
      "success"
    );
    console.log("enter specific player page");
    const player_id = this.$route.params.id.replace(":", "");
    const result = await axios.get(
      `http://127.0.0.1:3000/players/playerDetails/${player_id}`
    );
    console.log(result);
    this.info = result.data;
  },
  methods: {
    async addPlayerToFavorites() {
      //the function add player to user favorites players
      try {
        this.$root.toast(
          "Players Page",
          "Adding favorite, please wait....",
          "success"
        );
        const player_id = this.$route.params.id.replace(":", "");
        console.log(`adding player ${player_id}`);
        this.axios.defaults.withCredentials = true;
        const respond = await this.axios.post(
          "http://localhost:3000/users/FavoritePlayers",
          { playerId: player_id }
        );
        console.log(`data recived`);
        console.log(respond);
        this.axios.defaults.withCredentials = false;
        this.$root.toast(
          "Players Page",
          "The player added successfuly",
          "success"
        );
      } catch (error) {
        console.log(console.error());
        this.$root.toast("Players Page", error.respond.massage, "fail");
      }
    },
  },
};
</script>
<style>
.container {
  background-color: rgba(215, 237, 241, 0.616);
}
#player-info-div {
  position: relative;
  left: 40%;
  top: 13%;
}
</style>
