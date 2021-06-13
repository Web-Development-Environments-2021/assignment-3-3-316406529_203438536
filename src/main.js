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
  username: localStorage.username,
  AutoCompleteSearchData: localStorage.autoCompleteSearchData,
  searchQuery: localStorage.searchQuery,
  searchTeam: localStorage.searchTeam,
  searchLocation: localStorage.searchLocation,
  teams: localStorage.teams,
  players: localStorage.players,
  favGames: localStorage.favGames,
  favPlayers: localStorage.favPlayers,
  favTeams: localStorage.favTeams,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    this.loggedIn=false;
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
  },
  setAutoCompleteSearchData(data) {
    localStorage.setItem("autoCompleteSearchData", data);
    this.AutoCompleteSearchData = data;
  },
  setStoredData(searchQuery, searchTeam, searchLocation, players, teams) {
    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("searchTeam", searchTeam);
    localStorage.setItem("searchLocation", searchLocation);
    localStorage.setItem("searchLocation", players);
    localStorage.setItem("searchLocation", teams);
    this.searchQuery = searchQuery;
    this.searchTeam = searchTeam;
    this.searchLocation = searchLocation;
    this.players = players;
    this.teams = teams;
  },
  setFavGames(){
    localStorage.setItem("favGames", []);
  },
  setFavPlayers(){
    localStorage.setItem("favPlayers", []);
  },
  setFavTeams(){
    localStorage.setItem("favTeams", []);
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
