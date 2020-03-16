import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import axios from "axios";
import { withStyles } from "@material-ui/styles";
import "../CSS/Checkout.css";
import Grid from "@material-ui/core/Grid";

const styles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    // width: "auto",
    // marginLeft: theme.spacing(2),
    // marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    // marginTop: theme.spacing(3),
    // marginBottom: theme.spacing(3),
    // padding: theme.spacing(2),

    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    },
    minWidth: "1600px"
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      firstName: "",
      lastName: "",
      gender: "",
      phone: "",
      address1: "",
      address2: "",
      district: "",
      area: ""
    };
  }

  Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  nextStep = () => {
    const {
      step,
      firstName,
      lastName,
      gender,
      age,
      phone,
      address1,
      address2,
      district,
      area
    } = this.state;
    switch (step) {
      case 0:
        let token = localStorage.token;
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        axios.post(
          `${process.env.REACT_APP_API_SERVER}/api/customerInfo`,
          {
            firstName,
            lastName,
            gender,
            age,
            address1,
            address2,
            district,
            area,
            phone
          },
          config
        );
        this.setState({
          step: step + 1
        });
        break;
      case 1:
        this.setState({
          step: step + 1
        });
        return;

      case 2:
        return;

      default:
        throw new Error("Unknown step");
    }
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => e => {
    console.log([input]);

    this.setState({ [input]: e.target.value });
  };

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            handleChange={this.handleChange}
            nextStep={this.nextStep}
          />
        );
      case 1:
        return <Review nextStep={this.nextStep} />;
      case 2:
        return <PaymentForm />;
      default:
        throw new Error("Unknown step");
    }
  }

  render() {
    const steps = [
      "Personal Information",
      "Review your order ",
      "Payment details"
    ];
    const { classes } = this.props;

    return (
      <React.Fragment>
        {/* <CssBaseline /> */}
        <Grid container direction="column" alignItems="center"    >
          <Paper elevation={12} className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={this.state.step} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {this.getStepContent(this.state.step)}

            <React.Fragment>
              {this.state.step === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : null
              // <React.Fragment>
              //   {this.getStepContent(this.state.step)}
              //   <div className={classes.buttons}>
              //     {this.state.step !== 0 && (
              //       <Button onClick={handleBack} className={classes.button}>
              //         Back
              //       </Button>
              //     )}
              //     <Button
              //       variant='contained'
              //       color='primary'
              //       onClick={handleNext}
              //       className={classes.button}
              //     >
              //       {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              //     </Button>
              //   </div>
              // </React.Fragment>
              }
            </React.Fragment>
          </Paper>
          {/* <Copyright /> */}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Checkout);
