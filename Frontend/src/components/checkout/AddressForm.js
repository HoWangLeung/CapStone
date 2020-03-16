import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import "../CSS/MuiFormControl.css";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/styles";
const styles = theme => ({
  root: {
  
  },
  bullet: {
    // display: "inline-block",
    // margin: "0 2px",
    // transform: "scale(0.8)",
    // align: "right"
    width:"100%"
  },
  title: {
    fontSize: 20
  },
  pos: {
    // marginBottom: 12
  }
});

class AddressForm extends Component {
  continue = e => {
    e.preventDefault();

    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;

    console.log(values);

    return (
      <>
        <Grid
        
          container
          direction="column"
          align="center"
          justify="center"
          xs={12}
        >
          <Card xs={12} align="center" className="root">
            <CardContent>
              <React.Fragment>
                <Typography
                  className="{classes.title}"
                  variant="h6"
                  gutterBottom
                >
                  Shipping address
                </Typography>
                <Grid id="checkoutForm" xs={12} sm={12} container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="First name"
                      fullWidth
                      autoComplete="fname"
                      onChange={handleChange("firstName")}
                      // defaultValue={values.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      fullWidth
                      autoComplete="lname"
                      onChange={handleChange("lastName")}
                      // defaultValue={values.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="address1"
                      name="address1"
                      label="Address line 1"
                      fullWidth
                      autoComplete="billing address-line1"
                      onChange={handleChange("address1")}
                      // defaultValue={values.address1}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="address2"
                      name="address2"
                      label="Address line 2"
                      fullWidth
                      autoComplete="billing address-line2"
                      onChange={handleChange("address2")}
                      // defaultValue={values.address2}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="district"
                      name="district"
                      label="District"
                      fullWidth
                      autoComplete="billing address-level2"
                      onChange={handleChange("district")}
                      // defaultValue={values.district}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="area"
                      name="area"
                      label="Area"
                      fullWidth
                      autoComplete="area"
                      onChange={handleChange("area")}
                      // defaultValue={values.district}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="phone"
                      name="phone"
                      label="Phone"
                      fullWidth
                      autoComplete="phone"
                      onChange={handleChange("phone")}
                      // defaultValue={values.phone}
                    />
                  </Grid>
                  <Grid className="shortInput" item xs={12} sm={6}>
                    <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                    <NativeSelect
                      native
                      onChange={handleChange("age")}
                      inputProps={{
                        name: "age",
                        id: "age-native-simple"
                      }}
                    >
                      <option value="" />
                      <option value={"18-25"}>18-25</option>
                      <option value={"26-40"}>26-40</option>
                      <option value={"41-60"}>40-60</option>
                      <option value={"60+"}>60+</option>
                    </NativeSelect>
                    <InputLabel htmlFor="gender-native-simple">
                      Gender
                    </InputLabel>
                    <NativeSelect
                      native
                      onChange={handleChange("gender")}
                      inputProps={{
                        name: "gender",
                        id: "gender-native-simple"
                      }}
                    >
                      <option value="" />
                      <option value={"M"}>Male</option>
                      <option value={"F"}>Female</option>
                    </NativeSelect>
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                  
                </Grid> */}
                   
                  <Grid align="center" item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.continue}
                    >
                      Continue
                    </Button>
                  </Grid>
                </Grid>
              </React.Fragment>
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddressForm);
