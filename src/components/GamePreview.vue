<template>
  <div class="game-preview">
    <div :title="id" class="game-title"><b>Game Id:</b> {{ id }}</div>
    <ul class="game-content">
      <li @click="clickTeam(home_team_id)">host: {{ hostTeam }}</li>
      <li @click="clickTeam(away_team_id)">guest: {{ guestTeam }}</li>
      <li>date: {{ date }}</li>
      <li>time: {{ hour }}</li>

    </ul>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    hostTeam: {
      type: String,
      required: true,
    },
    guestTeam: {
      type: String,
      required: true,
    },
    homeTeamID: {
      type: String,
      required: false,     
    },
    awayTeamID: {
      type: String,
      required: false,     
    },
    date: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
  },
  methods: {
    clickTeam(id){
      this.$router.push(`/TeamPage/:${id}`);
    }
  },
  mounted() {
    console.log("game preview mounted");
  },
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}
</style>
