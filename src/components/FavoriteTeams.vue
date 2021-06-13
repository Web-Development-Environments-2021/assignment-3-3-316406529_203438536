<template>
  <div>
    <botton @click="updateTeams()">Refresh</botton>
    <TeamPreview
      v-for="t in teams"
      :team_id="t.teamID"
      :team_name="t.name"
      :team_coach="t.coach_name"
      :key="t.team_id"
    ></TeamPreview>
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
    teams(){return this.$root.store.favTeams;}
  },
  // data() {
  //   return {
  //     teams: {
  //       team_id: 2,
  //       team_players: [
  //         {
  //           PlayerID: 84658,
  //           fullname: "Jens Stage",
  //           teamName: "København",
  //           teamID: 85,
  //           photoPath:
  //             "https://cdn.sportmonks.com/images/soccer/players/18/84658.png",
  //           PositionID: "3",
  //         },
  //         {
  //           PlayerID: 846589,
  //           fullname: "Jens Stage",
  //           teamName: "København",
  //           teamID: 85,
  //           photoPath:
  //             "https://cdn.sportmonks.com/images/soccer/players/18/84658.png",
  //           PositionID: "3",
  //         },
  //       ],
  //       games: [
  //         {
  //           id: 25,
  //           hostTeam: "Maccabi Tel-Aviv",
  //           guestTeam: "Hapoel Beer-Sheva",
  //           date: "27/5/21",
  //           hour: "20:00",
  //         },
  //         {
  //           id: 39,
  //           hostTeam: "Hapoel Tel-Aviv",
  //           guestTeam: "Maccabi Haifa",
  //           date: "29/5/21",
  //           hour: "20:00",
  //         },
  //       ],
  //       team_coach: {
  //         id: 21,
  //         name: "sason",
  //       },
  //     },
  //   };
  // },
  methods: {
    async updateTeams() {
      try {
        this.axios.defaults.withCredentials=true;
        const response = await this.axios.get(
          "http://localhost:3000/users/FavoriteTeams"
        );
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
  mounted() {
    console.log("favorite teams mounted");
    if(this.$root.store.favTeams.length ==0){
      this.$root.store.setFavTeams();
      this.updateTeams();
    }
  },
};
</script>

<style></style>
