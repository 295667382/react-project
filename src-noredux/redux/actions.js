/*
action creator 模块
包含 n 个 action creator 函数
*/
import { INCREMENT, DECREMENT
} from './action-types'
/*
增加的 action
*/
export const increment = (number) => ({type: INCREMENT, number})
/*
减少的 action
*/
export const decrement = (number) => ({type: DECREMENT, number})