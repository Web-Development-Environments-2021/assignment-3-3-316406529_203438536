<template>
  <div class="container">
    <h1 class="title">My Favorite Games</h1>
    <div v-if="!isLoading">
      <b-button @click="updateGames()">Refresh</b-button>
      <br />
      <div v-if="games.length != 0">
        <GamePreview
          v-for="g in games.slice(0, showCunt)"
          :id="g.game_id"
          :homeTeam="g.home_team"
          :awayTeam="g.away_team"
          :date="g.game_date"
          :hour="g.game_hour"
          :home_team_id="g.home_team_id"
          :away_team_id="g.away_team_id"
          :field="g.field"
          :addButton="false"
          :key="g.game_id"
        ></GamePreview>
      </div>
      <h3 v-else>There is No Favorite Games</h3>
    </div>
    <h1 v-else>Loading data, please wait</h1>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview,
  },
  props: {
    showCunt: {
      type: Number,
      default: 50,
      required: false,
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    games() {
      return this.$root.store.favGames;
    },
    isLoading() {
      return this.loading;
    },
  },
  methods: {
    async updateGames() {
      //the function send get request to the server to get the favorite games of user
      //and store in shared data for reuse
      try {
        this.$root.toast(
          "Favorite Players",
          "System Refrashing, please wait....",
          "success"
        );
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/users/FavoriteGames"
        );
        this.loading = false;
        console.log("games data");
        console.log(response);
        this.axios.defaults.withCredentials = false;
        const gamesData = response.data;
        //store in shared data
        this.$root.store.favGames = [];
        this.$root.store.favGames.push(...gamesData);
        console.log(response);
      } catch (error) {
        console.log("error in update games");
        console.log(error);
      }
    },
  },
  created() {
    this.$root.store.setItem("favGames", []);
  },
  mounted() {
    console.log("favorite games mounted");
    //if not in shared data - set the favorite games and update user fav. games
    if (!this.$root.store.favGames || this.$root.store.favGames.length == 0) {
      this.$root.store.setItem("favGames", []);
      this.updateGames();
    } else {
      this.loading = false;
    }
  },
};
</script>

<style>
.container {
  position: relative;
}
/* .container-fav-games {
  background-color: rgba(215, 237, 241, 0.616);
  position: relative;
  width: 90%;
  top: 10%;
  left: 5%;
} */
</style>
