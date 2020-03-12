import React from "react";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
 import CurrentOrderCard from "./CurrentOrder";
import OrderHistoryCard from "./OrderHistory";
import CustomerInfo from "./CustomerInfo";
import CustomerPicture from "./CustomerPicture";
import EditProfileForm from "./EditProfileForm";



export default function CenteredGrid() {
 
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
