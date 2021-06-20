<template>
  <div class="player-preview">
    <div :title="PlayerID" class="player-title" @click="ClickPlayer()">
      <b>Player Name:</b> {{ fullname }}
    </div>
    <ul class="player-content">
      <li><b-img :src="image_path"></b-img></li>
      <!-- <li @click="ClickPlayer()">Full Name: {{ fullname }}</li> -->
      <router-link :to="`/PlayerPage/:${this.PlayerID}`"
        >Full name: {{ fullname }}</router-link
      >
      <br />
      <!-- <li f :to="{name:'PlayerPage', params:{id:84658 }}"> Team Name: {{ teamName }}</li> -->
      <!-- <b-click herf="PlayerPage/84658"> Team Name: {{ teamName }}</li> -->
      <!-- <li @click="ClickTeam()" style="Bold">Team Name: {{ teamName }}</li> -->
      <router-link :to="`/TeamPage/:${this.teamID}`"
        >Team Name: {{ teamName }}</router-link
      >
      <li>PositionID: {{ PositionID }}</li>
      <li>nationality: {{ nationality }}</li>
      <div v-if="showMore == true">
        <li>birthdate: {{ birthdate }}</li>
        <li v-if="birthplace != null">birthplace: {{ birthplace }}</li>
        <li v-if="height != null">height: {{ height }}</li>
        <li v-if="weight != null">weight: {{ weight }}</li>
        <li>playerPosition: {{ playerPosition }}</li>
        <li>common_name: {{ common_name }}</li>
      </div>
      <b-button id="b" @click="showMoreFunc()" variant="success"
        >show More</b-button
      >
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
    common_name: {
      type: String,
      required: false,
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
    PositionID: {
      type: Number,
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
    birthplace: {
      type: String,
      required: false,
    },
    height: {
      type: String,
      required: false,
    },
    weight: {
      type: String,
      required: false,
    },
    playerPosition: {
      type: String,
      required: false,
    },
    image_path: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      showMore: false,
    };
  },
  methods: {
    showMoreFunc() {
      if (this.showMore) {
        this.showMore = false;
      } else {
        this.showMore = true;
      }
    },
    ClickTeam() {
      this.$router.push(`/TeamPage/:${this.teamID}`);
    },
    ClickPlayer() {
      this.$router.push(`/PlayerPage/:${this.PlayerID}`);
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
  width: 300px;
  height: flex;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
  margin-top: 20px;
  background-color: rgba(215, 237, 241, 0.616);
}
#b {
  margin-top: 10px;
}

.player-preview .player-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.player-preview .player-content {
  width: 100%;
  overflow: hidden;
  background-color: rgba(215, 237, 241, 0.616);
}
</style>
