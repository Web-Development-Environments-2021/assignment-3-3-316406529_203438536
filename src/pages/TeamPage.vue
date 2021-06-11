<template>
  <div class="container">
    <h1>Team Page</h1>
    <h1 v-if="id != null">{{ id }} noam Kotlar</h1>
    <h1 v-else>Team ID Error</h1>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import axios from "axios";

export default {
  name: "TeamPage",
  data() {
    return {
      id: 2,
      // id: {
      //   type: Number,
      //   required: false,
      // },
    };
  },
  mounted() {
    console.log("Enter team page");
    const TeamIdParam = this.$route.params.id.replace(":", "");
    console.log(this.$route.params.id.replace(":", "")); //print the team id t oconsole.
    const teamDetails = async function(TeamIdParam) {
      try {
        console.log("enter to get team details API function");
        const respond = await axios.get(
          `http://localhost:3000/teams/teamFullDetails/${teamId}`
        );
        console.log(respond);
      } catch (err) {
        console.log(err.respond);
      }
    };
    // this.props.id = this.$route.params.id;
  },
  async getTeamDetails(teamId) {
    try {
      console.log("enter to get team details API function");
      const respond = await axios.get(
        `http://localhost:3000/teams/teamFullDetails/${teamId}`
      );
      console.log(respond);
    } catch (err) {
      console.log(err.respond);
    }
  },
};
</script>
