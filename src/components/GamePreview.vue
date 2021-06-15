<template>
  <div class="game-preview">
    <div :title="id" class="game-title"><b>Game Id:</b> {{ id }}</div>
    <ul class="game-content">
      <!-- <li @click="clickTeam(home_team_id)">Home team: {{ homeTeam }}</li> -->
      <router-link :to="`/TeamPage/:${this.home_team_id}`"
        >Home team: {{ homeTeam }}</router-link
      >
      <br />
      <!-- <li @click="clickTeam(away_team_id)">Away team: {{ awayTeam }}</li> -->
      <router-link :to="`/TeamPage/:${this.away_team_id}`"
        >Away team: {{ awayTeam }}</router-link
      >
      <li>date: {{ date }}</li>
      <li>time: {{ hour }}</li>
      <li>Game Field :{{ field }}</li>
    </ul>
    <b-button
      size="sm"
      id="addFavoriteGame"
      pill
      variant="outline-danger"
      @click="addGameToFavorites()"
      >Add to favorite</b-button
    >
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    homeTeam: {
      type: String,
      required: true,
    },
    awayTeam: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    home_team_id: {
      type: Number,
      require: true,
    },
    away_team_id: {
      type: Number,
      require: true,
    },
  },
  methods: {
    clickTeam(id) {
      this.$router.push(`/TeamPage/:${id}`);
    },
    async addGamesToFavorites() {
      try {
        this.$root.toast(
          "Games Page",
          "Adding favorite, please wait....",
          "success"
        );
        const Games = this.$route.params.id.replace(":", "");
        console.log(`adding Game ${Games}`);
        this.axios.defaults.withCredentials = true;
        const respond = await this.axios.post(
          "http://localhost:3000/users/FavoriteGames",
          { game_id: Games }
        );
        console.log(`data recived`);
        console.log(respond);
        this.axios.defaults.withCredentials = false;
        this.$root.toast(
          "Games Page",
          "The Games added successfuly",
          "success"
        );
      } catch (error) {
        console.log(console.error());
        this.$root.toast(
          "Games Page",
          "The Games added failed- duplication favorite Posible",
          "fail"
        );
      }
    },
  },
  mounted() {
    console.log("game preview mounted");
  },
};
</script>

<style>
div.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
  background-color: rgba(215, 237, 241, 0.616);
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}
</style>
