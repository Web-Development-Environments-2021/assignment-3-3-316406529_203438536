rt<template>
  <div class="team-preview">
    <div :title="team_id" class="team-title">
      <!-- <b>{{ team_name }}</b> -->
    </div>
    <ul class="team-content">
      <li v-if="team_photo"><b-img :src="team_photo"></b-img></li>
      <!-- <li @click="ClickTeam()" style="Bold">Team Name: {{ team_name }}</li> -->
      <router-link :to="`/TeamPage/:${this.teamID}`">
        Team Name: {{ team_name }}</router-link
      >
      <li style="Bold">Coach name: {{ team_coach }}</li>
      <!-- <li style="Bold">Team ID: {{ team_id }}</li> -->
      <!-- <li v-if="team_photo">Team Logo: {{ team_photo }}</li> -->
      <li v-if="founded">Team Founded Year: {{ founded }}</li>
      <li v-if="county_name">Team Country: {{ county_name }}</li>
      <li v-if="national_team">Netional Team : {{ national_team }}</li>
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
    },
    team_coach: {
      type: String,
      required: true,
    },
    team_photo: {
      type: String,
      required: false,
    },
    founded: {
      type: Number,
      required: false,
    },
    county_name: {
      type: String,
      required: false,
    },
    national_team: {
      type: String,
      required: false,
    },
  },
  methods: {
    ClickTeam() {
      this.$router.push(`/TeamPage/:${this.teamID}`);
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
