<template>
  <div class="container">
    <h1 align="center">{{ info.fullname }}</h1>
    <div id="player-info-div">
      <!-- <img :src="image_path" /> -->
      <b-img fluid :src="info.image_path"></b-img>
      <div>
        <router-link :to="`/TeamPage/:${this.info.team_id}`">
          Current Name: {{ info.team_name }}</router-link>
        <h6>Player position: {{ info.position_id }}</h6>
        <h6>Common name: {{ info.common_name }}</h6>
        <h6>Birthdate: {{ info.birthdate }}</h6>
        <h6>Birth country: {{ info.birthcountry }}</h6>
        <h6>Nationality: {{ info.nationality }}</h6>
        <h6 v-if="info.height != null">Height: {{ info.height }}</h6>
        <h6 v-if="info.weight != null">Weight: {{ info.weight }}</h6>
      </div>
      <div>
        <b-button v-if="addButton"
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
// import { defineComponent } from '@vue/composition-api'
// import PlayerShow from "../components/PlayerShow.vue";
export default {
  name: "PlayerPageComponent",
  components: {},
  data() {
    return {
      info: null,
    };
    // return {
    //   fullname: "Stephan Maigaard Andersen",
    //   image_path:
    //     "https://cdn.sportmonks.com/images/soccer/players/2/26722.png",
    //   common_name: "S. Andersen",
    //   position_id: 1,
    //   nationality: "Denmark",
    //   height: "190 cm",
    //   birthcountry: "Denmark",
    //   birthdate: "26/11/1981",
    //   team_name: "København",
    //   team_id: 85,
    //   weight: "80 kg",
    // };
  },
  computed:{
    addButton(){
      if(this.$root.store.username){
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
        this.$root.toast(
          "Players Page",
          "The player added failed- duplication favorite Posible",
          "fail"
        );
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
  /* background-color: rgba(215, 237, 241, 0.616); */
}
</style>
