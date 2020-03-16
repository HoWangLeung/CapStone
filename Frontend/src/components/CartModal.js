import React, { Component } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { connect } from "react-redux";
import * as cartActions from "../stores/actions/cartAction";
import * as modalActions from "../stores/actions/modalAction";
import axios from "axios";
import './CSS/CartModal.css'
import Grid from '@material-ui/core/Grid';
class CartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      grand_total: 0,
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
      special_instruction: ""
    };
    this.changeTemperature = this.changeTemperature.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle = modalid => {
    this.props.hideModalDispatcher(modalid);
    let items = [...this.state.items];
    let item = { ...items[modalid] };
    item.quantity = 0;
    items[modalid] = item;
    this.setState({
      ...this.state,
      items: items,
      hot_checked: false,
      cold_checked: false,
      small_checked: false,
      medium_checked: false,
      large_checked: false,
      whole_milk_checked: false,
      skimmed_milk_checked: false,
      soy_milk_checked: false,
      special_instruction: ""
    });
  };

  componentDidMount() {
    this.props.getCoffeeItemDispatcher();
    axios.get(`${process.env.REACT_APP_API_SERVER}/api/product`).then(res => {
      res.data.map(rows => {
        return (rows.quantity = 1);
      });

      this.setState({
        ...this.state,
        items: res.data
      });
    });
  }
  plus(modalid) {
    let items = [...this.state.items];
    let item = { ...items[modalid] };
    item.quantity = item.quantity + 1;
    items[modalid] = item;

    this.setState({
      ...this.state,
      items: items
    });
  }

  minus(modalid) {
    let items = [...this.state.items];
    let item = { ...items[modalid] };
    item.quantity = item.quantity - 1;
    items[modalid] = item;

    console.log(items);
    if (item.quantity >= 0) {
      this.setState({
        ...this.state,
        items: items
      });
    }
  }

  changeQuantity(event, modalid) {
    let items = [...this.state.items];

    let item = { ...items[modalid] };

    item.quantity = parseInt(event.target.value);

    items[modalid] = item;

    this.setState({
      ...this.state,
      items: items
    });
  }

  changeTemperature(event, modalid) {
    let items = [...this.state.items];
    let item = { ...items[modalid] };
    item.product_temperature = event.target.value.toLowerCase();
    items[modalid] = item;
    if (event.target.value === "hot") {
      this.setState({
        ...this.state,
        hot_checked: true,
        cold_checked: false,
        items
      });
    } else if (event.target.value === "cold") {
      this.setState({
        ...this.state,
        cold_checked: true,
        hot_checked: false,
        items
      });
    }
  }

  changeSize(event, modalid) {
    console.log(event.target.value);

    let items = [...this.state.items];
    let item = { ...items[modalid] };
    item.product_size = event.target.value.toLowerCase();
    items[modalid] = item;

    switch (event.target.value) {
      case "small":
        this.setState({
          ...this.state,
          small_checked: true,
          medium_checked: false,
          large_checked: false,
          items
        });
        break;

      case "medium":
        this.setState({
          ...this.state,
          small_checked: false,
          medium_checked: true,
          large_checked: false,
          items
        });
        break;
      case "large":
        this.setState({
          ...this.state,
          small_checked: false,
          medium_checked: false,
          large_checked: true,
          items
        });
        break;
      default:
        return this.state;
    }
  }

  changeMilk(event, modalid) {
    let items = [...this.state.items];
    let item = { ...items[modalid] };
    item.product_milk = event.target.value.toLowerCase();
    items[modalid] = item;

    switch (event.target.value) {
      case "whole_milk":
        this.setState({
          ...this.state,
          whole_milk_checked: true,
          skimmed_milk_checked: false,
          soy_milk_checked: false,
          items
        });
        break;

      case "skimmed_milk":
        this.setState({
          ...this.state,
          whole_milk_checked: false,
          skimmed_milk_checked: true,
          soy_milk_checked: false,
          items
        });
        break;

      case "soy_milk":
        this.setState({
          ...this.state,
          whole_milk_checked: false,
          skimmed_milk_checked: false,
          soy_milk_checked: true,
          items
        });
        break;

      default:
        break;
    }
  }

  changeInstruction(event, modalid) {
    console.log(event.target.value);

    let items = [...this.state.items];
    let item = { ...items[modalid] };
    item.special_instruction = event.target.value;
    items[modalid] = item;

    console.log(items);

    this.setState({
      ...this.state,
      items
    });
  }

  handleSubmit(event, modalid) {
    event.preventDefault();

    if (this.props.isLoggedIn === true) {
      let targetForm = this.state.items[modalid];
      console.log(targetForm);

      let product_id = targetForm.id;
      let quantity = targetForm.quantity;
      let product_temperature = targetForm.product_temperature;
      let product_size = targetForm.product_size;
      let product_milk = targetForm.product_milk;
      let special_instruction = targetForm.special_instruction;
      const product_price = targetForm.product_price;
      const fixed_cost = targetForm.product_cost;
      console.log(product_price);

      //=============post request===========//
      let token = localStorage.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      axios
        .post(
          `${process.env.REACT_APP_API_SERVER}/api/orderedItem`,
          {
            product_id,
            quantity,
            product_temperature,
            product_size,
            product_milk,
            special_instruction,
            status: "pending",
            product_price,
            fixed_cost
          },
          config
        )
        .then(function(response) {
          console.log(response);
          // this.setState({
          //   hot_checked: false,
          //   cold_checked: false,
          //   small_checked: false,
          //   medium_checked: false,
          //   large_checked: false,
          //   whole_milk_checked: false,
          //   skimmed_milk_checked: false,
          //   soy_milk_checked: false,
          //   special_instruction: ''
          // })
        })
        .catch(function(error) {
          console.log(error);
        });
      //=============post request===========//
      this.props.hideModalDispatcher(modalid);

      this.calculateGrandTotal(modalid);
    }
  }

  calculateGrandTotal(modalid) {
    console.log(modalid);
    let index = modalid;
    let items = this.props.items;
    let item_price = items[index].product_price;
    let item_quantity = this.state.items[index].quantity;
    console.log(item_quantity);

    let item_total = item_price * item_quantity;

    console.log(item_total);
    this.setState(prevState => {
      return {
        ...prevState,
        grand_total: prevState.grand_total + item_total
      };
    });

    this.props.addToCartDispatcher(modalid, item_total);
  }

  render() {
    const modalid = this.props.modalid;
    let coffeeItem = this.props.items[modalid];

    let local_state_item = this.state.items[modalid];

    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={() => this.toggle(modalid)}
          className={this.className}
          modalid={this.props.modalid}
        >
          <ModalHeader toggle={() => this.toggle(modalid)}>
            {modalid}{" "}
            {coffeeItem === undefined ? null : coffeeItem.product_name}
          </ModalHeader>
          <ModalBody>
            price: ${coffeeItem === undefined ? null : coffeeItem.product_price}
            <hr />
            <Form
              method="POST"
              id="myForm"
              onSubmit={event => this.handleSubmit(event, modalid)}
            >
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeTemperature(event, modalid)}
                    value="hot"
                    type="radio"
                    name="radio1"
                    checked={this.state.hot_checked}
                  />{" "}
                  Hot
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeTemperature(event, modalid)}
                    value="cold"
                    type="radio"
                    name="radio1"
                    checked={this.state.cold_checked}
                  />{" "}
                  Cold
                </Label>
              </FormGroup>
              <hr />
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeSize(event, modalid)}
                    value="small"
                    type="radio"
                    name="radio2"
                    checked={this.state.small_checked}
                  />{" "}
                  Small
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeSize(event, modalid)}
                    value="medium"
                    type="radio"
                    name="radio2"
                    checked={this.state.medium_checked}
                  />{" "}
                  Medium  +$4
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeSize(event, modalid)}
                    value="large"
                    type="radio"
                    name="radio2"
                    checked={this.state.large_checked}
                  />{" "}
                  Large  +$8
                </Label>
              </FormGroup>
              <hr />
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeMilk(event, modalid)}
                    value="whole_milk"
                    type="radio"
                    name="radio3"
                    checked={this.state.whole_milk_checked}
                  />{" "}
                  Whole Milk
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeMilk(event, modalid)}
                    value="skimmed_milk"
                    type="radio"
                    name="radio3"
                    checked={this.state.skimmed_milk_checked}
                  />{" "}
                  Skimmed Milk
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={event => this.changeMilk(event, modalid)}
                    value="soy_milk"
                    type="radio"
                    name="radio3"
                    checked={this.state.soy_milk_checked}
                  />{" "}
                  Soy Milk
                </Label>
              </FormGroup>
              <hr />
              <FormGroup>
                <Label for="exampleText">Special Instruction</Label>
                <Col>
                  <Input
                    onChange={event => this.changeInstruction(event, modalid)}
                    value={
                      this.state.items[modalid] === undefined
                        ? null
                        : this.state.items[modalid].special_instruction
                    }
                    type="textarea"
                    name="text"
                    id="exampleText"
                  />
                </Col>
              </FormGroup>
              <hr />
              <FormGroup>
                <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                <i 
                  className="fas fa-minus-square"
                  onClick={() => this.minus(modalid)}
                ></i>
                <input
                  value={
                    local_state_item === undefined
                      ? 1
                      : local_state_item.quantity
                  }
                  type="number"
                  name="quantity"
                  min="1"
                  max="99"
                  onChange={event => this.changeQuantity(event, modalid)}
                />
                <i
                  className="fas fa-plus-square"
                  onClick={() => this.plus(modalid)}
                ></i>
                </Grid>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button form="myForm" type="submit" value="Submit" color="primary">
              Confirm
            </Button>{" "}
            <Button color="secondary" onClick={() => this.toggle(modalid)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.cartReducer.items,
    modal: state.modalReducer.modal,
    modalid: state.modalReducer.id,
    isLoggedIn: state.authReducer.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCartDispatcher: (id, item_total) => {
      dispatch(cartActions.addToCart(id, item_total));
    },
    showModalDispatcher: id => {
      console.log(id);
      dispatch(modalActions.showModal(id));
    },
    hideModalDispatcher: id => {
      dispatch(modalActions.hideModal(id));
    },
    addQuantityDispatcher: id => {
      dispatch(cartActions.addQuantity(id));
    },
    subtractQuantityDispatcher: id => {
      dispatch(cartActions.subtractQuantity(id));
    },
    getCoffeeItemDispatcher: () => {
      dispatch(cartActions.getCoffeeItemThunk());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
