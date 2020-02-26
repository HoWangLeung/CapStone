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
  ListGroupItem,
  ListGroup
} from 'reactstrap'

import axios from 'axios'

import CheckOutForm from './CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_oHDsyL0Wxhko6HIFRMrm7QXS00h1og1ziG')

export default class Checkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [],
      grand_total: 0
    }
  }

  componentDidMount () {
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/orderedItem/`, config)
      .then(res => {
        let items = res.data
        let grand_total = 0
        items.forEach(item => {
          grand_total += item.quantity * item.product_price
        })

        this.setState({
          items: res.data,
          grand_total
        })
      })
      .catch(error => console.log('error:', error))
  }
  render () {
    let items = this.state.items

    const inCheckoutItems = items.map((item, index) => {
      return (
        <ListGroupItem>
          {item.product_name} &nbsp; &nbsp;x &nbsp;&nbsp; {item.quantity}
        </ListGroupItem>
      )
    })

    return (
      <>
        <div>
          {/* {inCheckoutItems} */}

          {/* <Form>
            <p>Checkout page</p>
            <FormGroup>
              <Label for='exampleAddress'>Delivery Address</Label>
              <Input
                type='text'
                name='address'
                id='exampleAddress'
                placeholder='1234 Main St'
              />
            </FormGroup>
            {/* <button>Pay</button> */}

          {/* <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Morbi leo risus</ListGroupItem>
            <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem> */}

          <h3>Grand_total:{this.state.grand_total}</h3>
          {/* </Form> */}

          <Elements stripe={stripePromise}>
            <CheckOutForm />
          </Elements>
        </div>
      </>
    )
  }
}
