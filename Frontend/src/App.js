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

export default class App extends Component {
  constructor (props) {
    super(props)

    console.log(localStorage)
  }
  render () {
    const PurePrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.isLoggedIn === true ? (
            <Component {...props} />
          ) : (
            // <Redirect to='/cart' /> 
            alert('not logged in')
          )
        }
      />
    )

    const PrivateRoute = connect(state => ({
      isLoggedIn: state.authReducer.isLoggedIn
    }))(PurePrivateRoute)

    return (
      <BrowserRouter>
        <div className='App'>
          <Navbars />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/coffee_menu' component={Menu} />
            <Route path='/cart' component={Cart} />
            <PrivateRoute path='/profile' component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
