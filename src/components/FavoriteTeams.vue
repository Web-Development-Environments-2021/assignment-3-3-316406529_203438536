<template>
  <div>
    <div v-if="!isLoading">
      <button v-if="teams.length!=0" @click="updateTeams()">Refresh</button>
      <TeamPreview
        v-for="t in teams"
        :team_id="t.teamID"
        :team_name="t.name"
        :team_coach="t.coach_name"
        :key="t.team_id"
      ></TeamPreview>
    </div>
    <h1 v-else> Loading data, please wait </h1>
  </div>
</template>

<script>
import TeamPreview from "./TeamPreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    TeamPreview,
  },
  computed:{
    teams(){return this.$root.store.favTeams;},
    isLoading(){return this.loading;},
  },
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    async updateTeams() {
      try {
        this.axios.defaults.withCredentials=true;
        const response = await this.axios.get(
          "http://localhost:3000/users/FavoriteTeams"
        );
        this.loading = false;
        this.axios.defaults.withCredentials=false;
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
    this.$root.store.setFavTeams();
  },
  mounted() {
    console.log("favorite teams mounted");
    if(this.$root.store.favTeams.length ==0){
      this.$root.store.setFavTeams();
      this.updateTeams();
    }
    else{this.loading=false;}
  },
};
</script>

<style></style>
