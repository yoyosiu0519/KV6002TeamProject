import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

/**
 * The main entry point for the application.
 * 
 * @author Team
 */
// 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/assessment/app'> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)


