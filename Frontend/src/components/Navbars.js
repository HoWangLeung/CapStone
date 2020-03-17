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
import { withRouter } from 'react-router-dom';
import '../components/CSS/Navbar.css'
import Logo from "./logo.png"

class MyNavbar extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      navCollapsed: true,
      showNavbar: false
    }
  }
  toggle() {
    console.log('clicked');

    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {

    return (
      <div>
        <Navbar className="nav-bg" expand='md'>
          <NavbarBrand href='/'><img
            alt=""
            src={Logo}
            width="35"
            height="30"
            className="d-inline-block align-top logo"
          />{' '}<span className="nav-content">Coffee Crave</span>
    </NavbarBrand>
          <NavbarToggler onClick={() => { this.toggle() }} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto nav-content' navbar>
              <Link to='/'>
                <NavItem>
                  <NavLink><span className="nav-content">Home</span></NavLink>
                </NavItem>
              </Link>
              <Link to='/coffee_menu'>
                <NavItem>
                  <NavLink><span className="nav-content">Menu</span></NavLink>
                </NavItem>
              </Link>

              {this.props.isLoggedIn && this.props.is_admin === false ? (
                <Link to='/profile'>
                  <NavItem>
                    <NavLink><span className="nav-content">Profile</span></NavLink>
                  </NavItem>
                </Link>
              ) : null}

              {this.props.isLoggedIn && this.props.is_admin === true ? (
                <Link to='/dashboard/statistic'>
                  <NavItem>
                    <NavLink><span className="nav-content">Dashboard</span></NavLink>
                  </NavItem>
                </Link>
              ) : null}

              {this.props.isLoggedIn && this.props.is_admin === false ? (
                <Link to='/cart'>
                  {' '}
                  <NavItem>
                    <NavLink><span className="nav-content">Cart</span></NavLink>
                  </NavItem>
                </Link>
              ) : null}

              <Link>
                <NavItem>
                  <NavLink
                    onClick={() => {
                      if (this.props.isLoggedIn) {
                        this.props.logoutDispatcher()
                        this.props.history.push('/')
                      } else {
                        this.props.showLoginModalDispatcher()
                      }
                    }}
                  ><span className="nav-content">
                    {this.props.isLoggedIn ? 'Logout' : 'Login'}
                    </span>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyNavbar))
