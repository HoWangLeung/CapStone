import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import './App.css'
import Navbars from './components/Navbars'
import 'bootstrap/dist/css/bootstrap.min.css'
import Menu from './components/Menu'

function App () {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbars />
        <Switch>
          <Route exact path='/' component={Menu} />
          <Route path='/cart' />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
