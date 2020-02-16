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
  FormText
} from 'reactstrap'

import item1 from '../images/item1.jpg'
import './Style.css'
import * as actions from '../stores/actions/cartAction'
import { connect } from 'react-redux'
import CartModal from './CartModal'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      modalId: null
    }
  }

  render () {
    let item_arr = this.props.items
    const listItem = item_arr.map(row => {
      return (
        <>
          <Card key={row.id}>
            <CardImg top width='100%' src={row.img} alt='Card image cap' />
            <CardBody>
              <CardTitle>
                {row.id} : {row.title}
              </CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <CartModal />
            </CardBody>
          </Card>
        </>
      )
    })
    console.log(listItem)

    return (
      <Container>
        <Row xs='3'>{listItem}</Row>
       
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.cartReducer.items
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToCartDispatcher: id => {
      dispatch(actions.addQuantity(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
