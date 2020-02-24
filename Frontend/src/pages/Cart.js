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
  render () {
    let items = this.state.items

    const inCartItems = items.map(rows => {
      console.log(rows)

      return (
        <Container>
          <Row>
            <div>{rows.product_name}</div>
          </Row>
          <Row>
            <div>${rows.product_price}</div>
          </Row>



        </Container>
      )
    })
    return <>{inCartItems}</>
  }
}
