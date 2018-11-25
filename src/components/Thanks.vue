<template>
<div>
Thanksページ
<HeadComp></HeadComp>
<button v-on:click="buttonAction">{{button}}</button>
<!-- <router-link to="/"  v-on:click="buttonAction" >フォームに戻る</router-link> -->
</div>
</template>

<script>
import HeadComp from '@/components/modules/Head'
import TextareaComp from '@/components/modules/Textarea'
import StringComp from '@/components/modules/String'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'thanks',
  methods: mapActions('Form', {
    'buttonAction': 'buttonAction'
  }),
  computed: mapGetters('Form', {
    'button': 'getButton',
  }),
  components: {
    HeadComp,
    TextareaComp,
    StringComp
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
