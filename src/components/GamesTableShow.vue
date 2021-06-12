<template>
    <div>
        <b-table :items="Items" :busy="isBusy" :fields="Fields" sort-icon-left responsive="sm">
            <template #table-busy>
                <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
                </div>
            </template>
            <template #cell(eventSchedule)="data">
                <b-button v-b-modal.gameEvents @click="CurEventData(data.value)">Game Events List</b-button>
            </template>
            <template #cell(home_team)="data">
                <a @click="ClickTeam(data.value.home_team_id)">{{ data.value.home_team }}</a>
            </template>
            <template #cell(away_team)="data">
                <a @click="ClickTeam(data.value.away_team_id)">{{ data.value.away_team }}</a>
            </template>
        </b-table>
        <b-modal size="lg"  hide-footer id="gameEvents" title="Game Enets">
            <gameEvents id="gameEvents" :EventsList="curEventsList"></gameEvents>
        </b-modal>
    </div>
</template>

<script>
import gameEvents from "./gameEventsShow.vue";

export default ({
    components:{
        gameEvents,
    },
    props:{
        Items: {
            type: Array,
            required: false,
        },
        Fields: {
            type: Array,
            required: false,
        },        
    },
    data(){
        return{
            sortBy: 'age',
            sortDesc: false,
            curEventsList: [],
            isBusy: false,
        }
    },
    methods: {
        CurEventData(data){
            console.log(data);
            this.curEventsList = data;
            console.log(this.curEventsList);
        },
        setBusy(val){
            this.isBusy = val;
        },
        ClickTeam(id) {
            this.$router.push(`/TeamPage/:${id}`);
        },
    },

})
</script>

