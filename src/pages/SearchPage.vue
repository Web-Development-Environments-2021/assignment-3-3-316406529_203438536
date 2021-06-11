<template>
  <div>
    <div id="searchAttributes">
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
        </b-input-group>
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
    </div>
    <div id="showRes">
      <b-table :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
        sort-icon-left responsive="sm">
        <template #cell(moreDetails)="data">
        <b-button v-b-modal.modal-1 @click="showPlayer(data.value)">Show more</b-button>
        </template>
      </b-table>
      <!-- <div>
        Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
      </div> -->

      <b-modal id="modal-1" v-if="showPlayerData!=null" :title="showPlayerData.common_name">
        <!-- <p class="my-4">Hello from modal!</p> -->
        <div v-if="searchAtribute=='player'">
          <playersShow id="playerslayout"
            :PlayerID="showPlayerData.PlayerID" 
            :common_name="showPlayerData.common_name"
            :fullname="showPlayerData.fullname"
            :nationality="showPlayerData.nationality"
            :birthdate="showPlayerData.birthdate"
            :birthplace="showPlayerData.birthplace"
            :height="showPlayerData.height"
            :weight="showPlayerData.weight"
            :playerPosition="showPlayerData.playerPosition"
            :PositionID="showPlayerData.position_id" 
            :teamName="showPlayerData.team"
            :teamID="showPlayerData.team_id"
            :photoPath="showPlayerData.image_path" 
            :key="showPlayerData.PlayerID">
          </playersShow>
        </div>
        <div v-else>
          <teamsShow
            :Team_id="showPlayerData.team_id"
            :team_players="showPlayerData.team_players"
            :team_games="showPlayerData.team_games"
            :key="showPlayerData.team_id"
          ></teamsShow>
        </div>
      </b-modal>

    </div>
    <!-- <playersShow id="playerslayout"
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
    <teamsShow
      v-for="t in teams"
      :Team_id="t.team_id"
      :team_players="t.team_players"
      :team_games="t.team_games"
      :key="t.team_id"
    ></teamsShow> -->
  </div>
</template>


<script>
import playersShow from "../components/PlayerShow.vue";
import teamsShow from "../components/TeamPreview.vue";

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
      sortDesc: false,
      teams: this.$root.store.teams,
      players: this.$root.store.players,
      showPlayerData: null
    };
  },

  components:{
    playersShow,
    teamsShow
  },
  methods: {
    setStoredData(){
      this.$root.store.setStoredData(this.searchQuery,
        this.searchTeam,this.searchLocation,this.players,this.teams);
    },
    playerSearch(){
      this.searchAtribute='player';
      this.searchQuery = "";
    },
    teamSearch(){
      this.searchAtribute='team'
      this.searchQuery = "";

      },
    async getAutoCompleteData(){
      try{
        const searchAutoComlateData = this.$root.store.AutoCompleteSearchData;
        console.log("recived data");
        console.log(searchAutoComlateData);
        this.playersList = searchAutoComlateData.data.playersNames;
        this.teamsList = searchAutoComlateData.data.teamsNames;
        this.LocationsList = searchAutoComlateData.data.positions;
      }catch(error){
        console.log("error in getting auto complete search data");
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
          if(response.status == 201){
            console.log("No result");
            this.setStoredData();
            return
          }
          if(response.status == 400){
            console.log("API search error");
            this.setStoredData();
            return
          }
          if(response.status ==200){
            this.showPlayers(response);
            this.setStoredData();
          }
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
          if(response.status == 200){
            this.showteams(response);
            this.setStoredData();
          }
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
    },
    showPlayer(data){
      this.showPlayerData = data;
      console.log("print player show data");
      console.log(data);
    }
  },
  computed:{
    items(){
      if(this.searchAtribute == "player"){
        return this.players.map((p)=>{
          return{
            full_name: p.fullname,
            team_name: p.team,
            photo: p.image_path,
            position_id: p.position_id,
            moreDetails: p,
          }
        });
      }
      return this.teams.map((t)=>{
          return{
            team_name: t.teamName,
            leam_logo: t.teamLogo,
            moreDetails: t,
          }
        });
    },
    fields(){
      if(this.searchAtribute == "player"){
        return [
          {key: 'full_name', sortable: true},
          {key: 'team_name', sortable: true},
          {key: 'photo', sortable: false},
          {key: 'position_id', sortable: true},
          {key: 'moreDetails', sortable: false},

        ]
      }
      return [
          {key: 'team_name', sortable: true},
          {key: 'leam_logo', sortable: true},
          {key: 'moreDetails', sortable: false},
      ]
    },
    sortBy(){
      if(this.searchAtribute == 'player'){
        return 'full_name';
      }
      return 'team_name';
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