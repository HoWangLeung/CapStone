import React, { Component } from 'react'
import * as authActions from '../stores/actions/authAction'
import { connect } from 'react-redux'
import MaterialTable_Edit_Menu from '../components/dashboard/EditMenu'
import { Redirect } from 'react-router-dom'


class Dashboard extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (this.props.isLoggedIn === true && this.props.is_admin === true) {
      return (
        <div>
          <MaterialTable_Edit_Menu />
        </div>
      )
    } else {
      return <Redirect to='/' />
    }
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoggedIn,
  is_admin: state.authReducer.is_admin,
  token: state.authReducer.token
})

const mapDispatchToProps = dispatch => ({
  logoutDispatch: () => {
    dispatch(authActions.logoutAction())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
