import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CardSection from "./CardSection";
import "../CSS/PaymentForm.css";
import {
  Button,
  Form,
  FormGroup,
 
} from "reactstrap";
// import Grid from "@material-ui/core/Grid";
import Grid from "@material-ui/core/Grid";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import CreditCardIcon from "@material-ui/icons/CreditCard"; // import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
      flexDirection:"row",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "flex",
    flexDirection:"row",
    justifyContent:"center",
    justifyItems:"center"
    
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },

}));

function CircularIntegration(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = e => {
    props.handleSubmit(e);
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <CreditCardIcon />}
        </Fab>
        {loading && (
          <CircularProgress size={68} className={classes.fabProgress} />
        )}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading}
          onClick={handleButtonClick}
        >
          Confirm
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    console.log("sdfsf");

    let token = localStorage.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/orderedItem`, config)
      .then(data => {
        console.log(data);
        this.setState({
          items: data
        });
      });
  }

  handleSubmit = async event => {
    let token = localStorage.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      alert("no");
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/stripe/create-payment-intent`,
        {},
        config
      )
      .then(data => {
        console.log(data);

        console.log(data.data);
        let client_secret = data.data;

        const result = stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: "Jenny Rosen"
            }
          }
        });

        result.then(result => {
          console.log(result.paymentIntent);

          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
              console.log("successful pay intent");
              console.log(result);

              let token = localStorage.token;
              const config = {
                headers: { Authorization: `Bearer ${token}` }
              };

              let order_id = this.state.items.data[0].orderID;
              console.log(order_id);

              axios
                .post(
                  `${process.env.REACT_APP_API_SERVER}/api/stripe/order/${order_id}`,
                  result,
                  config
                )
                .then(res => {
                  console.log(res);
                  window.location.href = `/paymentSuccess`;
                })
                .catch(error => console.log(error));
            }
          }
        });
      });
  };

  render() {
    return (
      <Grid container direction="column" alignItems="center" alignContent="center" >
        <Form onSubmit={this.handleSubmit}>
          <FormGroup className="myForm">
            <CardSection class="card-input" />{" "}
          </FormGroup>
          <CircularIntegration handleSubmit={this.handleSubmit} />
        </Form>
      </Grid>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <PaymentForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
