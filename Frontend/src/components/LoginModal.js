import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import * as authActions from '../stores/actions/authAction'
import * as uiActions from '../stores/actions/uiAction'

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap'
export class LoginModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  emailInputChange (event) {
    console.log('changing')

    const val = event.currentTarget.value
    this.setState({ email: val })
  }

  passwordInputChange (event) {
    const val = event.currentTarget.value
    this.setState({ password: val })
  }

  login (event) {
    console.log('clicked')
    console.log(event)
    event.preventDefault()
    this.props.loginDispatch(this.state.email, this.state.password)
    this.props.hideLoginModalDispatcher()
  }

  // closeModal(){
  //   this.props.hideLoginModalDispatcher()
  // }

  render () {
    if (this.props.isLoggedIn) {
      // return <Redirect to='/' />
    }
    return (
      <div>
        <Modal
          isOpen={this.props.isLoginModalOpen}
          toggle={this.props.hideLoginModalDispatcher}
        >
          <ModalHeader>Log in</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for='exampleEmail' hidden>
                  Email
                </Label>
                <Input
                  type='email'
                  name='email'
                  id='exampleEmail'
                  placeholder='Email'
                  value={this.state.email}
                  onChange={event => this.emailInputChange(event)}
                />
              </FormGroup>{' '}
              <FormGroup>
                <Label for='examplePassword' hidden>
                  Password
                </Label>
                <Input
                  type='password'
                  name='password'
                  id='examplePassword'
                  placeholder='Password'
                  value={this.state.password}
                  onChange={event => this.passwordInputChange(event)}
                />
              <p>Don't have an account yet? Sign up here !</p>
              </FormGroup>{' '}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={event => this.login(event)}>
              Log in
            </Button>{' '}
            <Button
              color='secondary'
              onClick={this.props.hideLoginModalDispatcher}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoggedIn,
  isLoginModalOpen: state.uiReducer.isLoginModalOpen
})

const mapDispatchToProps = dispatch => ({
  loginDispatch: (email, password) => {
    dispatch(authActions.loginThunk(email, password))
  },

  hideLoginModalDispatcher: () => {
    dispatch(uiActions.hideLoginModalAction())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
