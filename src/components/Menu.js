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

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

import item1 from '../images/item1.jpg'
import './Style.css'
import * as actions from '../stores/actions/cartAction'
import { connect } from 'react-redux'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  render () {
    let item_arr = this.props.items
    const listItem = item_arr.map((row, index) => {
      return (
        <div className="card" key={row.id}>
                        <div className="card-image">
                            <img src={row.img} alt={row.title}/>
                            <span className="card-title">{row.title}</span>
                            
                        </div>

                        <div className="card-content">
                            <p>{row.desc}</p>
                            <p><b>Price: {row.price}$</b></p>
                        </div>
                 </div>
      )
    })
    console.log(listItem)

    return (
      <div>
        {listItem}
        <Card className='test'>
          <CardImg top width='100%' src={item1} alt='Card image cap' />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
            <Button onClick={this.toggle}>Add</Button>
          </CardBody>
        </Card>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Coffee1</ModalHeader>

          <ModalBody>
            <FormGroup tag='fieldset'>
              <legend>Select variation</legend>
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio1' /> Hot
                </Label>
              </FormGroup>
              <FormGroup check className='bottomLine'>
                <Label check>
                  <Input type='radio' name='radio1' /> Iced
                </Label>
              </FormGroup>
            </FormGroup>

            <FormGroup tag='fieldset'>
              <legend>Select variation</legend>
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio1' /> Large
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='radio' name='radio1' /> Medium
                </Label>
              </FormGroup>
              <FormGroup check className='bottomLine'>
                <Label check>
                  <Input type='radio' name='radio1' /> Small
                </Label>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <Label for='exampleText'>Special Instruction</Label>
              <Input type='textarea' name='text' id='exampleText' />
            </FormGroup>
            <div className='row'>
              <Button>-</Button>
              <h5>1</h5>
              <Button>+</Button>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color='primary' onClick={this.toggle}>
              Confirm
            </Button>{' '}
            <Button color='secondary' onClick={this.toggle}>
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
