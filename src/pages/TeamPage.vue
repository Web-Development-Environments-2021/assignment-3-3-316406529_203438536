<template>
  <div class="team-page">
    <div :title="info.team_name" class="team-title">
      <!-- <b>{{ team_name }}</b> -->
    </div>
    <ul class="team-content">
      <li>
        Team Details:
        <TeamPreview :county_name="info.team_details.county_name"
         :national_team="info.team_details.national_team"
          :founded="info.team_details.founded"
         :team_photo="info.team_details.logo_path"
          :team_name="info.team_details.name"
           :team_coach="info.team_details.coach_name"></TeamPreview>
      </li>
      <li>
        Team players:
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
        Team coach:
        <div>
          <CoachPreview
            :coach_name="info.team_coach.coach_name"
            :coach_id="info.team_coach.coach_id"
            :image="info.team_coach.image_path"
          ></CoachPreview>
        </div>
      </li>
      <li v-if="info.team_games.length !== 0">
        Team games:
        <div>
          <GamePreview
            v-for="g in info.team_games"
            :id="g.game_id"
            :homeTeam="g.home_team"
            :awayTeam="g.away_team"
            :date="g.game_date"
            :hour="g.game_hour"
            :home_team_id="g.home_team_id"
            :away_team_id="g.away_team_id"
            :key="g.id"
          ></GamePreview>
        </div>
        <!-- <div v-else><h2>We don't have any games for this team</h2></div> -->
      </li>
      <li v-else>
        <h5>
          We don't have any games for this team
        </h5>
      </li>
      <b-button
        size="lg"
        id="addFavoriteTeam"
        pill
        variant="outline-danger"
        @click="addTeamToFavorites()"
        >Add to favorite</b-button>
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
  components: { PlayerTeamPagePreview, GamePreview, CoachPreview, TeamPreview },
  name: "TeamPage",
  data() {
    return {
      info: {
        team_players: [],
        team_games: [],
        team_details: {
          teamID: 939,
          name: "",
          logo_path: "",
          county_name: "",
          founded: 0,
          national_team: false,
          leagueID: 0,
          coach_name: ""
        }
      },
    };
  },
  methods:{
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
      try{
        this.$root.toast("Team Page", "Adding favorite, please wait....", "success");
        const Team_id = this.$route.params.id.replace(":", "");
        console.log(`adding teams ${Team_id}`);
        this.axios.defaults.withCredentials=true;
        const respond = await this.axios.post(
          "http://localhost:3000/users/FavoriteTeams",
          { team_id: Team_id }
        );
        console.log(`data recived`);
        console.log(respond);
        this.axios.defaults.withCredentials=false;
        this.$root.toast("Teams Page", "The teams added successfuly", "success");

      }catch(error){
        console.log(console.error());
        this.$root.toast("Teams Page", "The teams added failed- duplication favorite Posible", "fail");
      }

    },
  },
  async mounted() {
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
