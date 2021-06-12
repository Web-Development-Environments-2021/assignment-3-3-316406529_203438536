<template>
    <b-table :items="EventsList" :fields="keys" sort-icon-left responsive="sm">
    </b-table>
</template>

<script>
export default {
    name: "gameEventsShow",
    data(){
        return{
            items: [],
            keys: [
                {key: 'event_id', sortable: true},
                {key: 'game_id', sortable: true},
                {key: 'event_date', sortable: true},
                {key: 'event_hour', sortable: true},
                {key: 'game_minute', sortable: true},
                {key: 'event_type', sortable: true},
                {key: 'player_id', sortable: true},
            ],

      }
  },
  props: {
    EventsList: {
      type: Array,
      required: true,

  },
  },
  mounted() {
    console.log("game EVENTS show ");
    console.log(this.EventsList);
  },
};
</script>

<style>
.event-preview {
  display: inline-block;
  width: 300px;
  height: flex;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
  margin-top: 20px;
}
#b {
  margin-top: 10px;
}

.event-preview .event-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.event-preview .event-content {
  width: 100%;
  overflow: hidden;
}
</style>
