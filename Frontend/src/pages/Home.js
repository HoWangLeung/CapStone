import React from "react";
import Grid from "@material-ui/core/Grid";
import "./Home.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function Home(props) {
  // const classes = useStyles(props);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className="gradient"
      >
        <Grid align="center" item xs={12}>
          <h1 className="Homeh1">Welcome to my coffee shop</h1>
          <Button variant="contained" color="secondary">
            Explore
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
