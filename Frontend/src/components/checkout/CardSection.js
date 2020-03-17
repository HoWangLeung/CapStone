/**
 * Use the CSS tab above to style your Element's container.
 */
import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import "../CSS/CardSection.css";
import Grid from "@material-ui/core/Grid";
 
 
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


 
  return (
    <Grid direction="column" justify="center" align="center">
      <Grid md={12} align="left">
        <img
          className="cardIMG"
          src="https://freesvg.org/img/credit-card-front.png"
          alt="card"
        ></img>
      </Grid>
      <Grid md={12} align="center">
        <CardElement className="card-input" options={CARD_ELEMENT_OPTIONS} />
      </Grid>
    </Grid>
  );
}

export default CardSection;
