<template>
  <div id="search-player-page-div">
    <div class="team-position-div">
      <b-input-group prepend="Search Team:" id="search-input">
        <div>
          <b-form-input
            list="teams"
            v-model="searchTeam"
            :placeholder="searchTeam"
          ></b-form-input>
          <datalist id="teams">
            <option v-for="t in teamsList" :key="t">{{ t }}</option>
          </datalist>
        </div>
      </b-input-group>
      <b-input-group prepend="Search Location:" id="search-input">
        <div>
          <b-form-input
            list="Locations"
            v-model="searchLocation"
            :placeholder="searchLocation"
          ></b-form-input>
          <datalist id="Locations">
            <option v-for="L in LocationsList" :key="L">{{ L }}</option>
          </datalist>
        </div>
      </b-input-group>
      <b-input-group-append id="SeachBotton">
        <b-button @click="search()" variant="success">Search</b-button>
      </b-input-group-append>
    </div>
    <div>
      <b-table
        id="result-table-div-team"
        v-if="items[0]"
        :items="items"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        sort-icon-left
        responsive="sm"
      >
        <template #cell(photo)="data">
          <img class="player-img-table" :src="data.value" />
        </template>
        <template #cell(moreDetails)="data">
          <b-button v-b-modal.modal-1 @click="showPlayer(data.value)"
            >Show more</b-button
          >
        </template>
        <template #cell(team_name)="data">
          <a id="clickabble" @click="ClickTeam(data.value.team_id)">{{
            data.value.team
          }}</a>
        </template>
        <template #cell(full_name)="data">
          <a id="clickabble" @click="ClickPlayer(data.value.PlayerID)">{{
            data.value.fullname
          }}</a>
        </template>
      </b-table>
      <h1 v-else class="title" align="center">No Results</h1>
      <b-modal
        id="modal-1"
        v-if="showPlayerData != null"
        :title="showPlayerData.common_name"
      >
        <playersShow
          id="playerslayout"
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
          :key="showPlayerData.PlayerID"
        >
        </playersShow>
      </b-modal>
    </div>
  </div>
</template>

<script>
import playersShow from "../components/PlayerShow.vue";

export default {
  props: {
    searchQuery: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchTeam: JSON.parse(localStorage.getItem("searchTeam")),
      searchLocation: JSON.parse(localStorage.getItem("searchLocation")),
      sortDesc: false,
      found: 0,

      showPlayerData: null,
      hasRes: "",
    };
  },
  components: {
    playersShow,
  },
  methods: {
    ClickTeam(id) {
      this.$router.push(`/TeamPage/:${id}`);
    },
    ClickPlayer(id) {
      this.$router.push(`/PlayerPage/:${id}`);
    },

    async search() {
      this.$root.toast(
        "Search player",
        "Searching for players, please wait....",
        "success"
      );
      localStorage.setItem("searchQuery", JSON.stringify(this.searchQuery));
      localStorage.setItem("searchTeam", JSON.stringify(this.searchTeam));
      localStorage.setItem(
        "searchLocation",
        JSON.stringify(this.searchLocation)
      );

      this.players = [];
      console.log("start searching");
      console.log({
        search_query: this.searchQuery,
        searchTeam: this.searchTeam,
        searchLocation: this.searchLocation,
      });
      try {
        if (this.searchTeam == "") {
          this.searchTeam = `{team}`;
        }
        if (this.searchLocation == "") {
          this.searchLocation = `{location}`;
        }
        console.log("query", this.searchQuery);
        const response = await this.axios.get(
          `http://localhost:3000/players/search/locationAndTeam/${this.searchQuery}/${this.searchTeam}/${this.searchLocation}`
        );
        console.log(response);
        if (this.searchTeam == `{team}`) {
          this.searchTeam = "";
        }
        if (this.searchLocation == `{location}`) {
          this.searchLocation = "";
        }
        if (response.status == 201) {
          console.log("No result");
          this.found += 1;
          localStorage.setItem("players", JSON.stringify([]));
          this.$root.toast("Search player", "No Search results", "fail");
          return;
        }
        if (response.status == 200) {
          this.found += 1;
          this.$root.toast("Search player", "Players List below", "success");
          this.showPlayers(response);
        }
      } catch (error) {
        this.$root.toast("Search player", err.response.data, "fail");
        console.log("error in search keyword player");
        console.log(error);
      }
    },
    async showPlayers(data) {
      const players = data.data;

      let playerss = [];
      playerss.push(...players);

      localStorage.setItem("players", JSON.stringify(playerss));
      console.log("players from server", playerss);
      console.log(
        "players from local storage",
        JSON.parse(localStorage.getItem("players"))
      );
    },
    showPlayer(data) {
      this.showPlayerData = data;
      console.log("print player show data");
      console.log(data);
    },
  },
  computed: {
    teamsList() {
      if (this.$root.store.AutoCompleteSearchData.data) {
        return this.$root.store.AutoCompleteSearchData.data.teamsNames;
      }
      return [];
    },
    LocationsList() {
      if (this.$root.store.AutoCompleteSearchData.data) {
        return this.$root.store.AutoCompleteSearchData.data.positions;
      }
      return [];
    },
    items() {
      return this.players.map((p) => {
        return {
          full_name: p,
          team_name: p,
          photo: p.image_path,
          position_id: p.position_id,
          moreDetails: p,
        };
      });
    },
    players() {
      if (this.found) {
        console.log(this.found);
        console.log("players called!");
      }
      if (localStorage.getItem("players")) {
        console.log(localStorage.getItem("players"));
        return JSON.parse(localStorage.getItem("players"));
      }
      return [];
    },
    fields() {
      return [
        { key: "full_name", sortable: true },
        { key: "team_name", sortable: true },
        { key: "photo", sortable: false },
        { key: "position_id", sortable: true },
        { key: "moreDetails", sortable: false },
      ];
    },
    sortBy() {
      return "full_name";
    },
  },
  mounted() {
    console.log("enter search player component");
    console.log(this.players);
  },
};
</script>
<style>
#search-player-page-div {
  top: 5px;
}
.team-position-div {
  position: absolute;
  left: 35%;
  top: -34px;
}
#result-table-div-team {
  position: relative;
  max-width: 95%;
  left: 3%;
  right: 3%;
  top: 100px;
  background-color: rgba(215, 237, 241, 0.616);
}
.player-img-table {
  width: 50px;
  height: 50px;
}
#clickabble:hover {
  font-weight: bold;
  cursor: pointer;
}
</style>
