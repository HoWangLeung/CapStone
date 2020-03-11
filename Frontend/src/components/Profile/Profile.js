import React from "react";
import Grid from "@material-ui/core/Grid";
import Fade from 'react-reveal/Fade';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CurrentOrderCard from "./CurrentOrder";
import OrderHistoryCard from "./OrderHistory";
import CustomerInfo from "./CustomerInfo";
import CustomerPicture from "./CustomerPicture";
import EditProfileForm from "./EditProfileForm";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  control: {
    padding: theme.spacing(2)
  }
}));

export default function CenteredGrid() {
  const classes = useStyles();
  return (
    <Grid container direction="row" spacing={0}>
      <Grid item md={4}>
        <CustomerPicture />
      </Grid>
      <Grid item md={8} align="center">
        <CustomerInfo />
        <br />

        <CurrentOrderCard />
        <br />

        <OrderHistoryCard />
        <EditProfileForm />
      </Grid>
    </Grid>
  );
}
