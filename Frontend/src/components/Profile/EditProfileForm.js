/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
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
import "./CSS/CustomerInfo.css";

export default function EditProfileForm(props) {
  const [state] = React.useState({ data: ["data"] });

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
  const {  handleChange } = props;
  const { input, handleSubmit } = props;
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
          <div className="info-box-edit">
          <PermContactCalendarIcon /> Your ID: {user.user_id}
          </div>
          <div className="info-box-edit">
          <LoyaltyIcon /> <span className="title">First Name:</span>{" "}
          <input
            placeholder="Enter First Name"
            onChange={handleChange("firstName")}
          ></input>
          </div>
          <div className="info-box-edit">
          <LoyaltyIcon /><span className="title"> Last Name:</span>{" "}
          <input
            placeholder="Enter Last Name"
            onChange={handleChange("lastName")}
          ></input>
          </div>
          <div className="info-box-edit">
          <ContactPhoneIcon /> <span className="title">Phone:</span>{" "}
          <input
            placeholder="Enter Phone Number"
            onChange={handleChange("phone")}
          ></input>
          </div>
          <div className="info-box-edit">
          <WcIcon /> <span className="title">Gender:</span>{" "}
          <select onChange={handleChange("gender")}>
            {" "}
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          </div>
          <div className="info-box-edit">
          <MotorcycleOutlinedIcon /> <span className="title">Delivery Address:</span>{" "}
         <div className="input-pos">
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
          <input placeholder="Area" onChange={handleChange("area")}>
          </input>
          </div>
          <div className="info-box-edit-pw">
          <VpnKeyIcon /> <span className="title">New Password:</span>
          <div className="input-pos">
          <input
            placeholder="password"
            onChange={handleChange("password1")}
          ></input>
          <input
            placeholder="confirm new password"
            onChange={handleChange("password2")}
          ></input>
          </div>
          </div>
          </div>
          
          <button onClick={handleSubmit}>Confirm</button>{" "}
          {props.success ? <CheckIcon style={{color:"green", fontSize:"210%"}} /> : props.loading && props.circular}
        </Typography>
      </CardContent>
    </Card>
  );
}
