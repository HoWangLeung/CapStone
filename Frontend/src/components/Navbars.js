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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { connect } from 'react-redux'
import * as authAction from '../stores/actions/authAction'
import * as uiActions from '../stores/actions/uiAction'
import LoginModal from './LoginModal'
import Axios from 'axios'
class MyNavbar extends Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      navCollapsed: true,
      showNavbar: false,
      
    }
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render () {
    const { navCollapsed } = this.state
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.props.isLoginModalOpen} />
          <Collapse isOpen={this.props.isLoginModalOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href='/'>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/coffee_menu'>Menu</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/profile'>Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/cart'>Cart</NavLink>
              </NavItem>

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
    user_id: state.authReducer.user_id,
    isLoginModalOpen:state.uiReducer.isLoginModalOpen


  }
}
//
const mapDispatchToProps = dispatch => {
  return {
    loginDispatch: (email, password) => {
      dispatch(authAction.loginThunk(email, password));
    },
    logoutDispatcher: () => {
      dispatch(authAction.logoutAction())
    },
    showLoginModalDispatcher: () => {
      
      dispatch(uiActions.showLoginModalAction())
    },
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar)
