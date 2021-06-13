<template>
  <div class="team-page">
    <div :title="info.team_name" class="team-title">
      <!-- <b>{{ team_name }}</b> -->
    </div>
    <ul class="team-content">
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
    </ul>
  </div>
</template>

<script>
import axios from "axios";

import PlayerTeamPagePreview from "../components/playerTeamPagePreview.vue";
import GamePreview from "../components/GamePreview.vue";
import CoachPreview from "../components/CoachPreview.vue";
export default {
  components: { PlayerTeamPagePreview, GamePreview, CoachPreview },
  name: "TeamPage",
  data() {
    return {
      info: {
        team_name: "København",
        team_players: [
          {
            PlayerID: 26722,
            name: "Stephan Maigaard Andersen",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/2/26722.png",
            common_name: "S. Andersen",
            nationality: "Denmark",
            birthdate: "26/11/1981",
          },
          {
            PlayerID: 84587,
            name: "Sten Michael Grytebust",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/11/84587.png",
            common_name: "S. Grytebust",
            nationality: "Norway",
            birthdate: "25/10/1989",
          },
          {
            PlayerID: 25057,
            name: "Karl-Johan Johnsson",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/1/25057.png",
            common_name: "K. Johnsson",
            nationality: "Sweden",
            birthdate: "28/01/1990",
          },
          {
            PlayerID: 84494,
            name: "Victor Nelsson",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/14/84494.png",
            common_name: "V. Nelsson",
            nationality: "Denmark",
            birthdate: "14/10/1998",
          },
          {
            PlayerID: 6223,
            name: "Andreas Bjelland",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/15/6223.png",
            common_name: "A. Bjelland",
            nationality: "Denmark",
            birthdate: "11/07/1988",
          },
          {
            PlayerID: 73869,
            name: "Karlo Bartolec",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/13/73869.png",
            common_name: "K. Bartolec",
            nationality: "Croatia",
            birthdate: "20/04/1995",
          },
          {
            PlayerID: 1256,
            name: "Bryan Oviedo",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/8/1256.png",
            common_name: "B. Oviedo",
            nationality: "Costa Rica",
            birthdate: "18/02/1990",
          },
          {
            PlayerID: 24519,
            name: "Nicolai Møller Boilesen",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/7/24519.png",
            common_name: "N. Møller Boilesen",
            nationality: "Denmark",
            birthdate: "16/02/1992",
          },
          {
            PlayerID: 52371,
            name: "Peter Ankersen",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/19/52371.png",
            common_name: "P. Ankersen",
            nationality: "Denmark",
            birthdate: "22/09/1990",
          },
          {
            PlayerID: 24613,
            name: "Mathias Jattah-Njie Jørgensen",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/5/24613.png",
            common_name: "M. Jattah-Njie Jørgensen",
            nationality: "Denmark",
            birthdate: "23/04/1990",
          },
          {
            PlayerID: 107930,
            name: "Marios Oikonomou",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/26/107930.png",
            common_name: "M. Oikonomou",
            nationality: "Greece",
            birthdate: "06/10/1992",
          },
          {
            PlayerID: 32796825,
            name: "Victor Bernth Kristansen",
            image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
            common_name: "V. Kristansen",
            nationality: "Denmark",
            birthdate: "16/12/2002",
          },
          {
            PlayerID: 84658,
            name: "Jens Stage",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/18/84658.png",
            common_name: "J. Stage",
            nationality: "Denmark",
            birthdate: "08/11/1996",
          },
          {
            PlayerID: 1738,
            name: "Viktor Fischer",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/10/1738.png",
            common_name: "V. Fischer",
            nationality: "Denmark",
            birthdate: "09/06/1994",
          },
          {
            PlayerID: 84098,
            name: "Nicolaj Thomsen",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/2/84098.png",
            common_name: "N. Thomsen",
            nationality: "Denmark",
            birthdate: "08/05/1993",
          },
          {
            PlayerID: 107851,
            name: "José Carlos Gonçalves Rodrigues",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/11/107851.png",
            common_name: "J. Gonçalves Rodrigues",
            nationality: "Greece",
            birthdate: "31/08/1988",
          },
          {
            PlayerID: 21073415,
            name: "Mohammed Daramy",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/7/21073415.png",
            common_name: "M. Daramy",
            nationality: "Denmark",
            birthdate: "07/01/2002",
          },
          {
            PlayerID: 62898,
            name: "Lukas Reiff Lerager",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/18/62898.png",
            common_name: "L. Lerager",
            nationality: "Denmark",
            birthdate: "12/07/1993",
          },
          {
            PlayerID: 447344,
            name: "Pep Biel Mas Jaume",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/16/447344.png",
            common_name: "P. Mas Jaume",
            nationality: "Spain",
            birthdate: "05/09/1996",
          },
          {
            PlayerID: 83721,
            name: "Rasmus Falk Jensen",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/9/83721.png",
            common_name: "R. Falk Jensen",
            nationality: "Denmark",
            birthdate: "15/01/1992",
          },
          {
            PlayerID: 37341836,
            name: "Marko Stamenic",
            image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
            common_name: "M. Stamenic",
            nationality: "New Zealand",
            birthdate: "19/02/2002",
          },
          {
            PlayerID: 84526,
            name: "Kamil Wilczek",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/14/84526.png",
            common_name: "K. Wilczek",
            nationality: "Poland",
            birthdate: "14/01/1988",
          },
          {
            PlayerID: 537914,
            name: "Jonas Older Wind",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/26/537914.png",
            common_name: "J. Older Wind",
            nationality: "Denmark",
            birthdate: "07/02/1999",
          },
          {
            PlayerID: 84644,
            name: "Mustapha Bundu",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/4/84644.png",
            common_name: "M. Bundu",
            nationality: "Sierra Leone",
            birthdate: "28/02/1997",
          },
          {
            PlayerID: 21072742,
            name: "Mikkel Kaufmann",
            image:
              "https://cdn.sportmonks.com/images/soccer/players/6/21072742.png",
            common_name: "M. Kaufmann",
            nationality: "Denmark",
            birthdate: "03/01/2001",
          },
          {
            PlayerID: 32777470,
            name: "Hákon Arnar Haraldsson",
            image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
            common_name: "H. Haraldsson",
            nationality: "Iceland",
            birthdate: "10/04/2003",
          },
          {
            PlayerID: 37325014,
            name: "William Bøving Vick",
            image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
            common_name: "W. Vick",
            nationality: "Denmark",
            birthdate: "01/03/2003",
          },
          {
            PlayerID: 37325012,
            name: "Rasmus Winther Højlund",
            image: "https://cdn.sportmonks.com/images/soccer/placeholder.png",
            common_name: "R. Højlund",
            nationality: "Denmark",
            birthdate: "04/02/2003",
          },
        ],
        team_coach: {
          coach_name: "Jess Thorup",
          coach_id: 456421,
        },
        team_games: [
          {
            game_id: 4,
            game_date: "2021-04-23T00:00:00.000Z",
            game_hour: "1970-01-01T20:30:00.000Z",
            home_team: "AaB",
            away_team: "Midtjylland",
            home_team_id: 1020,
            away_team_id: 939,
            field: "yahud",
          },
          {
            game_id: 3,
            game_date: "2021-05-23T00:00:00.000Z",
            game_hour: "1970-01-01T20:30:00.000Z",
            home_team: "Midtjylland",
            away_team: "AaB",
            home_team_id: 939,
            away_team_id: 1020,
            field: "Tedi",
          },
          {
            game_id: 1,
            game_date: "2021-08-23T00:00:00.000Z",
            game_hour: "1970-01-01T20:30:00.000Z",
            home_team: "Midtjylland",
            away_team: "AaB",
            home_team_id: 939,
            away_team_id: 1020,
            field: "Tedi",
          },
          {
            game_id: 2,
            game_date: "2021-09-23T00:00:00.000Z",
            game_hour: "1970-01-01T20:30:00.000Z",
            home_team: "AaB",
            away_team: "Midtjylland",
            home_team_id: 1020,
            away_team_id: 939,
            field: "Tedi",
          },
        ],
      },
    };
  },

  async mounted() {
    // console.log("Enter team page");
    // const TeamIdParam = this.$route.params.id.replace(":", "");
    // console.log(this.$route.params.id.replace(":", "")); //print the team id to oconsole.
    // const teamDetails = async function(TeamIdParam) {
    //   try {
    //     console.log("enter to get team details API function");
    //     const respond = await axios.get(
    //       `http://127.0.0.1:3000/teams/teamFullDetails/${TeamIdParam}`
    //     );
    //     console.log(respond);
    //     return respond;
    //   } catch (err) {
    //     console.log(err.respond);
    //   }
    // };
    // const d = await teamDetails(TeamIdParam);
    // console.log(d);
    // this.info = d.data;
    // // this.props.id = this.$route.params.id;
  },
};
</script>
