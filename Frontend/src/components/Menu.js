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

import '../components/CSS/Menu.css'
import * as cartActions from '../stores/actions/cartAction'
import * as modalActions from '../stores/actions/modalAction'
import { connect } from 'react-redux'
import CartModal from './CartModal'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false
    }
  }
  componentDidMount () {
    this.props.getCoffeeItemDispatcher()
  }

  showModal = (e, index) => {
    this.setState({
      // modal: true
    })
  }

  render () {
    let item_arr = this.props.items
    const listItem = item_arr.map((row, index) => {
      return (
        <>
          <Card key={index}>
            <CardImg
              top
              width='100%'
              src={row.product_img}
              alt='Card image cap'
            />
            <CardBody>
              <CardTitle>{row.product_name}</CardTitle>
              <CardSubtitle>${row.product_price}</CardSubtitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <Button
                color='danger'
                onClick={() => this.props.showModalDispatcher(index)}
              >
                Add
              </Button>
            </CardBody>
          </Card>
        </>
      )
    })

    return (
      <Container>
        <Row xs='3'>{listItem}</Row>
        <CartModal />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.cartReducer.items,
    modal: state.modalReducer.modal,
    modalid: state.modalReducer.Id
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
    getCoffeeItemDispatcher: () => {
      dispatch(cartActions.getCoffeeItemThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
