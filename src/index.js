import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes} from 'react-router-dom'
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';

const root = ReactDOM.createRoot(document.getElementById('root'));

const user=storageUtils.getUser()
console.log("我现在get的user",user)
memoryUtils.user=user
console.log("我现在get的memoryUtils.user",memoryUtils.user)

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
