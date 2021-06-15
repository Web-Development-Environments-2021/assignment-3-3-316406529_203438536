<template>
  <div class="container-fav-games">
    <h1 class="title">My Favorite Games</h1>
    <div v-if="!isLoading">
      <b-button v-if="games.length != 0" @click="updateGames()"
        >Refresh</b-button
      >
      <br />
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
        :key="g.game_id"
      ></GamePreview>
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
    console.log(this.$root.store.favGames.length);
    if (this.$root.store.favGames.length == 0) {
      this.$root.store.setItem("favGames", []);
      this.updateGames();
    } else {
      this.loading = false;
    }
  },
};
</script>

<style>
.container-fav-games {
  position: relative;
  background-color: rgba(215, 237, 241, 0.61);
}
</style>
