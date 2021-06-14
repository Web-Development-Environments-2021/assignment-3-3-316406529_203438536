<template>
    <b-form>
        <b-form-group
        id="input-group-game_minute"
        label-cols-sm="3"
        label="Game Minute:"
        label-for="game_minute">
        <b-form-input v-model="game_minute" id="game_minute" type="number"></b-form-input>
        </b-form-group>

        <b-form-group
        id="input-group-event_type"
        label-cols-sm="3"
        label="Event Type:"
        label-for="event_type">
        <b-form-input v-model="event_type" id="event_type" type="text" list="events"></b-form-input>
        <datalist id=events>
            <option v-for="eve in eventsList" :key="eve">{{ eve }}</option>
        </datalist>
        </b-form-group>

        <b-form-group
        id="input-group-player_id"
        label-cols-sm="3"
        label="player_id:"
        label-for="player_id">
        <b-form-input
            v-model="player_id"
            id="player_id"
            type="number"
        ></b-form-input>
        </b-form-group>

        <b-form-datepicker id="example-datepicker" v-model="date" class="mb-2"></b-form-datepicker>
        <b-form-timepicker v-model="hour" locale="en"></b-form-timepicker>

        <b-button @click="AddGameEvent()"> Add Game Event</b-button>

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
                date: "",
                hour: "",
                game_minute: 0,
                event_type: "",
                player_id: 0,
                eventsList: ['שער', 'נבדל', 'עבירה', 'כרטיס אדום', 'כרטיס צהוב', 'פציעה', 'חילוף שחקן' ],
            }
        },
        methods: {
            async AddGameEvent(){
                try{
                    this.$root.toast("Add Event", "Adding Event to system, please wait....", "success");
                    this.axios.defaults.withCredentials = true;
                    const response = await this.axios.post(
                        "http://localhost:3000/games/LeagueManagment/addEvent",
                    {
                        date: this.date,
                        hour: this.hour,
                        game_minute: this.game_minute,
                        event_type: this.event_type,
                        player_id: this.player_id,
                        game_id: this.game_id,

                    }
                    );
                    this.axios.defaults.withCredentials = false;
                    this.$root.toast("Add enent", response.data, "success");
                }
                catch(err){
                    console.log(err.response.data);
                    this.$root.toast("Add enent",  err.response.data, "failed");
                }
            }
        },
        mounted() {
            console.log(this.game_id);
        },

    }
</script>
