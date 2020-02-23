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
import axios from 'axios'

class CartModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      items: [],
      count: 1,
      checked: false
    }
    this.changeTemperature = this.changeTemperature.bind(this)
  }

  toggle = modalid => {
    this.props.hideModalDispatcher(modalid)
    let items = [...this.state.items]
    let item = { ...items[modalid - 1] }
    item.quantity = 0
    items[modalid - 1] = item
    this.setState({
      ...this.state,
      items: items
    })
  }

  componentDidMount () {
    this.props.getCoffeeItemDispatcher()
    axios.get('http://localhost:8000/api/product').then(res => {
      res.data.map(rows => {
        rows.quantity = 0
      })

      this.setState({
        ...this.state,
        items: res.data
      })
    })
  }
  plus (modalid) {
    let items = [...this.state.items]
    let item = { ...items[modalid - 1] }
    item.quantity = item.quantity + 1
    items[modalid - 1] = item

    this.setState({
      ...this.state,
      items: items
    })
  }

  minus (modalid) {
    let items = [...this.state.items]
    let item = { ...items[modalid - 1] }
    item.quantity = item.quantity - 1
    items[modalid - 1] = item

    console.log(items)
    if (item.quantity >= 0) {
      this.setState({
        ...this.state,
        items: items
      })
    }
  }

  changeQuantity (event, modalid) {
    let items = [...this.state.items]

    let item = { ...items[modalid - 1] }

    item.quantity = parseInt(event.target.value)

    items[modalid - 1] = item

    this.setState({
      ...this.state,
      items: items
    })
  }

  changeTemperature (event) {
    console.log(event.target.value)

    this.setState({
      ...this.state,
      checked: !this.state.checked
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log(event.target)

    axios
      .post('http://localhost:8080/api/shoppingCart/:id', {})
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    const modalid = this.props.modalid
    let coffeeItem = this.props.items[modalid - 1]

    let local_state_item = this.state.items[modalid - 1]

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
            <Form method='POST' id='myForm' onSubmit={this.handleSubmit}>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={this.changeTemperature}
                    value='HOT'
                    type='radio'
                    name='radio1'
                    checked={this.state.checked}
                  />{' '}
                  Hot
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={this.changeTemperature}
                    value='Cold'
                    type='radio'
                    name='radio1'
                    checked={!this.state.checked}
                  />{' '}
                  Cold
                </Label>
              </FormGroup>
              <hr />
              <FormGroup check>
                <Label check>
                  <Input value='Small' type='radio' name='radio2' /> Small
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input value='Medium' type='radio' name='radio2' /> Medium
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input value='Large' type='radio' name='radio2' /> Large
                </Label>
              </FormGroup>
              <hr />
              <FormGroup check>
                <Label check>
                  <Input value='Whole Milk' type='radio' name='radio3' /> Whole
                  Milk
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input value='Skimmed Milk' type='radio' name='radio3' />{' '}
                  Skimmed Milk
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input value='Soy Milk' type='radio' name='radio3' /> Soy Milk
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
                <i
                  className='fas fa-minus-square'
                  onClick={() => this.minus(modalid)}
                ></i>
                <input
                  value={
                    local_state_item === undefined
                      ? 0
                      : local_state_item.quantity
                  }
                  type='number'
                  name='quantity'
                  min='0'
                  max='99'
                  onChange={event => this.changeQuantity(event, modalid)}
                />
                <i
                  className='fas fa-plus-square'
                  onClick={() => this.plus(modalid)}
                ></i>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button form='myForm' type='submit' value='Submit' color='primary'>
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
