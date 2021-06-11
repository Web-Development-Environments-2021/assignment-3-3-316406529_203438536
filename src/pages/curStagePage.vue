<template>
  <div class="container">
    <h1>Currect Stage Page</h1>
    <div id="showRes">
      <h2>Future Games</h2>
      <b-table :items="FutureItems" :fields="FutureFields" 
      :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sort-icon-left responsive="sm">
        <template #cell(eventSchedule)="data">
          <b-button v-b-modal.gameEvents @click="CurEventData(data.value)">Game Events List</b-button>
        </template>
      </b-table>
      <h2>Past Games</h2>
      <b-table :items="PastItems" :fields="PastFields" sort-icon-left responsive="sm">
      </b-table>
    </div>
      <b-modal hide-footer id="gameEvents" title="Game Enets">
        <gameEvents id="gameEvents" :EventsList="curEventsList"></gameEvents>
      </b-modal>
  </div>

</template>

<script>
import gameEvents from "../components/gameEventsShow.vue";

  export default {
    data(){
      return {
        stagePastGames: [],
        stageFutureGames: [],
        FutureItems: [],
        FutureFields: [],
        PastItems: [],
        PastFields: [],
        curEventsList: [],
      }
    },
    components:{
      gameEvents,
    },
    methods:{
      async getStageGames(){
        const response = await this.axios.get(
          `http://localhost:3000/league/currentStageDetails`,
        );
        if(response.status == 400){
            console.log("no premission, ban");
            return;
        }
        console.log(response);
        return response.data;
      },
      setTables(data){
        this.setFutureTable(data.futureGamesList);
        this.setPastTable(data.pastGamesList);
      },
      setFutureTable(data){
        this.FutureItems = data.map((g)=>{
          return{
              game_id: g.game_id,
              game_date: g.game_date,
              game_hour: g.game_hour,
              home_team: g.home_team,
              away_team: g.away_team,
              field: g.field,
              referee_name: g.referee_name,
          }
        });
        this.FutureFields = [
          {key: 'game_id', sortable: true},
          {key: 'game_date', sortable: true},
          {key: 'game_hour', sortable: true},
          {key: 'referee_name', sortable: false},
          {key: 'field', sortable: true},
          {key: 'home_team', sortable: true},
          {key: 'away_team', sortable: true},
        ]
      },
      setPastTable(data){
        this.PastItems = data.map((g)=>{
          return{
              game_id: g.game_id,
              game_date: g.game_date,
              game_hour: g.game_hour,
              home_team: g.home_team,
              away_team: g.away_team,
              home_team_goal: g.home_team_goal,
              away_team_goal: g.away_team_goal,
              field: g.field,
              referee_name: g.referee_name,
              eventSchedule: g.eventSchedule,
          }
        });
        this.PastFields = [
          {key: 'game_id', sortable: true},
          {key: 'game_date', sortable: true},
          {key: 'game_hour', sortable: true},
          {key: 'referee_name', sortable: false},
          {key: 'field', sortable: true},
          {key: 'home_team', sortable: true},
          {key: 'away_team', sortable: true},
          {key: 'home_team_goal', sortable: false},
          {key: 'away_team_goal', sortable: false},
          {key: 'eventSchedule',label:'Game events', sortable: false},

        ]
      },
      CurEventData(data){
        console.log(data);
        this.curEventsList = data.eventSchedule;
        console.log(this.curEventsList);
      }
    },
    async mounted() {
      console.log("enter League managment page");
      const data =await  this.getStageGames();
      this.setTables(data);
    },
  }
</script>
