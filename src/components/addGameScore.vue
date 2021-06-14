<template>
    <b-form>
        <b-form-group
        id="input-group-home_team_goal"
        label-cols-sm="3"
        label="Home Team Goal:"
        label-for="home_team_goal">
        <b-form-input
            v-model="home_team_goal"
            id="home_team_goal"
            type="number"
        ></b-form-input>
        </b-form-group>

        <b-form-group
        id="input-group-away_team_goal"
        label-cols-sm="3"
        label="Away Team Goal:"
        label-for="away_team_goal">
        <b-form-input
            v-model="away_team_goal"
            id="away_team_goal"
            type="number"
        ></b-form-input>
        </b-form-group>

        <b-button @click="AddGameScore()"> Add Game Score</b-button>

    </b-form>
</template>

<script>
    export default {
        props: {
            game_id: {
            type: Number,
            required: true,
            },
        },
        data(){
            return{
                home_team_goal: 0,
                away_team_goal: 0,
            }
        },
        methods: {
            async AddGameScore(){
                try{
                    this.$root.toast("Add Score", "Adding Score to system, please wait....", "success");
                    console.log("addScore");
                    this.axios.defaults.withCredentials = true;
                    const response = await this.axios.post(
                        "http://localhost:3000/games/LeagueManagment/addScore",
                    {
                        home_team_goal: this.home_team_goal,
                        away_team_goal: this.away_team_goal,
                        game_id: this.game_id,

                    }
                    );
                    this.axios.defaults.withCredentials = false;
                    this.$root.toast("Add score", response.data, "success");
                }
                catch(err){
                    console.log(err.response.data);
                    this.$root.toast("Add score", err.response.data, "failed");
                }
            }
        },
        mounted() {
            console.log(this.game_id);
        },

    }
</script>
