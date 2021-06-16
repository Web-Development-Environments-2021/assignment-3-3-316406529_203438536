<template>
  <div class="container">
    <h1 class="title">League managment page</h1>
    <b-button v-b-modal.addGame> Add Game </b-button>
    <b-button @click="getLeagueGames()">Refresh</b-button>
    <div id="showRes">
      <b-table
        v-if="items[0]"
        :items="items"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        sort-icon-left
        responsive="sm"
      >
        <template #cell(allData1)="data">
          <b-button
            v-if="isPased(data.value.game_date)"
            v-b-modal.addEvent
            @click="GameClick(data.value)"
            >Add Events</b-button
          >
          <b-button v-else disabled>Add Events</b-button>
        </template>
        <template #cell(allData2)="data">
          <b-button
            v-if="isPased(data.value.game_date)"
            v-b-modal.addScore
            @click="GameClick(data.value)"
            >Add Score</b-button
          >
          <b-button v-else disabled>Add Score</b-button>
        </template>
        <template #cell(home_team)="data">
          <a id="clickabble" @click="ClickTeam(data.value.home_team_id)">{{
            data.value.home_team
          }}</a>
        </template>
        <template #cell(away_team)="data">
          <a id="clickabble" @click="ClickTeam(data.value.away_team_id)">{{
            data.value.away_team
          }}</a>
        </template>
      </b-table>
      <h1 v-else>Loading Games</h1>
    </div>
    <b-modal hide-footer id="addGame" title="Add Game To Sysyem">
      <addGame id="addGame"></addGame>
    </b-modal>
    <b-modal hide-footer id="addEvent" title="Add Event To Game">
      <addEvent :game_id="GameClickID"></addEvent>
    </b-modal>
    <b-modal hide-footer id="addScore" title="Add Event To Game">
      <addScore :game_id="GameClickID"></addScore>
    </b-modal>
  </div>
</template>

<script>
import addGame from "../components/addGame.vue";
import addEvent from "../components/addGameEvent.vue";
import addScore from "../components/addGameScore.vue";
export default {
  data() {
    return {
      // LeagueGames: [],
      items: [],
      fields: [],
      GameClickID: 0,
      sortBy: "age",
      sortDesc: false,
    };
  },
  computed: {
    LeagueGames() {
      return this.$root.store.LeagueGames;
    },
  },
  components: {
    addGame,
    addEvent,
    addScore,
  },
  methods: {
    isPased(date) {
      let today = new Date();
      let Pdate = Date.parse(date);
      if (today >= Pdate) {
        return true;
      }
      return false;
    },
    async getLeagueGames() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          `http://localhost:3000/league/leagueGames`
        );
        if (response.status == 400) {
          console.log("no premission ban");
          return;
        }
        this.axios.defaults.withCredentials = true;
        this.$root.toast("league games", "Table data Loaded", "success");
        console.log(response);
        this.$root.store.LeagueGames = response.data;
        this.setTable();
      } catch (err) {
        console.log(err.response.data);
        this.$root.toast("league games", err.response.data, "fail");
      }
    },
    setTable() {
      this.items = this.LeagueGames.map((g) => {
        return {
          game_id: g.game_id,
          game_date: g.game_date.slice(0, 10),
          game_hour: g.game_hour.slice(11, 19),
          home_team: g,
          away_team: g,
          allData1: g,
          allData2: g,
          home_team_goal: g.home_team_goal,
          away_team_goal: g.away_team_goal,
          field: g.field,
          referee_name: g.referee_name,
        };
      });
      this.fields = [
        { key: "game_id", sortable: true },
        { key: "game_date", sortable: true },
        { key: "game_hour", sortable: true },
        { key: "referee_name", sortable: false },
        { key: "field", sortable: true },
        { key: "home_team", sortable: true },
        { key: "away_team", sortable: true },
        { key: "home_team_goal", sortable: false },
        { key: "away_team_goal", sortable: false },
        { key: "allData1", label: "Add Event", sortable: false },
        { key: "allData2", label: "Add Score", sortable: false },
      ];
    },
    GameClick(data) {
      console.log(data);
      this.GameClickID = data.game_id;
      console.log(this.GameClickID);
    },
    ClickTeam(id) {
      this.$router.push(`/TeamPage/:${id}`);
    },
  },
  created() {
    this.$root.store.setItem("LeagueGames", []);
  },
  async mounted() {
    console.log("enter League managment page");
    console.log(this.$root.store.LeagueGames.length);
    if (this.$root.store.LeagueGames.length == 0) {
      this.$root.store.setItem("LeagueGames", []);
      await this.getLeagueGames();
    } else {
      this.setTable();
    }
  },
};
</script>
<style>
.container {
  position: absolute;
  max-width: 80%;
  left: 10%;
  right: 10%;
  top: 15%;
  background-color: rgba(215, 237, 241, 0.685);
}
#clickabble:hover{
  font-weight: bold;
  cursor: pointer;
}
</style>
