<template>
  <div class="container">
    <h1>Player Page</h1>
    <div>
      <PlayerShow
        :fullname="fullname"
        :image_path="image_path"
        :birthdate="birthdate"
        :nationality="nationality"
        :common_name="common_name"
        :height="height"
        :weight="weight"
        :PositionID="position_id"
      ></PlayerShow>
    </div>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import PlayerShow from "../components/PlayerShow.vue";
export default {
  name: "PlayerPageComponent",
  components: { PlayerShow },
  data() {
    return {
      fullname: "Stephan Maigaard Andersen",
      image_path:
        "https://cdn.sportmonks.com/images/soccer/players/2/26722.png",
      common_name: "S. Andersen",
      position_id: 1,
      nationality: "Denmark",
      height: "190 cm",
      birthcountry: "Denmark",
      birthdate: "26/11/1981",
      team_name: "København",
      team_id: 85,
      weight: 80,
    };
  },
  mounted() {
    console.log("enter specific player page");
  },
};
</script>
