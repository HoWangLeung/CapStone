import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// import './App.css'
import Navbars from './components/Navbars'
import 'bootstrap/dist/css/bootstrap.min.css'
import Menu from './components/Menu'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Home from './pages/Home'

import Checkout from './pages/Checkout'

export default class App extends Component {
  constructor (props) {
    super(props)

    console.log(localStorage)
  }
  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbars />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/coffee_menu' component={Menu} />
            <Route path='/cart' component={Cart} />
            <Route path='/profile' component={Profile} />

            <Route path='/checkout' component={Checkout} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
