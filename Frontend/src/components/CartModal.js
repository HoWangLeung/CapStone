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
      items: [
        { id: 1, quantity: 0 },
        { id: 2, quantity: 0 },
        { id: 3, quantity: 0 },
        { id: 4, quantity: 0 },
        { id: 5, quantity: 0 },
        { id: 6, quantity: 0 }
      ],
      count: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleChange.bind(this)
    this.plus = this.plus.bind(this)
    this.minus = this.minus.bind(this)
    console.log(this.state)
  }

  toggle = modalid => {
    this.props.hideModalDispatcher(modalid)
  }

  componentDidMount () {
    this.props.getCoffeeItemDispatcher()
  }
  plus () {
    this.setState({
      ...this.state,
      count: this.state.count + 1
    })
  }

  minus () {
    if (this.state.count > 1) {
      this.setState({
        ...this.state,
        count: this.state.count - 1
      })
    }
  }

  handleChange (event) {
    console.log('handling')
    console.log(event.target.value)
    this.setState({
      ...this.state,
      count: event.target.value
    })
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
            {modalid}{' '}
            {coffeeItem === undefined ? null : coffeeItem.product_name}
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
                  <Input type='radio' name='radio2' /> Small
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio2' /> Medium
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio2' /> Large
                </Label>
              </FormGroup>
              <hr />
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio3' /> Whole Milk
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio3' /> Skimmed Milk
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio3' /> Soy Milk
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
                <i className='fas fa-minus-square' onClick={this.minus}></i>
                <input
                  value={this.state.count}
                  type='number'
                  name='quantity'
                  min='1'
                  max='99'
                  onChange={this.handleChange}
                />
                <i className='fas fa-plus-square' onClick={this.plus}></i>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggle}>
              Confirm
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
    addQuantityDispatcher: id => {
      dispatch(cartActions.addQuantity(id))
    },
    subtractQuantityDispatcher: id => {
      dispatch(cartActions.subtractQuantity(id))
    },
    getCoffeeItemDispatcher: () => {
      dispatch(cartActions.getCoffeeItemThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)
