import { Doughnut } from 'react-chartjs-2'

import React, { Component } from 'react'
import DatePicker_day from './DatePicker_day'
import './SalesAnalysis.css'
import axios from 'axios'
export default class SalesAnalysis extends Component {
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
        console.log(data.data)

        let data_by_day = data.data
        data_by_day.map(rows => {
          let date = new Date(rows.date_trunc).toLocaleDateString('en-US')
          console.log(date)

          data_by_day.map(data => {
            data.date_trunc = date
          })
        })

        console.log(data_by_day)

        // let items = [...this.state.items]
        // let item = { ...items[modalid] }
        // item.quantity = item.quantity + 1
        // items[modalid] = item

        this.setState({
          data_by_day
        })
      })
      .catch(error => console.log(error))
  }

  pickDate (data_by_selected_date) {
	console.log(data_by_selected_date)
	 this.setState({
		data_by_day:data_by_selected_date
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
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#bfff00',
            '#c547ff',
            '#b05d21',
            '#0ee6c2'
          ]
        }
      ]
    }
    return (
      <div className='donaught'>
        <DatePicker_day className='DatePicker_day' pickDate={this.pickDate} />
        <h2>Sales Record</h2>

        <Doughnut width={700} height={700} data={data} />
      </div>
    )
  }
}
