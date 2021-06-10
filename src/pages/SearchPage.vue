<template>
  <div>
    <h1 class="title" align= "center">Search Page</h1>
    <div v-if="searchAtribute=='player'">
      <b-input-group prepend="Search Query:" id="search-input">
        <div>
          <b-form-input list="player" v-model="searchQuery" :placeholder=searchQuery></b-form-input>
          <datalist id=player>
            <option v-for="p in playersList" :key="p">{{ p }}</option>
          </datalist>
        </div>
        <template #append>
          <b-dropdown v-bind:text="searchAtribute" variant="success">
            <b-dropdown-item @click="playerSearch()">Player</b-dropdown-item>
            <b-dropdown-item @click="teamSearch()">Team</b-dropdown-item>
          </b-dropdown>
        </template>
      </b-input-group>
      <b-input-group prepend="Search Team:" id="search-input">
        <div>
          <b-form-input list="teams" v-model="searchTeam" :placeholder=searchTeam></b-form-input>
          <datalist id="teams">
            <option v-for="t in teamsList" :key="t">{{ t }}</option>
          </datalist>
        </div>
      </b-input-group>
      <b-input-group prepend="Search Location:" id="search-input">
        <div>
          <b-form-input list="Locations" v-model="searchLocation" :placeholder=searchLocation></b-form-input>
          <datalist id="Locations">
            <option v-for="L in LocationsList" :key="L">{{ L }}</option>
          </datalist>
        </div>
      </b-input-group> -->
    </div>
    <b-input-group prepend="Search Query:" id="search-input" v-else>
      <div>
        <b-form-input list="teams" v-model="searchQuery" :placeholder=searchQuery></b-form-input>
        <datalist id="teams">
          <option v-for="t in teamsList" :key="t">{{ t }}</option>
        </datalist>
      </div>
      <template #append>
        <b-dropdown v-bind:text="searchAtribute" variant="success">
          <b-dropdown-item @click="playerSearch()">Player</b-dropdown-item>
          <b-dropdown-item @click="teamSearch()">Team</b-dropdown-item>
        </b-dropdown>
      </template>
    </b-input-group>

    <b-input-group-append id="SeachBotton">
      <b-button @click="search()" variant="success">Search</b-button>
    </b-input-group-append>
    <playersShow id="playerslayout"
      v-for="p in players"
      :PlayerID="p.PlayerID" 
      :common_name="p.common_name"
      :fullname="p.fullname"
      :nationality="p.nationality"
      :birthdate="p.birthdate"
      :birthplace="p.birthplace"
      :height="p.height"
      :weight="p.weight"
      :playerPosition="p.playerPosition"
      :PositionID="p.position_id" 
      :teamName="p.team"
      :teamID="p.team_id"
      :photoPath="p.image_path" 
      :key="p.PlayerID"></playersShow>
  </div>
</template>


<script>
import playersShow from "../components/PlayerShow.vue";
// import teamsShow from "../components/FavoriteTeams.vue";

export default {
 data() {
    return {
      searchAtribute: "player",
      searchQuery: this.$root.store.searchQuery,
      searchTeam: this.$root.store.searchTeam,
      searchLocation: this.$root.store.searchLocation,
      playersList: [],
      teamsList:[],
      LocationsList: [],

      teams: [],
      players: []
    };
  },
  components:{
    playersShow,
    // teamsShow
  },
  methods: {
    playerSearch(){this.searchAtribute='player'},
    teamSearch(){this.searchAtribute='team'},
    async getAutoCompleteData(){
      try{
        const searchAutoComlateData = this.$root.store.AutoCompleteSearchData;
        console.log("recived data");
        console.log(searchAutoComlateData);
        this.playersList = searchAutoComlateData.data.playersNames;
        this.teamsList = searchAutoComlateData.data.teamsNames;
        this.LocationsList = searchAutoComlateData.data.positions;
      }catch(error){
        console.log("error in getting aouto complete search data");
        console.log(error);
      }
    },
    async search(){
      this.players = []
      this.teams =[]
      console.log("start searching");
      console.log({
        searchAtribute: this.searchAtribute,
        search_query: this.searchQuery,
        searchTeam: this.searchTeam,
        searchLocation: this.searchLocation
      })
      if(this.searchAtribute == 'player'){
        try {
          if(this.searchTeam == ''){this.searchTeam =`{team}`};
          if(this.searchLocation==''){this.searchLocation = `{location}`};
          const response = await this.axios.get(
            `http://localhost:3000/players/search/locationAndTeam/${this.searchQuery}/${this.searchTeam}/${this.searchLocation}`,
          );
          console.log(response);
          if(this.searchTeam ==`{team}`){this.searchTeam =''};
          if(this.searchLocation== `{location}`){this.searchLocation =''};
          if(!response.data.data){
            console.log("No result");
            return
          }
          this.showPlayers(response);
        } catch (error) {
          console.log("error in search keyword player")
          console.log(error);
        }
      }else{
        try {
          const response = await this.axios.get(
            `http://localhost:3000/teams/search/${this.searchQuery}`,
          );
          console.log(response);
          if(!response.data.data){
            console.log("No result");
            return
          }
          this.showteams(response);
        } catch (error) {
          console.log("error in search keyword team")
          console.log(error);
        }
      }

    },
    async showteams(data){
      const teams = data.data;
        this.teams = [];
        this.teams.push(...teams);
    },
    async showPlayers(data){
      const players = data.data;
        this.players = [];
        this.players.push(...players);
    }
  },
mounted() {
  console.log("enter search page");
  this.getAutoCompleteData();

},
}
</script>

<style scoped>

#search-input {
  margin-left: 25%; 
  width: 500px; 
  margin-top: 20px;
}

#SeachBotton {
  margin-top: 20px;
  margin-left: 50%;
  width: 500px; 
}

#playerslayout{
  /* margin-top: 20px; */
  /* display: flex; */


}
</style>