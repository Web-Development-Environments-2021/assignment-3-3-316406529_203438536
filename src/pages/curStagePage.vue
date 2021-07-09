<template>
  <div class="container">
    <h1 class="title">Currect Stage Page</h1>
    <div id="showRes">
      <div v-if="!isBusy">
        <h2>Future Games</h2>
        <gamesTableShow
          :Items="FutureItems"
          :Fields="FutureFields"
        ></gamesTableShow>
      </div>
      <h1 v-else :busy="true">loading Data, Please wait</h1>
      <div v-if="!isBusy">
        <h2>Past Games</h2>
        <gamesTableShow
          :Items="PastItems"
          :Fields="PastFields"
        ></gamesTableShow>
      </div>
    </div>
  </div>
</template>

<script>
import gamesTableShow from "../components/GamesTableShow.vue";

export default {
  data() {
    return {
      stagePastGames: [],
      stageFutureGames: [],
      FutureItems: [],
      FutureFields: [],
      PastItems: [],
      PastFields: [],
      curEventsList: [],
      sortBy: "age",
      sortDesc: false,
      isBusy: true,
    };
  },
  components: {
    gamesTableShow,
  },
  methods: {
    async getStageGames() {
      const response = await this.axios.get(
        `http://localhost:3000/league/currentStageDetails`
      );
      if (response.status == 400) {
        console.log("no premission, ban");
        return;
      }
      console.log(response);
      return response.data;
    },
    setTables(data) {
      this.setFutureTable(data.futureGamesList);
      this.setPastTable(data.pastGamesList);
    },
    setFutureTable(data) {
      //set future games table
      this.FutureItems = data.map((g) => {
        return {
          game_id: g.game_id,
          game_date: g.game_date,
          game_hour: g.game_hour,
          home_team: g,
          away_team: g,
          home_team_id: g.home_team_id,
          away_team_id: g.away_team_id,
          field: g.field,
          referee_name: g.referee_name,
          add_to_favorite: g.game_id,
        };
      });
      this.FutureFields = [
        { key: "game_id", sortable: true },
        { key: "game_date", sortable: true },
        { key: "game_hour", sortable: true },
        { key: "referee_name", sortable: false },
        { key: "field", sortable: true },
        { key: "home_team", sortable: true },
        { key: "away_team", sortable: true },
        { key: "add_to_favorite", sortable: false },
      ];
    },
    setPastTable(data) {
      //set the table for the past games table
      this.PastItems = data.map((g) => {
        return {
          game_id: g.game_id,
          game_date: g.game_date,
          game_hour: g.game_hour,
          home_team: g,
          away_team: g,
          home_team_goal: g.home_team_goal,
          away_team_goal: g.away_team_goal,
          field: g.field,
          referee_name: g.referee_name,
          eventSchedule: g.eventSchedule,
        };
      });
      this.PastFields = [
        { key: "game_id", sortable: true },
        { key: "game_date", sortable: true },
        { key: "game_hour", sortable: true },
        { key: "referee_name", sortable: false },
        { key: "field", sortable: true },
        { key: "home_team", sortable: true },
        { key: "away_team", sortable: true },
        { key: "home_team_goal", sortable: false },
        { key: "away_team_goal", sortable: false },
        { key: "eventSchedule", label: "Game events", sortable: false },
      ];
    },
    CurEventData(data) {
      console.log(data);
      this.curEventsList = data;
      console.log("set event data");
      console.log(this.curEventsList);
    },
  },
  async mounted() {
    console.log("enter League managment page");
    const data = await this.getStageGames();
    this.setTables(data);
    this.isBusy = false;
  },
};
</script>
<style scoped>
div.container {
  background-color: rgba(215, 237, 241, 0.61);
}
</style>
