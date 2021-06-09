<template>
  <div class="team-preview">
    <div :title="id" class="team-title"><b>Team id:</b> {{ id }}</div>
    <ul class="team-content">
      <li>
        Team players:
        <div>
          <PlayerShow
            v-for="p in players"
            :PlayerID="p.PlayerID"
            :fullname="p.fullname"
            :teamName="p.teamName"
            :teamID="p.teamID"
            :photoPath="p.photoPath"
            :PositionID="p.PositionID"
            :key="p.PlayerID"
          ></PlayerShow>
        </div>
      </li>
      <li>team_coach: {{ team_coach }}</li>
      <li>
        Team games:
        <div>
          <GamePreview
            v-for="g in team_games"
            :id="g.id"
            :hostTeam="g.hostTeam"
            :guestTeam="g.guestTeam"
            :date="g.date"
            :hour="g.hour"
            :key="g.id"
          ></GamePreview>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
import PlayerShow from "./PlayerShow.vue";
export default {
  components: { PlayerShow, GamePreview },
  name: "TeamPreview",
  props: {
    team_id: {
      type: Number,
      required: true,
    },
    team_players: {
      type: Array,
      required: true,
    },
    team_coach: {
      type: Array,
      required: true,
    },
    team_games: {
      type: Array,
      require: false,
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
  width: 250px;
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
