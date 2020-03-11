import React, { Component } from "react";
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
} from "reactstrap";

import "../CSS/Menu.css";
import * as cartActions from "../../stores/actions/cartAction";
import * as modalActions from "../../stores/actions/modalAction";
import { connect } from "react-redux";
import CartModal from "../CartModal";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  componentDidMount() {
    this.props.getCoffeeItemDispatcher();
  }

  showModal = (e, index) => {
    this.setState({
      // modal: true
    });
  };

  render() {
    return (
      <div>
        <Container fluid={true}>
          <Row>
            {this.props.items.map((item, index) => {
              return (
                <Col md="3">
                  <Card>
                    <div className="hovereffect">
                      <CardImg
                        height="auto"
                        top
                        width="100%"
                        src={item.product_img}
                        alt="Card image cap"
                      />
                      <div class="overlay">
                        <h2>{item.product_name}</h2>

                        {this.props.isLoggedIn === true &&
                        this.props.is_admin === true ? (
                          <p className="pointer">Not Available to Admin user</p>
                        ) : (
                          <p
                            className="pointer"
                            onClick={() =>
                              this.props.showModalDispatcher(index)
                            }
                          >
                            Add To Cart
                          </p>
                        )}
                      </div>
                    </div>
                    <CardBody>
                      <CardTitle>
                        {item.product_name} ${item.product_price}
                      </CardTitle>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
        <CartModal />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    is_admin: state.authReducer.is_admin,
    items: state.cartReducer.items,
    modal: state.modalReducer.modal,
    modalid: state.modalReducer.Id
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addToCartDispatcher: id => {
      dispatch(cartActions.addQuantity(id));
    },
    showModalDispatcher: id => {
      console.log(id);
      dispatch(modalActions.showModal(id));
    },
    hideModalDispatcher: id => {
      dispatch(modalActions.hideModal(id));
    },
    getCoffeeItemDispatcher: () => {
      dispatch(cartActions.getCoffeeItemThunk());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
