<template>
  <div class="league-preview">
    <div class="leage-info-card">
      <img id="league-img" src="../assets/superliga.png" />
      <b-card
        img-alt="Image"
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
        id="infor-card-context"
      >
        <b-card-title>{{ league_name }}</b-card-title>
        <b-card-text>
          Season: {{ current_season_name }}
          <br />
          Stage: {{ current_stage_name }}
          <b-button id="nextGame" @click="showNextGame()"
            >Next Game Coming</b-button
          >

          <br />
          <div id="next-game-div" v-if="pressedGame === true">
            <GamePreview
              :id="nextComingGame.game_id"
              :homeTeam="nextComingGame.home_team"
              :awayTeam="nextComingGame.away_team"
              :date="nextComingGame.game_date"
              :hour="nextComingGame.game_hour"
              :home_team_id="nextComingGame.home_team_id"
              :away_team_id="nextComingGame.away_team_id"
              :field="nextComingGame.field"
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
    //send get request to the server to get the league info
    const response = await this.axios.get(
      "http://localhost:3000/league/LeagueData"
    );
    console.log("league info gey");
    console.log(response.data[0]);
    this.setLeagueData(response.data[0]);
  },
};
</script>

<style>
.league-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  top: 10%;
  left: -150px;
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

#leage-info-card {
  top: 10px;
}

#league-img {
  height: 100px;
  width: 250px;
}
#next-game-div {
  position: absolute;
  top: 180px;
  left: -5px;
  width: 0;
  background-color: rgb(141, 207, 185);
}
#nextGame {
  margin-top: 15px;
}
</style>
