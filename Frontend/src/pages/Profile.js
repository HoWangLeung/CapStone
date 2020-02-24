import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as authActions from '../stores/actions/authAction'

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      secretMessage: ''
    }
  }
  componentDidMount () {
    if (this.props.isLoggedIn) {
      axios
        .get(`${process.env.REACT_APP_API_SERVER}/secret`, {
          headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then(response => response.data)
        .then(data => {
          this.setState({ secretMessage: data.message })
        })
    }
  }
  render () {
    if (this.props.isLoggedIn) {
      return (
        <div>
          The user is logged in. You can access the token like this:{' '}
          {this.props.token}.
          <br />
          The secret message is "{this.state.secretMessage}".
          <br /> click
          <button onClick={this.props.logoutDispatch}>here</button> to log out.
        </div>
      )
    } else {
      return <Redirect to='/coffee_menu' />
    }
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoggedIn,
  token: state.authReducer.token
})

const mapDispatchToProps = dispatch => ({
  logoutDispatch: () => {
    dispatch(authActions.logoutAction())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
