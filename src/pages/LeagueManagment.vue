<template>
  <div class="container">
    <h1>League managment page</h1>
    <b-button v-b-modal.addGame> Add Game </b-button>
    <div id="showRes">
      <b-table v-if="items[0]" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
        sort-icon-left responsive="sm">
        <template #cell(allData1)="data">
          <b-button v-b-modal.addEvent @click="GameClick(data.value)">Add Events</b-button>
        </template>
        <template #cell(allData2)="data">
          <b-button v-b-modal.addScore @click="GameClick(data.value)">Add Score</b-button>
        </template>
      </b-table>
      <h1 v-else>No Games</h1>
    </div>
      <b-modal hide-footer id="addGame" title="Add Game To Sysyem">
        <addGame id="addGame"></addGame>
      </b-modal>
      <b-modal hide-footer id="addEvent" title="Add Event To Game">
        <addEvent :game_id="GameClickID"></addEvent>
      </b-modal >
      <b-modal hide-footer id="addScore" title="Add Event To Game">
        <addScore :game_id="GameClickID"></addScore>
      </b-modal >
  </div>

</template>

<script>
import addGame from "../components/addGame.vue";
import addEvent from "../components/addGameEvent.vue";
import addScore from "../components/addGameScore.vue";
  export default {
    data(){
      return {
        LeagueGames: [
          {
    "game_id": 1,
    "game_date": "2021-07-31T00:00:00.000Z",
    "game_hour": "1970-01-01T20:30:00.000Z",
    "home_team": "AaB",
    "away_team": "Midtjylland",
    "home_team_id": 1020,
    "away_team_id": 939,
    "home_team_goal": null,
    "away_team_goal": null,
    "field": "Parken",
    "referee_name": "Alex Simovich"
  },
  {
    "game_id": 2,
    "game_date": "2021-09-14T00:00:00.000Z",
    "game_hour": "1970-01-01T21:00:00.000Z",
    "home_team": "AaB",
    "away_team": "København",
    "home_team_id": 1020,
    "away_team_id": 85,
    "home_team_goal": null,
    "away_team_goal": null,
    "field": "MCH Arena",
    "referee_name": "John Riddman"
  },
  {
    "game_id": 3,
    "game_date": "2021-03-20T00:00:00.000Z",
    "game_hour": "1970-01-01T20:30:00.000Z",
    "home_team": "OB",
    "away_team": "Midtjylland",
    "home_team_id": 1789,
    "away_team_id": 939,
    "home_team_goal": 2,
    "away_team_goal": 0,
    "field": "Lyngby Stadion",
    "referee_name": "Tom Jhonson "
  },
  {
    "game_id": 4,
    "game_date": "2021-01-20T00:00:00.000Z",
    "game_hour": "1970-01-01T21:00:00.000Z",
    "home_team": "Nordsjælland",
    "away_team": "Randers",
    "home_team_id": 2394,
    "away_team_id": 2356,
    "home_team_goal": 0,
    "away_team_goal": 1,
    "field": "Vejle Stadion",
    "referee_name": "Tom Jhonson "
  }
        ],
        items: [],
        fields: [],
        GameClickID: 0,
      }
    },
    components:{
      addGame,
      addEvent,
      addScore,
    },
    methods:{
      async getLeagueGames(){
        const response = await this.axios.get(
          `http://localhost:3000/league/leagueGames`,
        );
        if(response.status == 400){
            console.log("no premission ban");
            return;
        }
        console.log(response);
        this.LeagueGames = response.data;
      },
      setTable(){
        this.items = this.LeagueGames.map((g)=>{
          return{
              game_id: g.game_id,
              game_date: g.game_date,
              game_hour: g.game_hour,
              home_team: g.home_team,
              away_team: g.away_team,
              allData1: g,
              allData2: g,
              home_team_goal: g.home_team_goal,
              away_team_goal: g.away_team_goal,
              field: g.field,
              referee_name: g.referee_name,
          }
        });
        this.fields = [
          {key: 'game_id', sortable: true},
          {key: 'game_date', sortable: true},
          {key: 'game_hour', sortable: true},
          {key: 'referee_name', sortable: false},
          {key: 'field', sortable: true},
          {key: 'home_team', sortable: true},
          {key: 'away_team', sortable: true},
          {key: 'home_team_goal', sortable: false},
          {key: 'away_team_goal', sortable: false},
          {key: 'allData1',label: 'Add Event', sortable: false},
          {key: 'allData2', label: 'Add Score', sortable: false},


        ]
      },
      GameClick(data){
        console.log(data);
        this.GameClickID = data.game_id;
        console.log(this.GameClickID);
      }
    },
    mounted() {
      console.log("enter League managment page");
      // this.getLeagueGames();
      this.setTable();
    },
  }
</script>
