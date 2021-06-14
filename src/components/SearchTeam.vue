<template>
    <div>
        <b-input-group-append id="SeachBotton">
            <b-button @click="search()" variant="success">Search</b-button>
        </b-input-group-append>
        <b-table
            v-if="items[0]"
            :items="items"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            sort-icon-left
            responsive="sm"
        >
        <template #cell(team_name)="data">
            <a @click="ClickTeam(data.value.TeamID)">{{ data.value.teamName }}</a>
        </template>
        </b-table>
        <h1 v-else>No Results</h1>
    </div>
</template>

<script>

export default {
    props:{
        searchQuery: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
        sortDesc: false,
        teams: this.$root.store.teams,
        };
    },
    components: {
        // teamsShow,
    },
    methods: {
        ClickTeam(id) {
            this.$router.push(`/TeamPage/:${id}`);
        },
        setStoredData() {
        this.$root.store.setStoredData(
            this.searchQuery,
            this.$root.store.searchTeam,
            this.$root.store.searchLocation,
            this.$root.store.players,
            this.teams
        );
        },
        async search() {
            this.$root.toast("Search player", "Searching for teams, please wait....", "success");
            this.teams = [];
            console.log("start searching");
            console.log({
                search_query: this.searchQuery,
            });
            try {
                const response = await this.axios.get(
                `http://localhost:3000/teams/search/${this.searchQuery}`
                );
                console.log("team search results");
                console.log(response);
                if(response.status == 201){
                    this.$root.toast("Search team", "No results found, mybe the team is not in league 271", "success");

                }
                else{
                    this.$root.toast("Search team", "search complete", "success");
                    this.showteams(response);
                    this.setStoredData();
                }
            } catch (error) {
                this.$root.toast("Search team", err.response.data, "fail");
                console.log("error in search keyword team");
                console.log(error);
            }
        },
        async showteams(data) {
            const teams = data.data;
            this.teams = [];
            this.teams.push(...teams);
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
        fields() {
            return [
                { key: "team_name", sortable: true },
                { key: "leam_logo", sortable: true },
                { key: "league_ID", sortable: false },
            ];
        },
        sortBy() {return "team_name";},
    },
    mounted() {
        console.log("enter search team componnent");
        console.log(this.searchQuery);
    },
};
</script>