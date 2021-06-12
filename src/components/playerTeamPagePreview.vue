<template>
  <div class="player-in-team-preview">
    <div :title="PlayerID" class="player-in-team-title"></div>
    <ul class="player-in-team-content">
      <!-- <li>Full Name: {{ fullname }}</li> -->
      <!-- <li f :to="{name:'PlayerPage', params:{id:84658 }}"> Team Name: {{ teamName }}</li> -->
      <!-- <b-click herf="PlayerPage/84658"> Team Name: {{ teamName }}</li> -->
      <!-- <li @click="ClickTeam()" style="Bold">Team Name: {{ teamName }}</li> -->
      <li @click="showPlayerCard()">
        <b>{{ name }}</b>
      </li>

      <li>Photo: {{ image }}</li>
      <!-- <li>PositionID: {{ PositionID }}</li> -->
      <li>nationality: {{ nationality }}</li>
      <li>Birthdate: {{ birthdate }}</li>
      <!-- <div v-if="showMore == true">
        <li>birthdate: {{ birthdate }}</li>
        <li v-if="birthplace != null">birthplace: {{ birthplace }}</li>
        <li v-if="height != null">height: {{ height }}</li>
        <li v-if="weight != null">weight: {{ weight }}</li>
        <li>playerPosition: {{ playerPosition }}</li>
        <li>common_name: {{ common_name }}</li>
      </div> -->
      <!-- <b-button id="b" @click="showMoreFunc()" variant="success"
        >show More</b-button
      > -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "playerTeamPagePreview",
  props: {
    PlayerID: {
      type: Number,
      required: true,
    },
    common_name: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    birthdate: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  methods: {
    showPlayerCard() {
      console.log("click on player name");
      this.$router.push(`/PlayerPage/:${this.PlayerID}`);
    },
  },
  mounted() {
    console.log("Player team page show mounted");
  },
};
</script>

<style>
.player-in-team-preview {
  display: inline-block;
  width: 300px;
  height: flex;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
  margin-top: 20px;
}
#b {
  margin-top: 10px;
}

.player-in-team-preview .player-in-team-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.player-in-team-preview .player-in-team-content {
  width: 100%;
  overflow: hidden;
}
</style>
