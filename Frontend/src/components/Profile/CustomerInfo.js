/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import WcIcon from "@material-ui/icons/Wc";
import MotorcycleOutlinedIcon from "@material-ui/icons/MotorcycleOutlined";
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
          Customer Detail
        </Typography>

        <Typography align="left" className={classes.pos} color="textSecondary">
          <PermContactCalendarIcon /> Your ID: {user.user_id}
          <br />
          <LoyaltyIcon /> First Name: {user.first_name}
          <br />
          <LoyaltyIcon /> Last Name: {user.last_name}
          <br />
          <ContactPhoneIcon /> Phone: {user.phone}
          <br />
          <WcIcon /> Gender: {user.gender}
          <br />
          <MotorcycleOutlinedIcon /> Delivery Address: {user.address1},
          {user.address2},{user.district},{user.area}
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
