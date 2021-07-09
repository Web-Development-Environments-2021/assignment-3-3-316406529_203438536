import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  InputGroupPlugin,
  TablePlugin,
  ModalPlugin,
  FormDatepickerPlugin,
  FormTimepickerPlugin,
  ImagePlugin,
  IconsPlugin,
  SpinnerPlugin,
  FormFilePlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  InputGroupPlugin,
  TablePlugin,
  ModalPlugin,
  FormDatepickerPlugin,
  FormTimepickerPlugin,
  ImagePlugin,
  IconsPlugin,
  SpinnerPlugin,
  FormFilePlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: sessionStorage.username,
  AutoCompleteSearchData: localStorage.autoCompleteSearchData,
  // searchQuery: localStorage.searchQuery,
  // searchTeam: localStorage.searchTeam,
  // searchLocation: localStorage.searchLocation,
  // teams: JSON.parse(localStorage.getItem("teams")),
  // players: JSON.parse(localStorage.getItem("players")),
  favGames: localStorage.favGames,
  favPlayers: localStorage.favPlayers,
  favTeams: localStorage.favTeams,
  LeagueGames: localStorage.LeagueGames,
  login(username) {
    console.log("log In main page");
    sessionStorage.setItem("username", username);
    this.username = username;
    // this.favGames= [];
    // this.favPlayers=[];
    // this.favTeams= [];
    // this.players=[];
    // this.teams= [];
    this.searchQuery="";
    this.searchTeam="";
    this.searchLocation="";

    console.log(this.favGames);
    // console.log(this.favPlayers);
    // console.log(this.favGames);
    // console.log(this.username);

  },
  logout() {
    this.loggedIn = false;
    console.log("logout");
    this.username = undefined;
    // localStorage.removeItem("searchQuery", JSON.stringify(searchQuery));
    // localStorage.removeItem("searchTeam",  JSON.stringify(searchTeam));
    // localStorage.removeItem("searchLocation",  JSON.stringify(searchLocation));
    localStorage.removeItem("players");
    localStorage.removeItem("teams");
    this.favGames= [];
    this.favPlayers=[];
    this.favTeams= [];
    localStorage.removeItem("favGames",  JSON.stringify(teams));
    localStorage.removeItem("favPlayers",  JSON.stringify(teams));
    localStorage.removeItem("favTeams",  JSON.stringify(teams));
  },
  setAutoCompleteSearchData(data) {
    localStorage.setItem("autoCompleteSearchData", data);
    this.AutoCompleteSearchData = data;
  },
  // setStoredData(searchQuery, searchTeam, searchLocation, players, teams) {
  //   // localStorage.setItem("searchQuery", searchQuery);
  //   // localStorage.setItem("searchTeam", searchTeam);
  //   // localStorage.setItem("searchLocation", searchLocation);
  //   // localStorage.setItem("players",  JSON.stringify(players));
  //   // localStorage.setItem("teams",  JSON.stringify(teams));
  //   this.searchQuery = searchQuery;
  //   this.searchTeam = searchTeam;
  //   this.searchLocation = searchLocation;
  //   // this.players = players;
  //   this.teams = teams;
  // },
  setItem(name, value) {
    localStorage.setItem(name, value);
  },
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
