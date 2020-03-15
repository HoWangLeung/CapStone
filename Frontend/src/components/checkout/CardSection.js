/**
 * Use the CSS tab above to style your Element's container.
 */
import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import "../CSS/CardSection.css";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "20px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

function CardSection() {
  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  return (
    <Grid justify="center" align="center">
      <Card>
        <Grid md={6} align="left">
          <img
            src="https://freesvg.org/img/credit-card-front.png"
            alt="card"
          ></img>
        </Grid>
        <Grid md={6} align="left">
          <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            label="Card Holder Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBoxIcon />
                </InputAdornment>
              )
            }}
          />
          <CardElement className="card-input" options={CARD_ELEMENT_OPTIONS} />
        </Grid>
      </Card>
    </Grid>
  );
}

export default CardSection;
