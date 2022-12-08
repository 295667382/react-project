import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducer'

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk))) // 创 建 store 对象内部会第一次调用 reducer()得到初始状态值