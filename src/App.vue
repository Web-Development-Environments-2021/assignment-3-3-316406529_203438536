<template>
  <div id="app">
    <b-navbar fixed="top" sticky toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{ name: 'main' }" id="nav-bar-brand"
        >Superliga Vue</b-navbar-brand
      >
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="nav-bar-item-css" :to="{ name: 'main' }"
            >Main</b-nav-item
          >
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'curStageGames' }"
            >Currect Stage Games</b-nav-item
          >
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item disabled>Hello, {{ userInUse }}</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item @click="Logout()">Log out</b-nav-item>
          <b-nav-item v-if="isAdmin" :to="{ name: 'LeagueManagment' }"
            >League Manage</b-nav-item
          >

          <b-nav-item-dropdown right>
            <template #button-content>
              My Account
            </template>
            <b-dropdown-item @click="showFavoriteGames()"
              >⚽ My Games</b-dropdown-item
            >
            <b-dropdown-item @click="showFavoriteTeams()"
              >👨🏿‍🤝‍👨🏾 My Teams</b-dropdown-item
            >
            <b-dropdown-item @click="showFavoritePlayers()"
              >⛹️‍♂️ My Players</b-dropdown-item
            >
            <b-dropdown-item @click="showUserDetails()"
              >📸 My Details</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
import LoginPage from "./pages/LoginPage";

export default {
  name: "App",
  methods: {
    async Logout() {
      //send post request to the server to logout the current user and clear the user data the stored
      try {
        console.log("log out method");
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          "http://localhost:3000/user/logOut"
        );
        this.$root.toast("Logout", "User logged out successfully", "success");
        this.axios.defaults.withCredentials = false;
        this.$root.store.logout();
        console.log("finished log oout method main page");
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      } catch {
        this.$root.toast(
          "Logout",
          "Comunication with server week, log-out agian",
          "success"
        );
      }
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
    showUserDetails() {
      this.$router.push("/userPage");
    },
    async setSearchAutoCompleteData() {
      console.log("enter get aouto complete data");
      const searchAutoComlateData = await this.axios.get(
        "http://localhost:3000/league/getSeachOutoCompleteData"
      );
      this.$root.store.setAutoCompleteSearchData(searchAutoComlateData);
    },
  },
  component: {
    LoginPage,
  },
  computed: {
    userInUse() {
      if (this.$root.store.username) {
        return this.$root.store.username;
      }
      return "Guest";
    },
    isAdmin() {
      if (this.$root.store.username == "admin") {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.setSearchAutoCompleteData(); //occur once when building the app. (keep in comment)
    this.$root.store.setItem("favGames", []);
    localStorage.setItem("searchQuery", JSON.stringify(""));
    localStorage.setItem("searchTeam", JSON.stringify(""));
    localStorage.setItem("searchLocation", JSON.stringify(""));
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
  // background-color: #c0f1f3;
  background-image: url("./assets/background3.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100%;
}

#nav {
  padding: 30px;
}
#nav-bar-brand:hover {
  color: #45574fd0;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.nav-bar-item-css:hover {
  color: #45574fd0;
}
.title {
  color: #445858;
  text-align: center;
}
</style>
