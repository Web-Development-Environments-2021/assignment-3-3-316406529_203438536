<template>
  <!-- <div>
    <b-card
      :title="fullname"
      :img-src="photoPath"
      img-alt="Image"
      :sub-title="common_name"
      img-top
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </b-card-text>

      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div> -->
  <div class="player-preview">
    <div :title="PlayerID" class="player-title">
      <b>Player Name:</b> {{ fullname }}
    </div>
    <ul class="player-content">
      <li>Full Name: {{ fullname }}</li>
      <!-- <li f :to="{name:'PlayerPage', params:{id:84658 }}"> Team Name: {{ teamName }}</li> -->
      <!-- <b-click herf="PlayerPage/84658"> Team Name: {{ teamName }}</li> -->
      <li @click="ClickTeam()" style="Bold">Team Name: {{ teamName }}</li>

      <li>Photo: {{ photoPath }}</li>
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
}
</style>
