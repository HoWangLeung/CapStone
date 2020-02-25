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
export default class Cart extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentDidMount () {
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/purchase`, config)
      .then(res => {
        console.log(res.data)
        this.setState({
          items: res.data
        })
      })
      .catch(error => console.log('error:', error))
  }

  handleChange(event){
    console.log(event.target.value);
    
  }
  render () {
    let items = this.state.items

    const inCartItems = items.map(rows => {
      console.log(rows)

      return (
        <>
          <Container className='cart-item-container'>
            <Row>
              <Col xs='5' sm='3' md='3'>
                <img className='cart-item-img' src={rows.product_img}></img>
              </Col>
              <Col xs='5' sm='3' md='3'>
                <div>
                  {rows.product_name}
                  <br />${rows.product_price}
                </div>
              </Col>
              <Col xs='5' sm='3' md='3'>
                <input
                  onChange={event => this.handleChange(event)}
                  type='number'
                  id='quantity'
                  name='quantity'
                  min='1'
                  max='99'
                  value={rows.quantity}
                ></input>
              </Col>
              <Col xs='5' sm='3' md='3'>
                <button>Delete</button>
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
            <div>SubTotal:</div>
          </Row>
          <Row>
            <div>GrandTotal:</div>
          </Row>
        </Container>
      </>
    )
  }
}
