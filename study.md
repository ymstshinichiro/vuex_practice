# 手順

src/router/index.js
ルーティングをするためのjs

```JavaScript
// `src/router/index.js`

import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello' //コンポーネントを読み込む

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', //パスを指定
      name: 'Hello',
      component: Hello // 上で読み込んだコンポーネントを指定
    }
  ]
})
```

---
# Formに書き換え
Formというコンポーネントを表示したいので、書き換えます

```JavaScript
// `src/router/index.js`

import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Form',
      component: Form
    }
  ]
})
```
---

# Form.vueを作成
書き換えるだけでは、もちろん対象ファイルがないのでエラーになります。
ファイルを作成しましょう！

`src/components/Hello.vue`をコピーします。
`src/components/Form.vue`という名前にしましょう。
これで、エラーは解消されたはずです。

---

# 必要な部分を残して消します。
`<template></template>`の中身を削除しちゃいましょう！
適当に書き換えてみます。
```JavaScript
<template>
<div>
Formページ
</div>
</template>
```

ロゴも残ってしまっているので、削除しましょう。
`src/App.vue`
`<img src="./assets/logo.png">`を削除します
```JavaScript
//modules/head.vue
<template>
  <div id="app">
   <!--ここを削除 <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>
```
# モジュールを作成します
今回はわかりやすいように`components/modules/`ディレクトリを作成します。
その下に以下のファイルを作っていきます。

- modules/Head.vue
- modules/Textarea.vue
- modules/String.vue
- modules/Button.vue

---
# まずHead.vue

`src/components/Form.vue`を`src/components/moduls/Head.vue`にコピーします。

```JavaScript
// `src/components/moduls/Head.vue`
<template>
<h1>{{title}}</h1>
</template>

<script>
export default {
  name: 'head',
  data () {
    return {
      title: '感想を入力'
    }
  }
}
</script>
```

# Head.vueをFormに登録
```JavaScript
// `src/components/Form.vue`
<template>
<div>
Formページ
<Head></Head>
</div>
</template>

<script>
import Head from '@/components/modules/Head'
export default {
  name: 'form',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Head
  }
}
</script>
```
---

# TextArea.vueを作成
```JavaScript
// `src/components/Textarea.vue`
<template>
<div>
  <p class="error">{{error}}</p>
  <textarea></textarea>
</div>
</template>

<script>
export default {
  name: 'textarea',
  data () {
    return {
      error: '入力は必須です'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
    color: red;
  }
</style>
```


```JavaScript
// `src/components/Form.vue`
<template>
<div>
Formページ
<Head></Head>
<Textarea></Textarea>
</div>
</template>

<script>
import Head from '@/components/modules/Head'
import Textarea from '@/components/modules/Textarea'
export default {
  name: 'form',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Head,
    Textarea
  }
}
</script>
```

---

# String.vueを作成
```JavaScript
// `src/components/modules/String.vue`

<template>
<p>{{string}}</p>
</template>

<script>
export default {
  name: 'string',
  data () {
    return {
      string: '入力された感想'
    }
  }
}
</script>
```

```JavaScript
// `src/components/Form.vue`
<template>
<div>
Formページ
<Head></Head>
<Textarea></Textarea>
<String></String>
</div>
</template>

<script>
import Head from '@/components/modules/Head'
import Textarea from '@/components/modules/Textarea'
import String from '@/components/modules/String'
export default {
  name: 'form',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Head,
    Textarea,
    String
  }
}
</script>

---
# Button.vueを作成

```
```JavaScript
// `src/components/modules/String.vue`
<template>
<button>{{button}}</button>
</template>

<script>
export default {
  name: 'button',
  data () {
    return {
      button: '確認'
    }
  }
}
</script>
```

```JavaScript
// `src/components/Form.vue`
<template>
<div>
Formページ
<Head></Head>
<Textarea></Textarea>
<String></String>
<Button></Button>
</div>
</template>

<script>
import Head from '@/components/modules/Head'
import Textarea from '@/components/modules/Textarea'
import String from '@/components/modules/String'
import Button from '@/components/modules/Button'
export default {
  name: 'form',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Head,
    Textarea,
    String,
    Button
  }
}
</script>
```
---
# モジュール作成完了!
お気づきでしょうか・・
dataが分散しています

これの管理を楽にするために一箇所に集めましょう。
ここでvuexの登場です。

---

# vuex構成
- getter
- state
- mutation
- action

今回は、store.jsにまとめて作成します。
---

# vuexをインストール
ターミナル上で`npm install --save vuex`
を入力します
``

---

# storeをmain.jsに登録する
```JavaScript
// src/main.js

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
```

---

# storeを作成します
`src/store/index.js`を作成してください

```JavaScript
//`src/store/index.js`

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const head = {
  state: {
    title: {
      form: "感想を入力",
      confirm: "確認画面",
      thanks: "送信完了"
    }
  },
  mutations: { },
  actions: { },
  getters: {
     getTitle (state, getters, rootState) {
      return state.title[rootState.status]
    }
  }
}

export default new Vuex.Store({
  state: {
   status: "form"
  },
  modules: {
    head
  }
})
```

