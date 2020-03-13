/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import WcIcon from "@material-ui/icons/Wc";
import MotorcycleOutlinedIcon from "@material-ui/icons/MotorcycleOutlined";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CheckIcon from "@material-ui/icons/Check";
export default function EditProfileForm(props) {
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

  let user = state.data[0];
  console.log(user);
  const { values, handleChange } = props;
  const { input, handleSubmit } = props;
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
          <input
            placeholder="Enter First Name"
            onChange={handleChange("firstName")}
          ></input>
          <br />
          <LoyaltyIcon /> Last Name:{" "}
          <input
            placeholder="Enter Last Name"
            onChange={handleChange("lastName")}
          ></input>
          <br />
          <ContactPhoneIcon /> Phone:{" "}
          <input
            placeholder="Enter Phone number"
            onChange={handleChange("phone")}
          ></input>
          <br />
          <WcIcon /> Gender:{" "}
          <select onChange={handleChange("gender")}>
            {" "}
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <br />
          <MotorcycleOutlinedIcon /> Delivery Address:{" "}
          <input
            placeholder="Address Line 1"
            onChange={handleChange("address1")}
          ></input>{" "}
          <input
            placeholder="Address Line 2"
            onChange={handleChange("address2")}
          ></input>{" "}
          <input
            placeholder="District"
            onChange={handleChange("district")}
          ></input>{" "}
          <input placeholder="Area" onChange={handleChange("area")}></input>
          <br />
          <VpnKeyIcon /> New Password:
          <input
            placeholder="password"
            onChange={handleChange("password1")}
          ></input>
          <input
            placeholder="confirm new password"
            onChange={handleChange("password2")}
          ></input>
          <button onClick={handleSubmit}>Confirm</button>{" "}
          {props.success ? <CheckIcon style={{color:"green", fontSize:"210%"}} /> : props.loading && props.circular}
        </Typography>
      </CardContent>
    </Card>
  );
}
