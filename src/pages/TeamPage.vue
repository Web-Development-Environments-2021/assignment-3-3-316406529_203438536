<template>
  <div class="container">
    <h1>Team Page</h1>
    <h1 v-if="id!=null">{{id}} noam Kotlar</h1>
    <h1 v-else>Team ID Error</h1>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  name: "PlayerShow",
  props: {
    id: {
      type: Number,
      required: false,
    },
  }
}
</script>
