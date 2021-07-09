<template>
  <div class="container">
    <div id="login-or-games-div">
      <LoginPage v-if="!$root.store.username" id="login-comp-css"></LoginPage>
      <FavoriteGames
        :showCunt="3"
        v-else
        id="fav-games-main-page"
      ></FavoriteGames>
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
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
#login-or-games-div {
  position: relative;
  left: 20%;
  width: 550px;
  top: 10px;
  background-color: rgba(215, 237, 241, 0.61);
}
#login-comp-css {
  position: fixed;
  left: 60%;
  max-height: 450px;
  max-width: 420px;
  top: 5%;
  background-color: rgba(215, 237, 241, 0.76);
}
#leugue-info-div {
  position: absolute;
  left: 10%;
  top: 24%;
}
#fav-games-main-page {
  position: absolute;
  top: 10%;
  left: 56%;
}
</style>
