<template>
  <div class="league-preview">
    <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-title>{{ leagueName }}</b-card-title>
      <b-card-text>
        Season: {{ season }}
        <br />
        Stage: {{ stage }}
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      leagueName: "superliga",
      season: "season",
      stage: "stage",
    };
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
