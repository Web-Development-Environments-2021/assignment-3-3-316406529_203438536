<template>
  <div>
    <!-- <img :src="image_path" /> -->
    <h1>Coach Page</h1>
    <b-img v-if="info.image_url != null" fluid :src="info.image_path"></b-img>
    <ul>
      <li>Current team: {{ info.currentTeamName }}</li>
      <li>Common name: {{ info.commonName }}</li>
      <li>Birthdate: {{ info.birthdate }}</li>
      <li>Birth country: {{ info.birthcountry }}</li>
      <li>Nationality: {{ info.nationality }}</li>
    </ul>
    <!-- <div>
        <b-button
          size="lg"
          id="addFavoritePlayer"
          pill
          variant="outline-danger"
          @click="addPlayerToFavorites()"
          >Add to favorite</b-button
        >
      </div> -->
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
    console.log("enter coach page mounte!");
    const coach_id = this.$route.params.id.replace(":", "");
    const result = await axios.get(
      `http://127.0.0.1:3000/coaches/coachDetails/${coach_id}`
    );
    console.log(result);
    this.info = result.data;
  },
};
</script>

<style></style>
