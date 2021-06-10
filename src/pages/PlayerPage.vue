<template>
  <div class="container">
    <h1>Player Page</h1>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default {
  name: "PlayerShow",
  props: {
    PlayerID: {
      type: Number,
      required: true,
    },
  }
}
</script>
