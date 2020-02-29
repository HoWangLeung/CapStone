import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'

import Navbars from './components/Navbars'
import 'bootstrap/dist/css/bootstrap.min.css'
import Menu from './components/Menu'
import Cart from './pages/Cart'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Home from './pages/Home'
import ReviewOrder from './pages/ReviewOrder'
import CheckoutForm from './pages/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


const stripePromise = loadStripe('pk_test_oHDsyL0Wxhko6HIFRMrm7QXS00h1og1ziG')
// import api from './api'
// const stripePromise = api.getPublicStripeKey().then(key =>{
//     console.log(key)
//   loadStripe(key)});

export default class App extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <>
        <BrowserRouter>
          <div className='App'>
            <Navbars />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/coffee_menu' component={Menu} />
              <Route path='/cart' component={Cart} />
              <Route path='/profile' component={Profile} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/reviewOrder' component={ReviewOrder} />
              <Elements stripe={stripePromise}>
                <Route path='/checkout' component={CheckoutForm} />
              </Elements>
            </Switch>
          </div>
        </BrowserRouter>
      </>
    )
  }
}
