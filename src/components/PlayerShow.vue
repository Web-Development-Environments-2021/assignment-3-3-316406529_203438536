<template>
  <div class="player-preview">
    <div :title="PlayerID" class="player-title">
      <b>Player Name:</b> {{ fullname }}
    </div>
    <ul class="player-content">
      <li>Full Name: {{ fullname }}</li>
      <li v-on:click="PlayerPage">Team Name: {{ teamName }}</li>
      <li>Photo: {{ photoPath }}</li>
      <li>PositionID: {{ PositionID }}</li>
      <li>nationality: {{nationality}}</li>
    <div v-if="showMore==true">
      <li>birthdate: {{birthdate}}</li>
      <li>birthplace: {{birthplace}}</li>
      <li>height: {{height}}</li>
      <li>weight: {{weight}}</li>
      <li>playerPosition: {{playerPosition}}</li>
      <li>common_name: {{common_name}}</li>
    </div>
    <b-button id="b" @click="showMoreFunc()" variant="success">show More</b-button>



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
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    playerPosition: {
      type: String,
      required: false
    },
    image_path: {
      type: String,
      required: false
    },
    
  },
  data(){
    return{
      showMore: false
    }
  },
  methods:{
    showMoreFunc(){if(this.showMore){this.showMore =false;}else{this.showMore=true;}}
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
#b{
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
