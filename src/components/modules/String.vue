<template>
<p>{{string}}</p>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'string',
  computed: mapGetters('String', {
    'string': 'getString'
  }),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
