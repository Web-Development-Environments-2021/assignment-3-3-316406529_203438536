<template>
  <div>
    <TeamPreview
      v-for="t in teams"
      :Team_id="t.team_id"
      :team_players="t.team_players"
      :team_games="t.team_games"
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
  data() {
    return {
      teams: {
        team_id: 2,
        team_players: [
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
        games: [
          {
            id: 25,
            hostTeam: "Maccabi Tel-Aviv",
            guestTeam: "Hapoel Beer-Sheva",
            date: "27/5/21",
            hour: "20:00",
          },
          {
            id: 39,
            hostTeam: "Hapoel Tel-Aviv",
            guestTeam: "Maccabi Haifa",
            date: "29/5/21",
            hour: "20:00",
          },
        ],
        team_coach: {
          id: 21,
          name: "sason",
        },
      },
    };
  },
  methods: {
    async updateTeams() {
      console.log("response");
      try {
        this.axios.defaults.withCredentials=true;
        const response = await this.axios.get(
          "http://localhost:3000/users/FavoriteTeams"
        );
        this.axios.defaults.withCredentials=false;
        const teams = response.data.games;
        this.teams = [];
        this.teams.push(...teams);
        console.log(response);
      } catch (error) {
        console.log("error in update teams");
        console.log(error);
      }
    },
  },
  mounted() {
    console.log("favorite teams mounted");
    this.updateTeams();
  },
};
</script>

<style></style>
