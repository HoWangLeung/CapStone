import { Doughnut } from 'react-chartjs-2'
import Grid from '@material-ui/core/Grid'
import React, { Component } from 'react'
import DatePicker_day from './Statistic/DatePicker_day'
import '../CSS/DonaughtChartDay.css'
import axios from 'axios'
export default class DonaughtChartDay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data_by_day: []
    }

    this.pickDate = this.pickDate.bind(this)
  }

  componentDidMount () {
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    axios
      .get(
        `${process.env.REACT_APP_API_SERVER}/api/admin/product/chartDataDay`,
        config
      )
      .then(data => {
        let data_by_day = data.data
        data_by_day.map(rows => {
          let date = new Date(rows.date_trunc).toLocaleDateString('en-US')

          data_by_day.map(data => {
            data.date_trunc = date
          })
        })

        this.setState({
          data_by_day
        })
      })
      .catch(error => console.log(error))
  }

  pickDate (data_by_selected_date) {
    console.log(data_by_selected_date)
    this.setState({
      data_by_day: data_by_selected_date
    })
  }

  render () {
    let labels_arr = []
    let datasets_arr = []
    this.state.data_by_day.forEach(rows => {
      labels_arr.push(rows.product_name)
      datasets_arr.push(rows.total_ordered_quantity)
    })

    const data = {
      labels: labels_arr,
      datasets: [
        {
          data: datasets_arr,
          backgroundColor: [
            '#2e4c7d',
            '#316363',
            '#FFCE56',
            '#bfff00',
            '#49a690',
            '#ff6969',
            '#0ee6c2'
          ]
        }
      ]
    }

    if (labels_arr.length !== 0) {
      return (
        <Grid container direction='row' justify='center' alignItems='center'>
          <DatePicker_day className='DatePicker_day' pickDate={this.pickDate} />
          <h6>Number of products sold</h6>

          <Doughnut
            options={{
              responsive: true,
              maintainAspectRatio: true,
              maintainAspectRatio: true
            }}
            data={data}
          />
        </Grid>
      )
    } else {
      return (
        <Grid container direction='row' justify='center' alignItems='center'>
          <DatePicker_day className='DatePicker_day' pickDate={this.pickDate} />
          <img src='https://img.icons8.com/dotty/80/000000/nothing-found.png'></img>
          <br />
          <h1 style={{ fontFamily: 'Amatic SC', fontSize: '48px' }}>
            Data Not Found <br />
            Try another date
          </h1>
        </Grid>
      )
    }
  }
}
// cutoutPercentage: 70
