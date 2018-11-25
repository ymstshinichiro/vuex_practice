import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

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
    button: ["確認", "送信", "フォームに戻る"],
    component: ["TextareaComp", "StringComp"]
  },
  mutations: {
    setStepCount (state, rootState) {
      console.log("setStepCount")
    }
  },
  actions: {
    buttonAction({ commit, state, rootState })  {
      console.log("buttonAction")
      if (rootState.errorFlag) {
        commit('setStepCount', null, {root: true})//rootへのアクセス
      }
      if (rootState.stepCount == 2) {
        router.push('thanks')
      }
      if (rootState.stepCount == 3) {
        router.push('/')
        commit('clear', null, {root: true})//rootへのアクセス
      }
    }
  },
  getters: {
    getButton (state, getters, rootState) {
      return state.button[rootState.stepCount]
    },
    getComponent (state, getters, rootState) {
      return state.component[rootState.stepCount]
    },
  }
}

const Textarea = {
  namespaced: true,//名前空間を有効にする
  state: {
    errorMsg: "入力は必須です",
  },
  getters: {
    getError (state, getters, rootState) {
      console.log(rootState.errorFlag);
      if (rootState.errorFlag) {
        return null
      } else {
        return state.errorMsg
      }
    }
  }
}


const String = {
  namespaced: true,//名前空間を有効にする
  getters: {
    getString (state, getters, rootState) {
      return rootState.impression
    }
  }
}

export default new Vuex.Store({
  state: {
    stepCount: 0,
    impression: "",
    errorFlag: false//trueなら通過
  },
  mutations: {
    setStepCount (state) {
      console.log("rootsetStepCount")
      state.stepCount++
    },
    updateImpression (state, value) {
      state.impression = value
      console.log(state.impression)
      if (state.impression) {
        state.errorFlag = true
      } else {
        state.errorFlag = false
      }
    },
    clear (state) {
      console.log("clearMutation")
      state.stepCount = 0
      state.impression = ""
      state.errorFlag = false
    }
  },
  actions: {
    clear (context) {
      console.log("clearAction")
      context.commit('clear')
    }
  },
  modules: {
    head,
    Form,
    Textarea,
    String
  }
})
