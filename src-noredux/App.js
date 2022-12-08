import React, { Component } from 'react'
import './App.less';
import { Routes,Route} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'

//test


class App extends Component {
  
  constructor (props) {
    super(props)
    this.numberRef = React.createRef()
  }
  render() {
    console.log("app",this.props)
    return (
      <div className="app">
        <Routes>
          <Route path="/*" element={<Admin/>}></Route>
         
          <Route path="/login" element={<Login/>}></Route>
          
        </Routes>
      </div>
    );
  }
  
}

export default App;
