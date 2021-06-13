<template>
  <div class="container">
    <h1 align="center">{{ info.fullname }}</h1>
    <div>
      <!-- <img :src="image_path" /> -->
      <b-img fluid :src="info.image_path"></b-img>
      <ul>
        <li>Current team: {{ info.team_name }}</li>
        <li>Player position: {{ info.position_id }}</li>
        <li>Common name: {{ info.common_name }}</li>
        <li>Birthdate: {{ info.birthdate }}</li>
        <li>Birth country: {{ info.birthcountry }}</li>
        <li>Nationality: {{ info.nationality }}</li>
        <li v-if="info.height != null">Height: {{ info.height }}</li>
        <li v-if="info.weight != null">Weight: {{ info.weight }}</li>
      </ul>
      <div>
        <b-button
          size="lg"
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
  async mounted() {
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
      const player_id = this.$route.params.id.replace(":", "");
      const respond = await axios.post(
        "http://127.0.0.1:3000/users/FavoritePlayers",
        { playerId: player_id }
      );
    },
  },
};
</script>
