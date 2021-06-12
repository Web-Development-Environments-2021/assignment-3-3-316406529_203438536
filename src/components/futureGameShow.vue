<template>
    <b-table :items="FutureItems" :fields="FutureFields" :busy="isBusy" 
        :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sort-icon-left responsive="sm">
            <template #cell(eventSchedule)="data">
            <b-button v-b-modal.gameEvents @click="CurEventData(data.value)">Game Events List</b-button>
            </template>
            <template #table-busy>
            <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
            </div>
        </template>
    </b-table>
</template>

<script>

export default ({
    props:{
        FutureItems: {
            type: Number,
            required: true,
        },
        FutureFields: {
            type: Number,
            required: true,
        },
        isBusy: {
            type: Number,
            required: true,
        },
    },
    data(){
        return{
            sortBy: 'age',
            sortDesc: false,
        }
    },
})
</script>

