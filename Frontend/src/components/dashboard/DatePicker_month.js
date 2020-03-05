import 'date-fns'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers'

import axios from 'axios'

export default function DatePicker_month (props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date())

  const handleDateChange = date => {
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    let year = date.getFullYear()
    console.log(date)
    console.log(year)

    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/admin/product/chartDataYear`,
        {
          year
        },
        config
      )
      .then(data => {
        console.log(data.data)
        let data_by_selected_year = data.data
        props.pickYear(data_by_selected_year)
        setSelectedDate(date)
      })
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify='left'>
        <DatePicker
          views={['year']}
          label='Year only'
          value={selectedDate}
          onChange={handleDateChange}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  )
}
