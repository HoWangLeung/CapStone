/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Grid from '@material-ui/core/Grid';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import WcIcon from "@material-ui/icons/Wc";
import MotorcycleOutlinedIcon from "@material-ui/icons/MotorcycleOutlined";
import "./CSS/CustomerInfo.css";

export default function CustomerInfo() {
  const [state, setState] = React.useState({ data: ["data"] });
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
      fontSize: 20
    },
    pos: {
      marginBottom: 12
    }
  });
  const classes = useStyles();

  useEffect(() => {
    let token = localStorage.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/customerInfo`, config)
      .then(res => {
        let info = res.data;

        console.log(info);

        setState({
          ...state,
          data: info
        });
      })
      .catch(error => console.log("error:", error));
  }, []);

  let user = state.data[0];
  console.log(user);
  console.log(state.data);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <span className="title">Customer Detail</span>
        </Typography>

        <Typography align="left" className={classes.pos} color="textSecondary">
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <div className="info-box">
          <PermContactCalendarIcon /> <span className="title">Your ID:</span> {user.user_id}
          </div>
          <div className="info-box">
          <LoyaltyIcon /> <span className="title">First Name:</span> {user.first_name}
          </div>
          <div className="info-box">
          <LoyaltyIcon /> <span className="title">Last Name:</span> {user.last_name}
          </div>
          </Grid>
          <Grid item xs={12} sm={6}>
          <div className="info-box">
          <ContactPhoneIcon /> <span className="title">Phone:</span> {user.phone}
          </div>
          <div className="info-box">
          <WcIcon /> <span className="title">Gender:</span> {user.gender}
          </div>
          <div className="info-box">
          <MotorcycleOutlinedIcon /> <span className="title">Delivery Address: </span>{user.address1},
          {user.address2},{user.district},{user.area}
          </div>
          </Grid>
          </Grid>
        </Typography>
      
      </CardContent>
    </Card>
  );
}
