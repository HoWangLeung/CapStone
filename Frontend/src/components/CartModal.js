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
      hot_checked: false,
      cold_checked: false,
      small_checked: false,
      medium_checked: false,
      large_checked: false,
      whole_milk_checked: false,
      skimmed_milk_checked: false,
      soy_milk_checked: false,
      special_instruction: ''
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

  changeTemperature (event, modalid) {
    let items = [...this.state.items]
    let item = { ...items[modalid - 1] }
    item.product_temperature = event.target.value.toLowerCase()
    items[modalid - 1] = item
    if (event.target.value === 'hot') {
      this.setState({
        ...this.state,
        hot_checked: (this.state.hot_checked = true),
        cold_checked: (this.state.cold_checked = false),
        items
      })
    } else if (event.target.value === 'cold') {
      this.setState({
        ...this.state,
        cold_checked: (this.state.cold_checked = true),
        hot_checked: (this.state.hot_checked = false),
        items
      })
    }
  }

  changeSize (event, modalid) {
    console.log(event.target.value)

    let items = [...this.state.items]
    let item = { ...items[modalid - 1] }
    item.product_size = event.target.value.toLowerCase()
    items[modalid - 1] = item

    switch (event.target.value) {
      case 'small':
        this.setState({
          ...this.state,
          small_checked: (this.state.small_checked = true),
          medium_checked: (this.state.medium_checked = false),
          large_checked: (this.state.large_checked = false),
          items
        })
        break

      case 'medium':
        this.setState({
          ...this.state,
          small_checked: (this.state.small_checked = false),
          medium_checked: (this.state.medium_checked = true),
          large_checked: (this.state.large_checked = false),
          items
        })
        break
      case 'large':
        this.setState({
          ...this.state,
          small_checked: (this.state.small_checked = false),
          medium_checked: (this.state.medium_checked = false),
          large_checked: (this.state.large_checked = true),
          items
        })
        break
      default:
        return this.state
        break
    }
  }

  changeMilk (event, modalid) {
    let items = [...this.state.items]
    let item = { ...items[modalid - 1] }
    item.product_milk = event.target.value.toLowerCase()
    items[modalid - 1] = item

    switch (event.target.value) {
      case 'whole_milk':
        this.setState({
          ...this.state,
          whole_milk_checked: (this.state.small_checked = true),
          skimmed_milk_checked: (this.state.medium_checked = false),
          soy_milk_checked: (this.state.large_checked = false),
          items
        })
        break

      case 'skimmed_milk':
        this.setState({
          ...this.state,
          whole_milk_checked: (this.state.small_checked = false),
          skimmed_milk_checked: (this.state.medium_checked = true),
          soy_milk_checked: (this.state.large_checked = false),
          items
        })
        break

      case 'soy_milk':
        this.setState({
          ...this.state,
          whole_milk_checked: (this.state.small_checked = false),
          skimmed_milk_checked: (this.state.medium_checked = false),
          soy_milk_checked: (this.state.large_checked = true),
          items
        })
        break

      default:
        break
    }
  }

  changeInstruction (event, modalid) {
    console.log(event.target.value)

    let items = [...this.state.items]
    let item = { ...items[modalid - 1] }
    item.special_instruction = event.target.value
    items[modalid - 1] = item

    console.log(items)

    this.setState({
      ...this.state,
      items
    })
  }

  handleSubmit (event, modalid) {
    event.preventDefault()
    // console.log(modalid)
    // let product_id = this.state.items[modalid-1].id
    // console.log(product_id);
    let targetForm = this.state.items[modalid - 1]

    let quantity = targetForm.quantity
    let product_temperature = targetForm.product_temperature
    let product_size = targetForm.product_size
    let product_milk = targetForm.product_milk
    let special_instruction = targetForm.special_instruction
    // console.log(product_temperature)
    // console.log(quantity)
    // console.log(product_size)
    // console.log(product_milk)
    // console.log(special_instruction);
    

    //=============post request===========//
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios
      .post(
        'http://localhost:8000/api/purchase',
        {
          quantity,
          product_temperature,
          product_size,
          product_milk,
          special_instruction,
          
        },
        config
      )
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    //=============post request===========//
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
            <Form
              method='POST'
              id='myForm'
              onSubmit={event => this.handleSubmit(event, modalid)}
            >
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeTemperature(event, modalid)}
                    value='hot'
                    type='radio'
                    name='radio1'
                    checked={this.state.hot_checked}
                  />{' '}
                  Hot
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeTemperature(event, modalid)}
                    value='cold'
                    type='radio'
                    name='radio1'
                    checked={this.state.cold_checked}
                  />{' '}
                  Cold
                </Label>
              </FormGroup>
              <hr />
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeSize(event, modalid)}
                    value='small'
                    type='radio'
                    name='radio2'
                    checked={this.state.small_checked}
                  />{' '}
                  Small
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeSize(event, modalid)}
                    value='medium'
                    type='radio'
                    name='radio2'
                    checked={this.state.medium_checked}
                  />{' '}
                  Medium
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeSize(event, modalid)}
                    value='large'
                    type='radio'
                    name='radio2'
                    checked={this.state.large_checked}
                  />{' '}
                  Large
                </Label>
              </FormGroup>
              <hr />
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeMilk(event, modalid)}
                    value='whole_milk'
                    type='radio'
                    name='radio3'
                    checked={this.state.whole_milk_checked}
                  />{' '}
                  Whole Milk
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeMilk(event, modalid)}
                    value='skimmed_milk'
                    type='radio'
                    name='radio3'
                    checked={this.state.skimmed_milk_checked}
                  />{' '}
                  Skimmed Milk
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeMilk(event, modalid)}
                    value='soy_milk'
                    type='radio'
                    name='radio3'
                    checked={this.state.soy_milk_checked}
                  />{' '}
                  Soy Milk
                </Label>
              </FormGroup>
              <hr />
              <FormGroup>
                <Label for='exampleText'>Special Instruction</Label>
                <Col>
                  <Input
                    onChange={event => this.changeInstruction(event, modalid)}
                    value={
                      this.state.items[modalid - 1] === undefined
                        ? null
                        : this.state.items[modalid - 1].special_instruction
                    }
                    type='textarea'
                    name='text'
                    id='exampleText'
                  />
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
