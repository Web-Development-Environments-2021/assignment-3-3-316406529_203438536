<template>
  <div class="player-in-team-preview">
    <div :title="PlayerID" class="player-in-team-title"></div>
    <ul class="player-in-team-content">
      <router-link :to="`/PlayerPage/:${this.PlayerID}`">{{
        name
      }}</router-link>
      <li><b-img :src="image"></b-img></li>
      <li>nationality: {{ nationality }}</li>
      <li>Birthdate: {{ birthdate }}</li>
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
      default: () => "no Data",
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
      default: () =>
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhe.wikipedia.org%2Fwiki%2F%25D7%25A7%25D7%2595%25D7%2591%25D7%25A5%3ASoccerball.svg&psig=AOvVaw3cK-bXeqYjd14Q7pFVZy7u&ust=1625954416359000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCLDc7a3-1vECFQAAAAAdAAAAABAD",
    },
  },
  methods: {
    showPlayerCard() {
      //move to the player page after pressing player name
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
  border-color: rgb(86, 136, 86);
  margin-top: 20px;
  background-color: rgba(191, 207, 211, 0.616);
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
