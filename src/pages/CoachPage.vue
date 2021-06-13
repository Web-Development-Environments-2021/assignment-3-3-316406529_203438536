<template>
  <div>
    <!-- <img :src="image_path" /> -->
    <h1>Coach Page</h1>
    <b-img fluid :src="info.image_path"></b-img>
    <ul>
      <li></li>
      <!-- <li>Current team: {{ info.team_name }}</li>
        <li>Player position: {{ info.position_id }}</li>
        <li>Common name: {{ info.common_name }}</li>
        <li>Birthdate: {{ info.birthdate }}</li>
        <li>Birth country: {{ info.birthcountry }}</li>
        <li>Nationality: {{ info.nationality }}</li>
        <li v-if="info.height != null">Height: {{ info.height }}</li>
        <li v-if="info.weight != null">Weight: {{ info.weight }}</li> -->
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
    const result = await axios.get(`/coaches/coachDetails/${coach_id}`);
    console.log(result);
    this.info = result.data;
  },
};
</script>

<style></style>
