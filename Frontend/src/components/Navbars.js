import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap'
import { connect } from 'react-redux'
import * as authAction from '../stores/actions/authAction'
import * as uiActions from '../stores/actions/uiAction'
import LoginModal from './LoginModal'

class MyNavbar extends Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      navCollapsed: true,
      showNavbar: false
    }
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render () {
    
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>Coffee</NavbarBrand>
          <NavbarToggler onClick={this.props.isLoginModalOpen} />
          <Collapse isOpen={this.props.isLoginModalOpen} navbar>
            <Nav className='ml-auto' navbar>
              <Link to='/'>
                <NavItem>
                  <NavLink>Home</NavLink>
                </NavItem>
              </Link>
              <Link to='/coffee_menu'>
                <NavItem>
                  <NavLink>Menu</NavLink>
                </NavItem>
              </Link>

              {this.props.isLoggedIn && this.props.is_admin === false ? (
                <Link to='/profile'>
                  <NavItem>
                    <NavLink>Profile</NavLink>
                  </NavItem>
                </Link>
              ) : null}

              {this.props.isLoggedIn && this.props.is_admin === true ? (
                <Link to='/dashboard/statistic'>
                  <NavItem>
                    <NavLink>Dashboard</NavLink>
                  </NavItem>
                </Link>
              ) : null}

              {this.props.isLoggedIn && this.props.is_admin === false ? (
                <Link to='/cart'>
                  {' '}
                  <NavItem>
                    <NavLink>Cart</NavLink>
                  </NavItem>
                </Link>
              ) : null}

              <Link>
                <NavItem>
                  <NavLink
                    onClick={() => {
                      if (this.props.isLoggedIn) {
                        this.props.logoutDispatcher()
                      } else {
                        this.props.showLoginModalDispatcher()
                      }
                    }}
                  >
                    {this.props.isLoggedIn ? 'Logout' : 'Login'}
                    <LoginModal />
                  </NavLink>
                </NavItem>
              </Link>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    is_admin: state.authReducer.is_admin,
    user_id: state.authReducer.user_id,
    isLoginModalOpen: state.uiReducer.isLoginModalOpen
  }
}
//
const mapDispatchToProps = dispatch => {
  return {
    loginDispatch: (email, password) => {
      dispatch(authAction.loginThunk(email, password))
    },
    logoutDispatcher: () => {
      dispatch(authAction.logoutAction())
    },
    showLoginModalDispatcher: () => {
      dispatch(uiActions.showLoginModalAction())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar)
