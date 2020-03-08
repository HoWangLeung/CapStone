import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'

import Navbars from './components/Navbars'
import 'bootstrap/dist/css/bootstrap.min.css'
import Menu from './components/Menu/Menu'
import Cart from './components/Cart/Cart'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Home from './pages/Home'
import ReviewOrder from './pages/ReviewOrder'
import CheckoutForm from './components/checkout/CheckoutForm'
import Checkout from './components/checkout/Checkout'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import SignUp from './components/Authentication/SignUp'
import MaterialTable_Edit_Menu from './components/dashboard/MaterialTable_Edit_Menu'
import Statistic from './components/dashboard/Statistic'
import OrderControl from './components/dashboard/OrderControl/OrderControl'
import SignUpSuccess from './components/Authentication/SignUpSuccess'

const stripePromise = loadStripe('pk_test_oHDsyL0Wxhko6HIFRMrm7QXS00h1og1ziG')

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
              <Route path='/dashboard/statistic' render={() => <Statistic />} />
              <Route
                path='/dashboard/product Control'
                render={() => <MaterialTable_Edit_Menu />}
              />
              <Route path='/dashboard/Order Control' component={OrderControl} />

              <Route path='/signup' component={SignUp} />
              <Route path='/signUpSuccess' component={SignUpSuccess} />

              <Elements stripe={stripePromise}>
                <Route path='/checkout' component={Checkout} />
              </Elements>
            </Switch>
          </div>
        </BrowserRouter>
      </>
    )
  }
}
