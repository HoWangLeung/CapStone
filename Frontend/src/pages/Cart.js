import React, { Component } from 'react'
import axios from 'axios'
import './Cart.css'
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
  FormText
} from 'reactstrap'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
class Cart extends Component {
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

  handleChange (event, orderItemID) {
    let targetValue = event.target.value
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    axios
      .put(
        `${process.env.REACT_APP_API_SERVER}/api/orderedItem/${orderItemID}`,
        {
          quantity: targetValue
        },
        config
      )
      .then(response => {
        const index = this.state.items.findIndex(
          item => item.orderItemID === orderItemID
        )

        console.log(index, 'itemtochange')
        //===============================/
        let items = [...this.state.items]
        let item = { ...items[index] }

        item.quantity = targetValue
        items[index] = item

        this.setState({
          items
        })
        this.calculateTotal(config)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleDelete (event, orderItemID) {
    let targetValue = event.target.value
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios
      .delete(
        `${process.env.REACT_APP_API_SERVER}/api/orderedItem/${orderItemID}`,
        config
      )
      .then(response => {
        const index = this.state.items.findIndex(
          item => item.orderItemID === orderItemID
        )

        let filtered = this.state.items.filter(item => {
          return item.orderItemID !== orderItemID
        })

        console.log(filtered)
        this.setState({
          items: filtered
        })
        this.calculateTotal(config)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  calculateTotal (config) {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/orderedItem/`, config)
      .then(res => {
        console.log('cal now')
        let items = res.data
        let grand_total = 0
        items.forEach(item => {
          grand_total += item.quantity * item.product_price
        })

        this.setState({
          grand_total
        })
        console.log(grand_total)
      })
      .catch(error => console.log('error:', error))
  }

  render () {
    let items = this.state.items

    const inCartItems = items.map((item, index) => {
      console.log(item)

      return (
        <>
          <Container className='cart-item-container'>
            <Row>
              <Col xs='5' sm='3' md='3'>
                <img className='cart-item-img' src={item.product_img}></img>
              </Col>
              <Col xs='5' sm='3' md='3'>
                <div>
                  {item.product_name}
                  <br />${item.product_price}
                  <br />
                  size:{item.product_size}
                  <br />
                  milk:{item.product_milk}
                  <br />
                  temp:{item.product_temperature}
                  <br />
                  instruction:{item.special_instruction}
                </div>
              </Col>
              <Col xs='5' sm='3' md='3'>
                <input
                  key={item.orderItemID}
                  onChange={event => this.handleChange(event, item.orderItemID)}
                  type='number'
                  name='quantity'
                  min='1'
                  max='99'
                  value={this.state.items[index].quantity}
                ></input>
              </Col>
              <Col xs='5' sm='3' md='3'>
                <button
                  key={item.orderItemID}
                  onClick={event => this.handleDelete(event, item.orderItemID)}
                >
                  Remove
                </button>
              </Col>
            </Row>
          </Container>
        </>
      )
    })
    return (
      <>
        {inCartItems}
        <Container className='Container'>
          <Row>
            <div>GrandTotal:{this.state.grand_total}</div>
          </Row>
          <Link to='/checkout'>
            <Row>
              <button>CheckOut</button>
            </Row>
          </Link>
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    sub_total: state.cartReducer.sub_total,
    grand_total: state.cartReducer.grand_total
  }
}

export default connect(mapStateToProps)(Cart)
