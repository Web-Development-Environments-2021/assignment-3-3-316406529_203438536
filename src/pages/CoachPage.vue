<template>
  <div class="container">
    <h1>{{ info.fullname }}</h1>
    <div class="coach_preview">
      <ul>
        <li>
          <b-img
            fluid
            height="150px"
            width="150px"
            :src="this.info.image_url"
          ></b-img>
        </li>
        <l>Current team: {{ info.currentTeamName }}</l>
        <li>Common name: {{ info.commonName }}</li>
        <li>Birthdate: {{ info.birthdate }}</li>
        <li>Birth country: {{ info.birthcountry }}</li>
        <li>Nationality: {{ info.nationality }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CoachPage",
  components: {},
  data() {
    return {
      info: null,
    };
  },
  async mounted() {
    //move to the coach page
    console.log("enter coach page mounte!");
    const coach_id = this.$route.params.id.replace(":", "");
    const result = await axios.get(
      `http://127.0.0.1:3000/coaches/coachDetails/${coach_id}`
    );
    console.log(result);
    this.info = result.data;
    //set default image for coach
    if (result.data.image_url === null) {
      this.info.image_url =
        "https://sc04.alicdn.com/kf/U821fdbb2bbdc42fa92cbb62d4b74d612h.jpg";
    }
  },
};
</script>

<style>
.coach_preview {
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
