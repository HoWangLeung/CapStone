import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import axios from "axios";

export default function DatePicker_day(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    let token = localStorage.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    let new_date = day + "/" + month + "/" + year;
    console.log(new_date);

    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/admin/product/chartDataDay`,
        {
          new_date
        },
        config
      )
      .then(data => {
        console.log(data.data);
        let data_by_selected_date = data.data;
        props.pickDate(data_by_selected_date);
        setSelectedDate(date);
      });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="left">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
