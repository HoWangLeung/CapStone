import React, { Component } from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap'
import { connect } from 'react-redux'
import * as actions from '../stores/actions/cartAction'



 class CartModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      modalId: null
    }
  }

  toggle = () => {


    this.setState({
      modal: !this.state.modal,
      modalId: 2
    })


  }
  render () {
    console.log(this.props.items)

    let modalList =  this.props.items.map(item=>{
      return (
        <div>
          
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.className}
          modalId={this.state.modalId}
        >
          <ModalHeader toggle={this.toggle}>{item.title}</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggle}>
              Do Something
            </Button>{' '}
            <Button color='secondary' onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      )
    })
    return (
      <div>
        <Button color='danger' onClick={()=>this.toggle()}>
          Add
        </Button>
        {modalList}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.cartReducer.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCartDispatcher: id => {
      dispatch(actions.addQuantity(id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartModal)
