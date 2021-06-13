<template>
  <div class="team-preview">
    <div :title="team_id" class="team-title">
      <!-- <b>{{ team_name }}</b> -->
    </div>
    <ul class="team-content">
      <li>
        Team players:
        <div>
          <PlayerTeamPagePreview
            v-for="p in team_players"
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
            :coach_name="team_coach.coach_name"
            :coach_id="team_coach.coach_id"
            :image="team_coach.image_path"
          ></CoachPreview>
        </div>
      </li>
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
// import PlayerShow from "./PlayerShow.vue";
import PlayerTeamPagePreview from "../components/playerTeamPagePreview.vue";
// import CoachPreview from "../components/CoachPreview.vue";
import CoachPreview from "./CoachPreview.vue";
export default {
  components: { GamePreview, PlayerTeamPagePreview, CoachPreview },
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
  width: 100%;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  /* border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue; */
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
