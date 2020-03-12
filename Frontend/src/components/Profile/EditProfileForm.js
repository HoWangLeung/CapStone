/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect } from "react";
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
 import VpnKeyIcon from '@material-ui/icons/VpnKey';
export default function EditProfileForm() {
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
          data: res.data
        });
      })
      .catch(error => console.log("error:", error));
  }, []);

  let user = state.data[0];
  console.log(user);

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
          <LoyaltyIcon /> First Name:{" "}
          <input placeholder="Enter First Name"></input>
          <br />
          <LoyaltyIcon /> Last Name:{" "}
          <input placeholder="Enter Last Name"></input>
          <br />
          <ContactPhoneIcon /> Phone:{" "}
          <input placeholder="Enter Phone number"></input>
          <br />
          <WcIcon /> Gender:{" "}
          <select>
            {" "}
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          
          </select>
          <br />
          <MotorcycleOutlinedIcon /> Delivery Address:   <input placeholder="Address Line 1"></input>  <input placeholder="Address Line 2"></input>  <input placeholder="District"></input>  <input placeholder="Area"></input>
          <br />
          <VpnKeyIcon/> Password:<input placeholder="password "></input><input placeholder="confirm password"></input>
                        <button>Confirm</button>
        </Typography>
      </CardContent>
    </Card>
  );
}
