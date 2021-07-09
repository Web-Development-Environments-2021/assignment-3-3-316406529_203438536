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
                <a id="clickabble" @click="ClickTeam(data.value.home_team_id)">{{ data.value.home_team }}</a>
            </template>
            <template #cell(away_team)="data">
                <a id="clickabble" @click="ClickTeam(data.value.away_team_id)">{{ data.value.away_team }}</a>
            </template>
            <template #cell(add_to_favorite)="data">
                <b-button v-if="addButton" @click="addGamesToFavorites(data.value)">Add To Favorites</b-button>
                <b-button v-else disabled>Add To Favorites</b-button>
            </template>
            add_to_favorite
        </b-table>
        <b-modal v-if="curEventsList!=null" size="lg"  hide-footer id="gameEvents" title="Game Enets">
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
    computed:{
        addButton(){
            if(this.$root.store.username){
                return true;
            }
            return false;
        },
    },
    props:{
        Items: {
            type: Array,
            required: false,
            default: () => [],
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
            curEventsList: null,
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
        async addGamesToFavorites(gameID) {
            try {
                this.$root.toast(
                "Games Page",
                "Adding favorite, please wait....",
                "success"
                );
                this.axios.defaults.withCredentials = true;
                const respond = await this.axios.post(
                "http://localhost:3000/users/FavoriteGames",
                { game_id: gameID }
                );
                console.log(`data recived`);
                console.log(respond);
                this.axios.defaults.withCredentials = false;
                this.$root.toast(
                "Games Page",
                "The Games added successfuly",
                "success"
                );
            } catch (error) {
                console.log(console.error());
                this.$root.toast(
                "Games Page",
                "The Games added failed- duplication favorite Posible",
                "fail"
                );
            }
        },
    },

})
</script>

<style>
#clickabble:hover{
  font-weight: bold;
  cursor: pointer;
}
</style>

