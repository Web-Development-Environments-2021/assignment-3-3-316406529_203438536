<template>
  <div>
    <h1>Favorite Players</h1>
    <PlayerShow
      v-for="p in players"
      :PlayerID="p.PlayerID"
      :fullname="p.fullname"
      :teamName="p.team"
      :teamID="p.team_id"
      :image_path="p.image_path"
      :PositionID="p.position_id"
      :key="p.PlayerID"
      :nationality ="p.nationality"
      :birthdate ="p.birthdate"
      :birthplace="p.birthplace"
      :height="p.height"
      :weight="p.weight"
      :playerPosition="p.playerPosition"
      :common_name="p.common_name"

    ></PlayerShow>
  </div>
</template>

<script>
import PlayerShow from "./PlayerShow.vue";
export default {
  name: "FavoritePlayers",
  components: {
    PlayerShow,
  },
  computed:{
    players(){return this.$root.store.favPlayers;}
  },
  methods: {
    async updatePlayers() {
      // console.log("response");
      try {
        this.axios.defaults.withCredentials=true;
        console.log(this.$root.store.username);
        const response = await this.axios.get(
          "http://localhost:3000/users/FavoritePlayers"
        );
        const players = response.data;
        this.axios.defaults.withCredentials=false;
        this.$root.store.favPlayers = [];
        this.$root.store.favPlayers.push(...players);
        console.log(response);
      } catch (error) {
        console.log("error in update players");
        console.log(error);
      }
    },
  },
  mounted() {
    console.log("favorite players mounted");
    this.$root.store.setFavPlayers();
    this.updatePlayers();
  },
};
</script>

<style></style>
