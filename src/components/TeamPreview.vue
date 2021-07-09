<template>
  <div class="team-preview">
    <div :title="team_id" class="team-title"></div>
    <ul class="team-content">
      <li v-if="team_photo"><b-img :src="team_photo"></b-img></li>
      <!-- <router-link :to="`/TeamPage/:${this.teamID}`"> -->
      <router-link :to="`/TeamPage/:${this.team_id}`">
        Team Name: {{ team_name }}
      </router-link>
      <li style="Bold">Coach name: {{ team_coach }}</li>

      <li v-if="founded">Team Founded Year: {{ founded }}</li>
      <li v-if="county_name">Team Country: {{ county_name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TeamPreview",
  props: {
    team_name: {
      type: String,
      require: true,
    },
    team_id: {
      type: Number,
      required: false,
      default: 12345,
    },
    team_coach: {
      type: String,
      required: true,
    },
    team_photo: {
      type: String,
      required: false,
      default: () =>
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhe.wikipedia.org%2Fwiki%2F%25D7%25A7%25D7%2595%25D7%2591%25D7%25A5%3ASoccerball.svg&psig=AOvVaw3cK-bXeqYjd14Q7pFVZy7u&ust=1625954416359000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCLDc7a3-1vECFQAAAAAdAAAAABAD",
    },
    founded: {
      type: Number,
      required: false,
      default: () => 12345,
    },
    county_name: {
      type: String,
      required: false,
      default: () => "no Data",
    },
  },
  methods: {
    ClickTeam() {
      //move to the team page
      this.$router.push(`/TeamPage/:${this.teamID}`);
      this.$router.push(`/TeamPage/:${this.team_id}`);
    },
  },
  mounted() {
    console.log("team preview mounted");
  },
};
</script>

<style>
.team-preview {
  display: inline-block;
  width: 300px;
  height: 310px;
  position: relative;
  margin: 10px 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
  background-color: rgba(215, 237, 241, 0.616);
}

.team-preview .team-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.team-preview .team-content {
  width: 100%;
  overflow: hidden;
}
</style>
