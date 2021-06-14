<template>
  <div class="container">
    <!-- <h1 class="title">Main Page</h1> -->
    <div id="login-or-games-div">
      <LoginPage v-if="!$root.store.username" id="login-comp-css"></LoginPage>
      <FavoriteGames :showCunt="3" v-else></FavoriteGames>
    </div>
    <div id="leugue-info-div">
      <LeagueInfo></LeagueInfo>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LeagueInfo,
    LoginPage,
    FavoriteGames,
  },
};
</script>

<style lang="scss" scoped>
div.container {
  // margin: 10px 0 10px;

  // transform: translate(-10%, -10%);
  // border: 5px solid #ffff00;
  // padding: 10px;
  // margin: 0 auto;
  background-color: rgba(215, 237, 241, 0.61);
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
#login-or-games-div {
  position: -webkit-sticky;
  top: 10px;
  left: 20px;
  right: 200px;
  // background-color: rgba(215, 237, 241, 0.61);
}
#login-comp-css {
  position: absolute;
  left: 35%;
  top: 10%;
  right: 200px;
  background-color: rgba(215, 237, 241, 0.616);
}
#leugue-info-div {
  position: absolute;
  left: 20%;
  top: 20%;
  background-color: rgba(215, 237, 241, 0.616);
}
</style>
