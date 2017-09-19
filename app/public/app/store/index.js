'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/index.js'

const loggerMiddleware = createLogger()
// const middlewares = [thunk]
// const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export default function configureStore(initialState) {
	// return createStoreWithMiddleware(rootReducer, initialState)
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(
			thunk, // 允许我们 dispatch() 函数
			// loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
		)
	)
}

