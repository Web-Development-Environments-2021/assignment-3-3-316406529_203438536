<template>
  <div class="team-preview">
    <div :title="team_id" class="team-title">
      <!-- <b>{{ team_name }}</b> -->
    </div>
    <ul class="team-content">
      <li  @click="ClickTeam()" style="Bold">Team Name: {{ team_name }}</li>
      <li style="Bold">Coach name: {{ team_coach }}</li>
      <li style="Bold">Team ID: {{ team_id }}</li>     
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
      required: true,
    },
    team_coach: {
      type: String,
      required: true,
    },
  },
  methods:{
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
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
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
