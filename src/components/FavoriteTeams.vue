<template>
  <div class="container">
    <h1 class="title">My Favorite Teams</h1>
    <b-button @click="updateTeams()">Refresh</b-button>
    <div v-if="!isLoading">
      <div v-if="teams.length != 0">
        <TeamPreview
          v-for="t in teams"
          :team_id="t.teamID"
          :team_name="t.name"
          :team_coach="t.coach_name"
          :team_photo="t.logo_path"
          :founded="t.founded"
          :national_team="t.nationa_team"
          :county_name="county_name"
          :key="t.teamID"
        ></TeamPreview>
      </div>
      <h3 v-else>There is No Favorite Players</h3>
    </div>
    <h1 v-else>Loading data, please wait</h1>
  </div>
</template>

<script>
import TeamPreview from "./TeamPreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    TeamPreview,
  },
  computed: {
    teams() {
      return this.$root.store.favTeams;
    },
    isLoading() {
      return this.loading;
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    async updateTeams() {
      try {
        this.$root.toast(
          "Favorite Players",
          "System Refrashing, please wait....",
          "success"
        );
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/users/FavoriteTeams"
        );
        this.loading = false;
        this.axios.defaults.withCredentials = false;
        const teams = response.data;
        this.$root.store.favTeams = [];
        this.$root.store.favTeams.push(...teams);
        console.log(response);
      } catch (error) {
        console.log("error in update teams");
        console.log(error);
      }
    },
  },
  created() {
    this.$root.store.setItem("favTeams", []);
  },
  mounted() {
    console.log("favorite teams mounted");
    if (this.$root.store.favTeams.length == 0) {
      this.$root.store.setItem("favTeams", []);
      this.updateTeams();
    } else {
      this.loading = false;
    }
  },
};
</script>

<style>
.container {
  background-color: rgba(215, 237, 241, 0.616);
  position: relative;
  width: 90%;
  top: 10%;
  left: 3%;
  /* background-color: rgba(215, 237, 241, 0.616);
  position: absolute;
  top: 10%;
  left: 5%; */
}
</style>
