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
      fontSize: 18,
      marginBottom:"-18px"
    },
    title2: {
      fontSize: 20,
      color: "#dedede",
      marginTop: "-15px",
      //   borderTop: "1px solid #b0b0b0"
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
      borderRadius: "5px"
    },
    Line: {
      borderBottom: "1px solid #b3b3b3",
      width: "100%",
      
    },
    Line2: {
        borderBottom: "2px solid #737070",
        width: "100%",
        
      },
    basket: {
      backgroundColor: "#696868",
      border: "1px solid #696868",
      fontSize:"210%",
      position:"relative",
      left:"5px"
     
    }
  });
  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={0}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Shopping Cart
      </Typography>
      <hr className={classes.Line}></hr>

      <Grid container direction="row" spacing={0}>
        <Link className={classes.button} to="/coffee_menu">
          <Button>
            <ArrowLeftIcon />
            Back to Shopping
          </Button>
        </Link>
      </Grid>
      <hr className={classes.Line2}></hr>
      <Typography className={classes.title2} color="textSecondary" gutterBottom>
        <ShoppingBasketIcon className={classes.basket} /> ITEMS ADDED
      </Typography>
    </Grid>
  );
}
