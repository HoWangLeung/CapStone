import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
import CardSection from '../components/CardSection'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import axios from 'axios'
export default class ReviewOrder extends Component {
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

  handleSubmit (event) {
    event.preventDefault()
    console.log(event.target)
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
          <Form id='checkoutForm' onSubmit={event => this.handleSubmit(event)}>
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
            <Link to='/checkout'>
              <Button
                form='checkoutForm'
                type='submit'
                value='Submit'
                color='danger'
              >
                Confirm
              </Button>
            </Link>

            <p>Your order</p>
            {inCheckoutItems}
            <h3>Grand_total:{this.state.grand_total}</h3>
          </Form>
        </div>
      </>
    )
  }
}
