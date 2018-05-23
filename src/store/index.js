import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

import createlogger from 'vuex/dist/logger'//打印日志

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'//本地开发的话 为严格模式

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict: debug,
	plugins : debug ? [createlogger()] : []
})


