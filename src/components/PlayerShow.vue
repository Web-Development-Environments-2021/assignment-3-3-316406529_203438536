<template>
  <div class="player-preview">
    <div :title="PlayerID" class="player-title">
      <b>Player Name:</b> {{ fullname }}
    </div>
    <ul class="player-content">
      <li>Full Name: {{ fullname }}</li>
      <li>Team Name: {{ teamName }}</li>
      <li>Photo: {{ photoPath }}</li>
      <li>PositionID: {{ PositionID }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PlayerShow",
  props: {
    PlayerID: {
      type: Number,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    teamName: {
      type: String,
      required: true,
    },
    teamID: {
      type: Number,
      required: true,
    },
    photoPath: {
      type: String,
      required: true,
    },
    PositionID: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log("Player show mounted");
  },
};
</script>

<style>
.player-preview {
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

.player-preview .player-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.player-preview .player-content {
  width: 100%;
  overflow: hidden;
}
</style>
