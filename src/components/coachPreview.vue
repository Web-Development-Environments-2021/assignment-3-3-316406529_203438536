<template>
  <div class="coach-preview">
    <div :title="Coach - Id" class="coach-title">
      <router-link :to="`/CoachPage/:${this.coach_id}`"
        ><b>{{ coach_name }}</b></router-link
      >
    </div>
    <ul class="coach-content">
      <li v-if="image != null">Image : {{ image }}</li>
      <li>Full Name: {{ coach_name }}</li>

      <!-- <li f :to="{name:'PlayerPage', params:{id:84658 }}"> Team Name: {{ teamName }}</li> -->
      <!-- <b-click herf="PlayerPage/84658"> Team Name: {{ teamName }}</li> -->
      <!-- <li @click="ClickTeam()" style="Bold">Team Name: {{ teamName }}</li> -->

      <!-- <li>Photo: {{ image }}</li> -->
      <!-- <li>PositionID: {{ PositionID }}</li> -->
      <!-- <li>nationality: {{ nationality }}</li>
      <li>Birthdate: {{ birthdate }}</li> -->
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
  name: "CoachPreview",
  props: {
    coach_id: {
      type: Number,
      required: true,
    },
    coach_name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: false,
      default: () => "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhe.wikipedia.org%2Fwiki%2F%25D7%25A7%25D7%2595%25D7%2591%25D7%25A5%3ASoccerball.svg&psig=AOvVaw3cK-bXeqYjd14Q7pFVZy7u&ust=1625954416359000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCLDc7a3-1vECFQAAAAAdAAAAABAD"
    },
  },
  methods: {
    moveToCoachPage() {
      console.log("enter coach move to page");
      this.$router.push(`/CoachPage/:${this.coach_id}`);
    },
  },
  mounted() {
    console.log("caoch team page show mounted");
  },
};
</script>

<style>
.coach-preview {
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

.coach-preview .coach-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.coach-preview .coach-content {
  width: 100%;
  overflow: hidden;
}
</style>
