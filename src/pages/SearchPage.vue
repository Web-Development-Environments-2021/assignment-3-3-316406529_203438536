<template>
  <div class="container">
    <div id="searchAttributes">
      <h1 class="title" align="center">Search Page</h1>
      <b-input-group prepend="Search Query:" id="search-input-first">
        <div id="player-search-div">
          <b-form-input
            list="mainQueryDataList"
            v-model="searchQueryinput"
            :placeholder="searchQueryinput"
          ></b-form-input>
          <datalist id="mainQueryDataList">
            <option v-for="p in mainQueryDataList" :key="p">{{ p }}</option>
          </datalist>
        </div>
        <template #append>
          <b-dropdown v-bind:text="searchAtribute" variant="success">
            <b-dropdown-item @click="playerSearch()">Player</b-dropdown-item>
            <b-dropdown-item @click="teamSearch()">Team</b-dropdown-item>
          </b-dropdown>
        </template>
      </b-input-group>
      <br />
      <div id="ExtrasearchInput">
        <SearchPlayer
          id="player-position-div-search"
          :searchQuery="searchQuery"
          v-if="searchAtribute == 'player'"
        ></SearchPlayer>
        <SearchTeam
          id="team-position-div-search"
          v-if="searchAtribute == 'team'"
          :searchQuery="searchQuery"
        ></SearchTeam>
      </div>
    </div>
  </div>
</template>

<script>
import SearchPlayer from "../components/SearchPlayer.vue";
import SearchTeam from "../components/SearchTeam.vue";

export default {
  data() {
    return {
      curSearchAtribute_change: "player",
      // searchQueryinput: this.$root.store.searchQuery,
      searchQueryinput: JSON.parse(localStorage.getItem("searchQuery")),

      // searchTeam: this.$root.store.searchTeam,
      // searchLocation: this.$root.store.searchLocation,
      // playersList: [],
      // teamsList: [],
      // LocationsList: [],
      // sortDesc: false,
      // teams: this.$root.store.teams,
      // players: this.$root.store.players,
      // showPlayerData: null,
      // hasRes: "",
    };
  },
  components: {
    SearchPlayer,
    SearchTeam,
  },
  methods: {
    // setStoredData() {
    //   this.$root.store.setStoredData(
    //     this.searchQueryinput,
    //     this.searchTeam,
    //     this.searchLocation,
    //     this.players,
    //     this.teams
    //   );
    // },
    async getAutoCompleteData() {
      try {
        const searchAutoComlateData = this.$root.store.AutoCompleteSearchData;
        console.log("recived data");
        console.log(searchAutoComlateData);
        // this.playersList = searchAutoComlateData.data.playersNames;
        // this.teamsList = searchAutoComlateData.data.teamsNames;
        // this.LocationsList = searchAutoComlateData.data.positions;
      } catch (error) {
        console.log("error in getting auto complete search data");
        console.log(error);
      }
    },
    playerSearch() {
      // this.getAutoCompleteData();
      localStorage.setItem("curSearchAtribute", JSON.stringify("player"));
      this.curSearchAtribute_change = "player";
      this.searchQueryinput = "";
    },
    teamSearch() {
      // this.getAutoCompleteData();
      localStorage.setItem("curSearchAtribute", JSON.stringify("team"));
      this.curSearchAtribute_change = "team";
      this.searchQueryinput = "";
    },
  },
  computed: {
    curSearchAtribute(){
      if(this.curSearchAtribute_change){
        console.log("attribute changed");
      }
      return JSON.parse(localStorage.getItem("curSearchAtribute"));
    },
    mainQueryDataList() {
      if (this.searchAtribute == "player") {
        return this.playersList;
      } else {
        return this.teamsList;
      }
    },
    playersList(){
      if (this.$root.store.AutoCompleteSearchData && this.$root.store.AutoCompleteSearchData.data){
        return this.$root.store.AutoCompleteSearchData.data.playersNames;
      }
      return [];
      
    },
    // teamsList(){
    //   if (this.$root.store.AutoCompleteSearchData.data){
    //     return this.$root.store.AutoCompleteSearchData.data.teamsList;
    //   }
    //   return [];
      
    // },
    teamsList(){
      if (this.$root.store.AutoCompleteSearchData.data){
        return this.$root.store.AutoCompleteSearchData.data.teamsNames;
      }
      return [];
    },
    // LocationsList(){
    //   if (this.$root.store.AutoCompleteSearchData.data){
    //     return this.$root.store.AutoCompleteSearchData.data.LocationsList;
    //   }
    //   return [];
      
    // },
    searchQuery() {
      return this.searchQueryinput;
    },
    searchAtribute() {
      return this.curSearchAtribute;
    },
  },
  created() {
    console.log("enter search page",);
    localStorage.setItem("curSearchAtribute", JSON.stringify("player"));
    // this.getAutoCompleteData();
  },
};
</script>

<style scoped>
#searchAttributes {
  /* position: relative;
  background-color: rgba(215, 237, 241, 0.61);
  max-height: 100%;
  max-width: 100%; */
}
.container {
  /* top: 0%;
  max-width:%;
  max-height: 100%; */
  height: 250px;
}
#search-input {
  margin-left: 25%;
  width: 500px;
  margin-top: 30px;
}
.input-group {
  position: relative;
  left: 10%;
  top: 15%;
}
#SeachBotton {
  margin-top: 20px;
  margin-left: 60%;
  width: 500px;
}
#player-search-div {
  position: relative;
}
#team-position-div-search {
  /* position: relative; */
  /* top: -45px; */
  /* left: 10%; */
  /* top: 0%; */
}
#player-position-div-search {
  /* position: relative; */
  /* left: 10%; */
  /* top: 0%; */
}
#search-input-first {
  position: relative;
  /* left: 34%; */
  left: 35%;
  right: 65%;
  top: 20%;
  margin-top: 3%;
}
#ExtrasearchInput {
  position: relative;
  margin: 10px;
}
</style>