```JavaScript
// src/component/modules/Head.vue
<template>
<h1>{{title}}</h1>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'head',
  computed: mapGetters({
     'title': 'getTitle'
    })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

```
---


computedとは算出プロパティいいい
statusをグローバルで管理し、statusに合った文言のtitleを返却しています。
state.XXXで自身のstateにアクセスが可能。
rootState.XXXでこの中でいうグローバルのstateにアクセスできます。

---
# メソッドを指定しましょう

butotnにオンクリックイベントを指定します。
```
// src/component/Form.vue
<template>
<div>
Formページ
<HeadComp></HeadComp>
<TextareaComp></TextareaComp>
<StringComp></StringComp>
<button v-on:click="buttonAction">{{button}}</button>
</div>
</template>

<script>
import HeadComp from '@/components/modules/Head'
import TextareaComp from '@/components/modules/Textarea'
import StringComp from '@/components/modules/String'
import { mapActions } from 'vuex'
export default {
  name: 'form',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      button: '確認'
    }
  },
  methods: mapActions({
    'buttonAction': 'buttonAction'
  }),
  components: {
    HeadComp,
    TextareaComp,
    StringComp
  }
}
</script>
```

```
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const head = {
  state: {
    title: {
      form: "感想を入力",
      confirm: "確認画面",
      thanks: "送信完了"
    }
  },
  mutations: { },
  actions: { },
  getters: {
     getTitle (state, getters, rootState) {
      return state.title[rootState.status]
    }
  }
}
const Form = {
  state: {
  },
  mutations: { },
  actions: {
    buttonAction({ commit, state })  {
     console.log("buttonAction");
    }
  },
  getters: {
  }
}

export default new Vuex.Store({
  state: {
   status: "form"
  },
  modules: {
    head,
    Form
  }
})
```

これで、メソッドを使うことができました。

stateをとりあえず変えてみましょう!
```JavaScript
// src/store/index.js
const Form = {
  state: {
  },
  mutations: { },
  actions: {
    buttonAction({ commit, state, rootState })  {
    console.log("buttonAction");
    rootState.status = "confirm";

    }
  },
  getters: {
  }
}
```
これで、ボタンを押したら、h1が変更されます。

---

# Formのstoreにstateとmutationを追加します

グローバルのアクセスが必要になるためnamespaceを追加します。
名前空間を追加するによって、どこのなんのstate,action,getterか明示できるようになります。

```
//store
const Form = {
  namespaced: true,
  state: {
    step: ['form', 'confirm', 'thanks']
  },
  mutations: {
    setStepCount (state, rootState) {
      console.log("setStepCount");
    }
  },
  actions: {
    buttonAction({ commit, state, rootState })  {
      console.log("buttonAction");
      commit('setStepCount', null, {root: true});//rootへのアクセス
    }
  },
  getters: {
  }
}

export default new Vuex.Store({
  state: {
   status: "form",
   stepCount: 0
  },
  mutations: {
    setStepCount(state) {
      console.log("rootsetStepCount");
      state.stepCount++;
    }
  },
  modules: {
    head,
    Form
  }
})
```
---
buttonの表示も変数化
```
//store
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const head = {
  state: {
    title: ["感想を入力", "確認画面", "送信完了"]
  },
  mutations: { },
  actions: { },
  getters: {
     getTitle (state, getters, rootState) {
      return state.title[rootState.stepCount]
    }
  }
}
const Form = {
  namespaced: true,
  state: {
    button: ["確認", "送信"]
  },
  mutations: {
    setStepCount (state, rootState) {
      console.log("setStepCount");
    }
  },
  actions: {
    buttonAction({ commit, state, rootState })  {
      console.log("buttonAction");
      commit('setStepCount', null, {root: true});//rootへのアクセス
    }
  },
  getters: {
     getButton (state, getters, rootState) {
      return state.button[rootState.stepCount]
    }
  }
}

export default new Vuex.Store({
  state: {
    stepCount: 0
  },
  mutations: {
    setStepCount(state) {
      console.log("rootsetStepCount");
      state.stepCount++;
    }
  },
  modules: {
    head,
    Form
  }
})
```
```
//Form
<script>
import HeadComp from '@/components/modules/Head'
import TextareaComp from '@/components/modules/Textarea'
import StringComp from '@/components/modules/String'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'form',
  methods: mapActions('Form', {
    'buttonAction': 'buttonAction'
  }),
  computed: mapGetters('Form', {
    'button': 'getButton'
  }),
  components: {
    HeadComp,
    TextareaComp,
    StringComp
  }
}
</script>
```

## 入力フォームページ時
nullチェックがしたい！
vuexでの値取得はどうするのか
```
```
コンポーネントの切り替え
```

<template>
<div>
Formページ
<HeadComp></HeadComp>
<component
  :is="isComponent"
></component>
<button v-on:click="buttonAction">{{button}}</button>
</div>
</template>

<script>
import HeadComp from '@/components/modules/Head'
import TextareaComp from '@/components/modules/Textarea'
import StringComp from '@/components/modules/String'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'form',
  methods: mapActions('Form', {
    'buttonAction': 'buttonAction'
  }),
  computed: mapGetters('Form', {
    'button': 'getButton',
    'isComponent': 'getComponent'
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

```


