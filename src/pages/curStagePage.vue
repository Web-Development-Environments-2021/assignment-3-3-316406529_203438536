<template>
  <div class="container">
    <h1>Currect Stage Page</h1>
    <div id="showRes">
      <div v-if="!isBusy">
        <h2>Future Games</h2>
        <gamesTableShow
          :Items="FutureItems"
          :Fields="FutureFields"
        ></gamesTableShow>
      </div>
      <h1 v-else :busy="true">loading Data, Please wait</h1>
      <!-- <b-table :items="FutureItems" :busy="isBusy" :fields="FutureFields" 
      :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sort-icon-left responsive="sm">
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      </b-table> -->
      <div v-if="!isBusy">
        <h2>Past Games</h2>
        <gamesTableShow
          :Items="PastItems"
          :Fields="PastFields"
        ></gamesTableShow>
      </div>
      <!-- <b-table :items="PastItems" :busy="isBusy" :fields="PastFields" sort-icon-left responsive="sm">
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
      </template>
        <template #cell(eventSchedule)="data">
          <b-button v-b-modal.gameEvents @click="CurEventData(data.value)">Game Events List</b-button>
        </template>
      </b-table>
    </div>
      <b-modal size="lg" hide-footer id="gameEvents" title="Game Enets">
        <gameEvents id="gameEvents" :EventsList="curEventsList"></gameEvents>
      </b-modal> -->
    </div>
  </div>
</template>

<script>
// import gameEvents from "../components/gameEventsShow.vue";
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
    // gameEvents,
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
      ];
    },
    setPastTable(data) {
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
