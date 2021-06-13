<template>
  <div class="league-preview">
    <div>
      <b-card
        img-alt="Image"
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-title>{{ league_name }}</b-card-title>
        <b-card-text>
          Season: {{ current_season_name }}
          <br />
          Stage: {{ current_stage_name }}
          <h5 @click="showNextGame()">Next Game Coming</h5>

          <bt />
          <div v-if="pressedGame === true">
            <GamePreview
              :id="nextComingGame.game_id"
              :homeTeam="nextComingGame.home_team"
              :awayTeam="nextComingGame.away_team"
              :date="nextComingGame.game_date"
              :hour="nextComingGame.game_hour"
              :home_team_id="nextComingGame.home_team_id"
              :away_team_id="nextComingGame.away_team_id"
            ></GamePreview>
          </div>
        </b-card-text>
      </b-card>
    </div>
    <div></div>
  </div>
</template>

<script>
import axios from "axios";
import GamePreview from "./GamePreview.vue";
export default {
  name: "LeagueInfo",
  components: {
    GamePreview,
  },
  data() {
    return {
      league_name: "loading",
      current_stage_name: "loading",
      current_season_name: "loading",
      nextComingGame: "loading",
      pressedGame: false,
    };
  },
  methods: {
    setLeagueData(data) {
      this.league_name = data.league_name;
      this.current_season_name = data.current_season_name;
      this.current_stage_name = data.current_stage_name;
      this.nextComingGame = data.nextComingGame;
    },
    showNextGame() {
      if (this.pressedGame === false) {
        this.pressedGame = true;
      } else {
        this.pressedGame = false;
      }
    },
  },
  async mounted() {
    const response = await this.axios.get(
      "http://localhost:3000/league/LeagueData"
    );
    console.log("league info gey");
    console.log(response.data[0]);
    this.setLeagueData(response.data[0]);
  },
  // async mounted() {
  //   const respond = await axios.get("http://127.0.0.1:3000/league/LeagueData");
  //   this.leagueName = respond.date[0].league_name;
  //   this.season = respond.data[0].current_season_name;
  //   this.stage = respond.data[0].current_stage_name;
  // },
};
</script>

<style>
.league-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: rgb(44, 89, 116);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}
</style>
