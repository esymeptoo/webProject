'use strict'

//统一管理所有的reducers，方便后期扩展维护

import { combineReducers } from 'redux'
import WebApp from './webApp'


const rootReducer = combineReducers({
	WebApp
})

export default rootReducer