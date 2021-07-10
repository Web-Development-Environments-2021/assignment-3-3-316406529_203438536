<template>
  <div class="player-preview">
    <div :title="PlayerID" class="player-title" @click="ClickPlayer()">
      <b>Player Name:</b> {{ fullname }}
    </div>
    <ul class="player-content">
      <li><b-img :src="image_path"></b-img></li>
      <router-link :to="`/PlayerPage/:${this.PlayerID}`"
        >Full name: {{ fullname }}</router-link
      >
      <br />

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
      default: () => "Boaz",
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
      default: () => "no Data",
    },
    height: {
      type: String,
      required: false,
      default: () => "no Data",
    },
    weight: {
      type: String,
      required: false,
      default: () => "no Data",
    },
    playerPosition: {
      type: String,
      required: false,
      default: () => "no Data",
    },
    image_path: {
      type: String,
      required: false,
      default: () =>
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhe.wikipedia.org%2Fwiki%2F%25D7%25A7%25D7%2595%25D7%2591%25D7%25A5%3ASoccerball.svg&psig=AOvVaw3cK-bXeqYjd14Q7pFVZy7u&ust=1625954416359000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCLDc7a3-1vECFQAAAAAdAAAAABAD",
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
