<template>
  <div>
    <div id="searchAttributes">
      <h1 class="title" align="center">Search Page</h1>
      <b-input-group prepend="Search Query:" id="search-input">
        <div>
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
      <SearchPlayer
        :searchQuery="searchQuery"
        :teamsList="teamsList"
        :LocationsList="LocationsList"
        v-if="searchAtribute == 'player'"
      ></SearchPlayer>
      <SearchTeam
        v-if="searchAtribute == 'team'"
        :searchQuery="searchQuery"
      ></SearchTeam>
    </div>
  </div>
</template>

<script>
import SearchPlayer from "../components/SearchPlayer.vue";
import SearchTeam from "../components/SearchTeam.vue";

export default {
  data() {
    return {
      curSearchAtribute: "player",
      searchQueryinput: this.$root.store.searchQuery,
      // searchTeam: this.$root.store.searchTeam,
      // searchLocation: this.$root.store.searchLocation,
      playersList: [],
      teamsList: [],
      LocationsList: [],
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
    setStoredData() {
      this.$root.store.setStoredData(
        this.searchQueryinput,
        this.searchTeam,
        this.searchLocation,
        this.players,
        this.teams
      );
    },
    async getAutoCompleteData() {
      try {
        const searchAutoComlateData = this.$root.store.AutoCompleteSearchData;
        console.log("recived data");
        console.log(searchAutoComlateData);
        this.playersList = searchAutoComlateData.data.playersNames;
        this.teamsList = searchAutoComlateData.data.teamsNames;
        this.LocationsList = searchAutoComlateData.data.positions;
      } catch (error) {
        console.log("error in getting auto complete search data");
        console.log(error);
      }
    },
    playerSearch() {
      this.getAutoCompleteData();
      this.curSearchAtribute = "player";
      this.searchQueryinput = "";
    },
    teamSearch() {
      this.getAutoCompleteData();
      this.curSearchAtribute = "team";
      this.searchQuery = "";
    },
  },
  computed: {
    mainQueryDataList() {
      if (this.searchAtribute == "player") {
        return this.playersList;
      } else {
        return this.teamsList;
      }
    },
    searchQuery() {
      return this.searchQueryinput;
    },
    searchAtribute() {
      return this.curSearchAtribute;
    },
  },
  mounted() {
    console.log("enter search page");
    this.getAutoCompleteData();
  },
};
</script>

<style scoped>
#searchAttributes {
  background-color: rgba(215, 237, 241, 0.61);
}
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
</style>
