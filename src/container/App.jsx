/*
包装 UI 组件的容器组件 通过 connect()生成
*/
import React from 'react'
import {connect} from 'react-redux'
import Counter from '../components/Counter'
import {increment, decrement} from '../redux/actions'

export default connect( state => ({count: state}), {increment, decrement}
)(Counter)