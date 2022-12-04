import React, { Component } from 'react'
import {formateDate} from '../../utils/formateDate'

export default class Time extends Component {
    state={
        sysYime:formateDate(Date.now())
      }
    componentDidMount(){
        this.intervalId=setInterval(()=>{
            this.setState({sysYime:formateDate(Date.now())})
          },1000)
    }
    render() {
        //console.log("render")
        const {sysYime}=this.state
        //console.log("sysYime",sysYime)
        return (
        <div>{sysYime}</div>
        )
  }
}
