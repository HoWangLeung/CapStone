import React from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Grid from "@material-ui/core/Grid";
import './CSS/SignUpSuccess.css'
export default function SignUpSuccess() {
  return (
    <>
      <Grid container direction="column" alignItems="center" justify="center">
        <CheckCircleOutlineIcon className="myIcon" />
        <br />
        <h3>Congratulation, your registration is successful</h3>
      </Grid>
    </>
  );
}
