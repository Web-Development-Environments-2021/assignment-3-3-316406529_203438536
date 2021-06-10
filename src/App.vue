<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }">Superliga Vue</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'main' }">Main</b-nav-item>
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'curStageGames' }"
            >Currect stage games</b-nav-item
          >
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item>{{ userInUse }}</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item @click="Logout()">Log out</b-nav-item>
          <b-nav-item-dropdown right>
            <template #button-content>
              My Account
            </template>
            <b-dropdown-item @click="showFavoriteGames()">Favorites Games</b-dropdown-item>
            <b-dropdown-item @click="showFavoriteTeams()">Favorites Teams</b-dropdown-item>
            <b-dropdown-item @click="showFavoritePlayers()">Favorites Players</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
// import { component } from './components';
// import { component } from 'vue/types/umd';

import LoginPage from "./pages/LoginPage";

export default {
  name: "App",
  methods: {
    async Logout() {
      console.log("log out method");
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      const response = await this.axios.post(
        "https://localhost:3000/user/logOut"
      );
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    showFavoriteGames() {
      this.$router.push("/users/FavoriteGames");
    },
    showFavoriteTeams() {
      this.$router.push("/users/FavoriteTeams");
    },
    showFavoritePlayers() {
      console.log("enter show fav. players");
      this.$router.push("/users​/FavoritePlayers");
    },
    async setSearchAutoCompleteData(){
      console.log("enter get aouto complete data");
      const searchAutoComlateData = await this.axios.get(
        "http://localhost:3000/league/getSeachOutoCompleteData"
      );
      this.$root.store.setAutoCompleteSearchData(searchAutoComlateData);
    }
  },
  component: {
    LoginPage,
  },
  computed: {
    userInUse() {
      if(this.$root.store.username){
        return this.$root.store.username;
      }
      return "Guest"
    }
  },
  mounted() {
    // this.setSearchAutoCompleteData();
    this.$root.store.setStoredData("","","","","");
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
