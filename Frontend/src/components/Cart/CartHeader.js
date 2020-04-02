import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
export default function CartHeader() {
  const useStyles = makeStyles({
    root: {
      maxWidth: "100%"
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 30,
      marginBottom:"-18px",
      position:"relative",
      left:"42%"
    },
    title2: {
      fontSize: 20,
      color: "#000000",
      marginTop: "-15px",
      position:"relative",
      left: "60px"
     
    },
    pos: {
      marginBottom: 12
    },
    button: {
      border: "1px solid #b0b0b0",
      marginTop: "-5px",
      marginBottom: "-5px",
      "&:hover": { textDecoration: "none" },
      "&:visited": { textDecoration: "none" },
      "&:link": { textDecoration: "none" },
      "&:active": { textDecoration: "none" },
      "&:focus": { textDecoration: "none" },
      borderRadius: "5px",
      position:"relative",
      left: "60px"
    },
    Line: {
      width: "100%",
      color:"transparent"
    }
    ,
    basket: {
      fontSize:"210%",
      position:"relative",
     
    }
  });
  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={0}>
      <Typography className={classes.title} gutterBottom>
        Shopping Cart
      </Typography>
      <hr className={classes.Line}/>

      <Grid container direction="row" spacing={0}>
        <Link className={classes.button} to="/coffee_menu">
          <Button>
            <ArrowLeftIcon />
            Back to Shopping
          </Button>
        </Link>
      </Grid>
      <hr className={classes.Line}/>
      <Typography className={classes.title2} gutterBottom>
        <ShoppingBasketIcon className={classes.basket} /> ITEMS ADDED
      </Typography>
    </Grid>
  );
}
