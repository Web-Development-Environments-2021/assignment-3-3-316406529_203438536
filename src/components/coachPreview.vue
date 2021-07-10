<template>
  <div class="coach-preview">
    <div :title="Coach - Id" class="coach-title">
      <router-link :to="`/CoachPage/:${this.coach_id}`"
        ><b>{{ coach_name }}</b></router-link
      >
    </div>
    <ul class="coach-content">
      <li v-if="image != null">
        <b-img :src="image"></b-img>
      </li>
      <li>Full Name: {{ coach_name }}</li>
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
      default: () =>
        "https://sc04.alicdn.com/kf/U821fdbb2bbdc42fa92cbb62d4b74d612h.jpg",
    },
  },
  methods: {
    moveToCoachPage() {
      //the function using the router - move to coach page
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
