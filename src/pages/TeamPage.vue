<template>
  <div class="container">
    <div
      :title="info.team_name"
      class="team-title"
      v-if="info.team_details[0].logo_path"
    >
      <b-img :src="info.team_details[0].logo_path"></b-img>
    </div>
    <ul class="team-content">
      <li>
        <b-button
          v-if="addButton"
          size="lg"
          id="addFavoriteTeam"
          pill
          variant="outline-danger"
          @click="addTeamToFavorites()"
          >Add to favorite
        </b-button>
        <TeamPreview
          :county_name="info.team_details[0].county_name"
          :national_team="info.team_details[0].national_team"
          :founded="info.team_details[0].founded"
          :team_photo="info.team_details[0].logo_path"
          :team_name="info.team_details[0].name"
          :team_coach="info.team_details[0].coach_name"
        ></TeamPreview>
      </li>
      <li>
        <h1 class="title">Players</h1>
        <div>
          <PlayerTeamPagePreview
            v-for="p in info.team_players"
            :PlayerID="p.PlayerID"
            :name="p.name"
            :birthdate="p.birthdate"
            :image="p.image"
            :nationality="p.nationality"
            :key="p.PlayerID"
          ></PlayerTeamPagePreview>
        </div>
      </li>
      <li>
        <h1 class="title">Coach</h1>
        <div>
          <CoachPreview
            :coach_name="info.team_coach.coach_name"
            :coach_id="info.team_coach.coach_id"
            :image="info.team_coach.image_path"
          ></CoachPreview>
        </div>
      </li>
      <li v-if="info.team_games.length !== 0">
        <h1 class="title">Games</h1>
        <div>
          <h4 class="title">Future Games:</h4>
          <GamePreview
            v-for="g in info.team_games[0]"
            :id="g.game_id"
            :homeTeam="g.home_team"
            :awayTeam="g.away_team"
            :date="g.game_date"
            :hour="g.game_hour"
            :home_team_id="g.home_team_id"
            :away_team_id="g.away_team_id"
            :addButton="addButton"
            :key="g.id"
          ></GamePreview>
        </div>
        <div>
          <h4 class="title">
            Past Games:
          </h4>
          <GamePreview
            v-for="g in info.team_games[1]"
            :id="g.game_id"
            :homeTeam="g.home_team"
            :awayTeam="g.away_team"
            :date="g.game_date"
            :hour="g.game_hour"
            :home_team_id="g.home_team_id"
            :away_team_id="g.away_team_id"
            :addButton="addButton"
            :key="g.id"
          ></GamePreview>
        </div>
      </li>
      <li v-else>
        <h5>
          We don't have any games for this team
        </h5>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import TeamPreview from "../components/TeamPreview.vue";
import PlayerTeamPagePreview from "../components/playerTeamPagePreview.vue";
import GamePreview from "../components/GamePreview.vue";
import CoachPreview from "../components/CoachPreview.vue";
export default {
  components: {
    PlayerTeamPagePreview,
    GamePreview,
    CoachPreview,
    TeamPreview,
  },
  name: "TeamPage",
  data() {
    return {
      info: {
        team_players: [],
        team_coach: {
          coach_name: "",
          coach_id: "",
          image_path: "",
        },
        team_games: [],
        team_details: {
          teamID: 939,
          name: "",
          logo_path: "",
          county_name: "",
          founded: 0,
          national_team: false,
          leagueID: 0,
          coach_name: "",
        },
      },
    };
  },
  methods: {
    async teamDetails(TeamIdParam) {
      try {
        console.log("enter to get team details API function");
        const respond = await axios.get(
          `http://127.0.0.1:3000/teams/teamFullDetails/${TeamIdParam}`
        );
        console.log(respond);
        return respond;
      } catch (err) {
        console.log(err.respond);
      }
    },
    async addTeamToFavorites() {
      try {
        this.$root.toast(
          "Team Page",
          "Adding favorite, please wait....",
          "success"
        );
        const Team_id = this.$route.params.id.replace(":", "");
        console.log(`adding teams ${Team_id}`);
        this.axios.defaults.withCredentials = true;
        const respond = await this.axios.post(
          "http://localhost:3000/users/FavoriteTeams",
          { team_id: Team_id }
        );
        console.log(`data recived`);
        console.log(respond);
        this.axios.defaults.withCredentials = false;
        this.$root.toast(
          "Teams Page",
          "The teams added successfuly",
          "success"
        );
      } catch (error) {
        console.log(console.error());
        this.$root.toast(
          "Teams Page",
          "The teams added failed- duplication favorite Posible",
          "fail"
        );
      }
    },
  },
  computed: {
    addButton() {
      if (this.$root.store.username) {
        return true;
      }
      return false;
    },
  },
  async mounted() {
    this.$root.toast("Team Page", "Loading data, please wait", "success");
    console.log("Enter team page");
    const TeamIdParam = this.$route.params.id.replace(":", "");
    console.log(TeamIdParam); //print the team id to oconsole.
    const d = await this.teamDetails(TeamIdParam);
    console.log(d);
    this.info = d.data;
    // this.props.id = this.$route.params.id;
  },
};
</script>
<style>
.container {
  background-attachment: scroll;
  background-color: rgba(215, 237, 241, 0.61);
}
.team-title {
  position: relative;
  top: 35%;
  left: 55%;
}
</style>
