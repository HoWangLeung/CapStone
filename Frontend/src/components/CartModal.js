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
      modal: false
    }
  }

  toggle = modalid => {
    this.props.hideModalDispatcher(modalid)
  }

  componentDidMount(){
    this.props.getCoffeeItemDispatcher()
  }

  render () {
    const modalid = this.props.modalid
    let coffeeItem = this.props.items[modalid - 1]
    console.log(coffeeItem)

    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={() => this.toggle(modalid)}
          className={this.className}
          modalid={this.props.modalid}
        >
          <ModalHeader toggle={() => this.toggle(modalid)}>
            {modalid} {coffeeItem === undefined ? null : coffeeItem.product_name}
          </ModalHeader>
          <ModalBody>
            price: ${coffeeItem === undefined ? null : coffeeItem.product_price}
            <hr />
            <Form>
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio1' /> Hot
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio1' /> Cold
                </Label>
              </FormGroup>
              <hr />
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio1' /> Small
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio1' /> Medium
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio1' /> Large
                </Label>
              </FormGroup>
              <hr />
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio1' /> Whole Milk
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio1' /> Skimmed Milk
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio1' /> Soy Milk
                </Label>
              </FormGroup>
              <hr />
              <FormGroup>
                <Label for='exampleText'>Special Instruction</Label>
                <Col>
                  <Input type='textarea' name='text' id='exampleText' />
                </Col>
              </FormGroup>
              <hr />
              <FormGroup>
                <i className='fas fa-minus-square' ></i>
                <input type='number' name='quantity' min='1' max='99' />
                <i className='fas fa-plus-square'></i>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggle}>
              Do Something
            </Button>{' '}
            <Button color='secondary' onClick={() => this.toggle(modalid)}>
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
    },
    addQuantityDispatcher: id =>{
      dispatch(cartActions.addQuantity())
    },
    subtractQuantityDispatcher: id=>{
      dispatch(cartActions.subtractQuantity())
    },
    getCoffeeItemDispatcher: ()=>{
      dispatch(cartActions.getCoffeeItemThunk())
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)
// onClick={()=>this.props.subtractQuantity()}