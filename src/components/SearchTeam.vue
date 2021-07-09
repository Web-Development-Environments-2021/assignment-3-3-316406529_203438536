<template>
  <div id="search-team-div">
    <b-input-group-append id="SeachBotton">
      <b-button @click="search()" variant="success">Search</b-button>
    </b-input-group-append>
    <div v-if="items[0]" id="result-table-div">
      <b-table
        :items="items"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        sort-icon-left
        responsive="sm"
      >
        <template #cell(team_name)="data">
          <a id="clickabble" @click="ClickTeam(data.value.TeamID)">{{
            data.value.teamName
          }}</a>
        </template>
        <template #cell(leam_logo)="data">
          <img class="player-img-table" :src="data.value" />
        </template>
      </b-table>
    </div>
    <h1 class="title" id="Noresult" v-else>No Results</h1>
  </div>
</template>

<script>
export default {
  props: {
    searchQuery: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      found: 0,
      sortDesc: false,
    };
  },
  components: {},
  methods: {
    ClickTeam(id) {
      this.$router.push(`/TeamPage/:${id}`);
    },

    async search() {
      this.$root.toast(
        "Search player",
        "Searching for teams, please wait....",
        "success"
      );
      this.teams = [];
      console.log("start searching");
      console.log({
        search_query: this.searchQuery,
      });
      localStorage.setItem("searchQuery", JSON.stringify(this.searchQuery));
      try {
        const response = await this.axios.get(
          `http://localhost:3000/teams/search/${this.searchQuery}`
        );
        console.log("team search results");
        console.log(response);
        if (response.status == 201) {
          this.found += 1;
          localStorage.setItem("teams", JSON.stringify([]));
          this.$root.toast(
            "Search team",
            "No results found, mybe the team is not in league 271",
            "success"
          );
        } else {
          this.found += 1;
          this.$root.toast("Search team", "search complete", "success");
          this.showteams(response);
        }
      } catch (error) {
        this.$root.toast("Search team", err.response.data, "fail");
        console.log("error in search keyword team");
        console.log(error);
      }
    },
    async showteams(data) {
      const teams = data.data;

      let teams_data = [];
      teams_data.push(...teams);
      localStorage.setItem("teams", JSON.stringify(teams_data));
      console.log("teams from server", teams_data);
      console.log(
        "teams from local storage",
        JSON.parse(localStorage.getItem("teams"))
      );
    },
  },
  computed: {
    items() {
      return this.teams.map((t) => {
        return {
          team_name: t,
          leam_logo: t.teamLogo,
          league_ID: t.leagueID,
        };
      });
    },
    teams() {
      if (this.found) {
        console.log(this.found);
        console.log("teams called!");
      }
      if (localStorage.getItem("teams")) {
        console.log(localStorage.getItem("teams"));
        return JSON.parse(localStorage.getItem("teams"));
      }
      return [];
    },
    fields() {
      return [
        { key: "team_name", sortable: true },
        { key: "leam_logo", sortable: true },
        { key: "league_ID", sortable: false },
      ];
    },
    sortBy() {
      return "team_name";
    },
  },
  mounted() {
    console.log("enter search team componnent");
    console.log(this.searchQuery);
  },
};
</script>
<style>
#clickabble:hover {
  font-weight: bold;
  cursor: pointer;
}
#search-team-div {
  position: absolute;
  left: 20%;
  right: 20%;
  top: 34%;
}
#result-table-div {
  position: relative;
  max-width: 95%;
  left: 3%;
  right: 3%;
  top: 100px;
  background-color: rgba(218, 233, 233, 0.514);
}
#SeachBotton {
  position: relative;
  left: 47%;

  top: 10px;
}
#Noresult {
  margin: 21px;
}
</style>
