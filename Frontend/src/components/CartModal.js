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
import * as cartActions from '../stores/actions/cartAction'
import * as modalActions from '../stores/actions/modalAction'

class CartModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
    }
  }

  toggle = (modalid) => {

    this.props.hideModalDispatcher(modalid);
 
   
  }
  render () {
    const modalid = this.props.modalid
    let coffeeItem = this.props.items[modalid - 1]
    console.log(coffeeItem)

    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={()=> this.toggle(modalid)}
          className={this.className}
          modalid={this.props.modalid}
        >
          <ModalHeader toggle={()=> this.toggle(modalid)}>
            {modalid} {coffeeItem === undefined ? null : coffeeItem.title}
          </ModalHeader>
          <ModalBody>
            price: ${coffeeItem === undefined ? null : coffeeItem.price}
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={(this.toggle)}>
              Do Something
            </Button>{' '}
            <Button color='secondary' onClick={()=> this.toggle(modalid)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.cartReducer.items,
    modal: state.modalReducer.modal,
    modalid: state.modalReducer.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCartDispatcher: id => {
      dispatch(cartActions.addQuantity(id))
    },
    showModalDispatcher: id => {
      console.log(id)
      dispatch(modalActions.showModal(id))
    },
    hideModalDispatcher: id => {
      dispatch(modalActions.hideModal(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)
