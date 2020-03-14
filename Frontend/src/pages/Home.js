import React from "react";
import Grid from "@material-ui/core/Grid";
import "./Home.css";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    width: "100%",
    objectFit: "cover"
  },
  gradient: {
    display: "block",
    height: "100vh",
    width: "auto",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    background:
      "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1459755486867-b55449bb39ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60') "
  }
});

export default function Home(props) {
  const classes = useStyles(props);
  return <Grid className={classes.gradient} sm={12} md={12}>

    
  </Grid>;
}
