<template>
  <div>
    <GamePreview
      v-for="g in games.slice(0, showCunt)"
      :id="g.id"
      :hostTeam="g.hostTeam"
      :guestTeam="g.guestTeam"
      :date="g.date"
      :hour="g.hour"
      :key="g.id"
      :homeTeamID="g.home_team_id"
      :awayTeamID="g.away_team_id"
    ></GamePreview>
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
        required: true,
      },
  },
  data() {
    return {
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
    };
  },
  methods: {
    async updateGames() {
      console.log("response");
      try {
        this.axios.defaults.withCredentials=true;
        const response = await this.axios.get(
          "http://localhost:3000/users/FavoriteGames"
        );
        this.axios.defaults.withCredentials=false;
        const games = response.data.games;
        this.games = [];
        this.games.push(...games);
        console.log(response);
      } catch (error) {
        console.log("error in update games");
        console.log(error);
      }
    },
  },
  mounted() {
    console.log("favorite games mounted");
    this.updateGames();
  },
};
</script>

<style></style>
