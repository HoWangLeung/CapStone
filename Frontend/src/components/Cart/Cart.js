import React, { Component } from "react";
import axios from "axios";
import "./CSS/Cart.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import EditModal from "./EditModal";
import { withStyles } from "@material-ui/styles";
import { useTransition, animated } from "react-spring";
import CartHeader from "./CartHeader";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
const styles = {
  root: {
    background: "linear-gradient(45deg, #82f573 30%, #c4fc4c 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  link: {
    "&:hover": { textDecoration: "none" },
    "&:visited": { textDecoration: "none" },
    "&:link": { textDecoration: "none" },
    "&:active": { textDecoration: "none" },
    "&:focus": { textDecoration: "none" }
  }
};

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      grand_total: 0
    };
  }

  componentDidMount() {
    let token = localStorage.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/orderedItem/`, config)
      .then(res => {
        let items = res.data;
        let grand_total = 0;
        items.forEach(item => {
          grand_total += item.quantity * item.price;
        });

        console.log(items);

        this.setState({
          items: res.data,
          grand_total
        });
      })
      .catch(error => console.log("error:", error));
  }

  handleChange(event, orderItemID) {
    let targetValue = event.target.value;
    let token = localStorage.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
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
        );

        console.log(index, "itemtochange");
        //===============================/
        let items = [...this.state.items];
        let item = { ...items[index] };

        item.quantity = targetValue;
        items[index] = item;

        this.setState({
          items
        });
        this.calculateTotal(config);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleDelete(event, orderItemID) {
    let targetValue = event.target.value;
    let token = localStorage.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios
      .delete(
        `${process.env.REACT_APP_API_SERVER}/api/orderedItem/${orderItemID}`,
        config
      )
      .then(response => {
        const index = this.state.items.findIndex(
          item => item.orderItemID === orderItemID
        );

        let filtered = this.state.items.filter(item => {
          return item.orderItemID !== orderItemID;
        });

        console.log(filtered);
        this.setState({
          items: filtered
        });
        this.calculateTotal(config);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  calculateTotal(config) {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/orderedItem/`, config)
      .then(res => {
        console.log("cal now");
        let items = res.data;
        let grand_total = 0;
        items.forEach(item => {
          grand_total += item.quantity * item.price;
        });

        this.setState({
          grand_total
        });
        console.log(grand_total);
      })
      .catch(error => console.log("error:", error));
  }

  handleEdit = input => e => {
    console.log(e.target.getAttribute("data-index"));
  };

  ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  render() {
    const { classes } = this.props;
    let items = this.state.items;
    const listItems = items.map((row, index) => (
      
      <TableRow key={row.desc}>
        <TableCell>
          {" "}
          <img className="cart_img" src={row.product_img}></img>{" "}
        </TableCell>
        <TableCell align="left">{row.product_name}</TableCell>
        <TableCell className="preference-box">
          <div align="center" className="preference">
            {" "}
            {row.product_size}
          </div>

          <br />
          <div align="center" className="preference">
            {row.product_temperature}
          </div>

          <br />
          <div align="center" className="preference">
            {row.product_milk}
          </div>
          <br />

          {row.special_instruction === "" ? null : (
            <div align="center" className="preference">
              {row.special_instruction}
            </div>
          )}
        </TableCell>
        <TableCell align="left">
          {" "}
          <input
            key={row.orderItemID}
            onChange={event => this.handleChange(event, row.orderItemID)}
            type="number"
            name="quantity"
            min="1"
            max="99"
            value={this.state.items[index].quantity}
          ></input>
        </TableCell>
        <TableCell align="left">{this.ccyFormat(row.price)}</TableCell>
        <TableCell align="left">
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <EditModal index={index} />
            <HighlightOffIcon
              className="icon"
              key={row.orderItemID}
              onClick={event => this.handleDelete(event, row.orderItemID)}
              align="right"
            />
          </Grid>
        </TableCell>
      </TableRow>
    ));

    return (
      <>
        <CartHeader />
        <TableContainer component={Paper}>
          <Table className="myTable" aria-label="spanning table">
            <TableHead></TableHead>
            <TableBody>
              {listItems.length === 0 ? (
                <>
                  <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="center"
                  >
                    <img src="http://alhindmart.com/assets/front-end/img/empty-cart-icon.png"></img>
                    <h2>Cart is empty!</h2>
                    <h5>Looks like you have nothing in your cart</h5>
                    <Link className={classes.link} to="/coffee_menu">
                      <Button className={classes.root}>
                        Continue Shopping
                      </Button>
                    </Link>
                  </Grid>
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell align="left">Product</TableCell>
                    <TableCell align="left">Item</TableCell>
                    <TableCell align="left">Item</TableCell>
                    <TableCell align="left">quantity</TableCell>
                    <TableCell align="left">Unit Price($)</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>

                  {listItems}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Link className="myLink" to="/checkout">
            <Button
              className="confirm-btn"
              variant="contained"
              color="secondary"
            >
              Confirm
            </Button>
          </Link>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    sub_total: state.cartReducer.sub_total,
    grand_total: state.cartReducer.grand_total
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(Cart)
);

//===
