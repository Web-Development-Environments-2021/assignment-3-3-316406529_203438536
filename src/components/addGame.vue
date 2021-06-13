<template>
  <b-form>
    <b-form-group
      id="input-group-away_team_id"
      label-cols-sm="3"
      label="Away Team ID:"
      label-for="away_team_id"
    >
      <b-form-input v-model="away_team_id" type="number"></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-home_team_id"
      label-cols-sm="3"
      label="Home Team ID:"
      label-for="home_team_id"
    >
      <b-form-input v-model="home_team_id" type="number"></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-field"
      label-cols-sm="3"
      label="field:"
      label-for="field"
    >
      <b-form-input v-model="field" type="text"></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-referee_name"
      label-cols-sm="3"
      label="Referee Name:"
      label-for="referee_name"
    >
      <b-form-input v-model="referee_name" type="text"></b-form-input>
    </b-form-group>

    <b-form-datepicker
      id="example-datepicker"
      v-model="date"
      class="mb-2"
    ></b-form-datepicker>
    <b-form-timepicker v-model="hour" locale="en"></b-form-timepicker>

    <b-button @click="AddGame()"> Add Game </b-button>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      hour: "",
      away_team_id: 0,
      home_team_id: 0,
      field: "",
      referee_name: "",
    };
  },
  methods: {
    async AddGame() {
      try {
        this.axios.defaults.withCredentials = true;
        console.log("enter to add game post API");
        const response = await this.axios.post(
          "http://localhost:3000/games/LeagueManagment/addGame",
          {
            date: this.date,
            hour: this.hour,
            away_team_id: this.away_team_id,
            home_team_id: this.home_team_id,
            field: this.field,
            referee_name: this.referee_name,
          }
        );
        console.log(response);
        this.axios.defaults.withCredentials = false;

        this.$root.toast("add Game", response.data, "success");
      } catch (err) {
        console.log(response);
        console.log(err.response.data);
        this.$root.toast("add Game", response.data, "fail");
        // this.toast("add Game", this.form.submitError, "failed");
      }
    },
  },
};
</script>
