<template>
  <div>
    <h1>Favorite Players</h1>
    <PlayerShow
      v-for="p in players"
      :PlayerID="p.PlayerID"
      :fullname="p.fullname"
      :teamName="p.teamName"
      :teamID="p.teamID"
      :photoPath="p.photoPath"
      :PositionID="p.PositionID"
      :key="p.PlayerID"
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
  data() {
    return {
      players: [
        {
          PlayerID: 84658,
          fullname: "Jens Stage",
          teamName: "København",
          teamID: 85,
          photoPath:
            "https://cdn.sportmonks.com/images/soccer/players/18/84658.png",
          PositionID: "3",
        },
        {
          PlayerID: 846589,
          fullname: "Jens Stage",
          teamName: "København",
          teamID: 85,
          photoPath:
            "https://cdn.sportmonks.com/images/soccer/players/18/84658.png",
          PositionID: "3",
        },
      ],
    };
  },
  methods: {
    async updatePlayers() {
      console.log("response");
      try {
        axios.defaults.withCradentials=true;
        console.log(this.$root.store.username);
        const response = await this.axios.get(
          "http://localhost:3000/users/FavoritePlayers"
        );
        const players = response.data.players;
        axios.defaults.withCradentials=false;
        this.players = [];
        this.players.push(...players);
        console.log(response);
      } catch (error) {
        console.log("error in update players");
        console.log(error);
      }
    },
  },
  mounted() {
    console.log("favorite players mounted");
    this.updatePlayers();
  },
};
</script>

<style></style>
