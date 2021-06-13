<template>
  <div>
    <botton @click="updateGames()">Refresh</botton>
    <div v-if="!loading">
      <GamePreview
        v-for="g in games.slice(0, showCunt)"
        :id="g.game_id"
        :hostTeam="g.home_team"
        :guestTeam="g.away_team"
        :date="g.game_date"
        :hour="g.game_hour"
        :key="g.game_id"
        :homeTeamID="g.home_team_id"
        :awayTeamID="g.away_team_id"
      ></GamePreview>
    </div>
    <h1 v-else> Loading data, please wait </h1>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview,
  },
  props:{
      showCunt: {
        type: Number,
        default: 50,
        required: false,
      },
  },
  data() {
    return {
      // games: this.$root.store.favGames,
      loading: false,
    };
  },
  computed:{
    games(){return this.$root.store.favGames;}
  },
  methods: {
    async updateGames() {
      try {
        this.axios.defaults.withCredentials=true;
        const response = await this.axios.get(
          "http://localhost:3000/users/FavoriteGames"
        );
        console.log("games data");
        console.log(response);
        this.axios.defaults.withCredentials=false;
        const gamesData = response.data;
        this.$root.store.favGames = [];
        this.$root.store.favGames.push(...gamesData);
        console.log(response);
      } catch (error) {
        console.log("error in update games");
        console.log(error);
      }
    },
  },
  mounted() {
    console.log("favorite games mounted");
    console.log(this.$root.store.favGames.length)
    if(this.$root.store.favGames.length ==0){
      this.$root.store.setFavGames();
      this.updateGames();
    }

  },
};
</script>

<style></style>
