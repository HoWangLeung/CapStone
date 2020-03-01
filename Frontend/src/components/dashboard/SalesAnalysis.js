
import {Doughnut} from 'react-chartjs-2';

import React, { Component } from 'react'
import DatePicker_day from './DatePicker_day'
import './SalesAnalysis.css'
export default class SalesAnalysis extends Component {
 

  render() {
   
const data = {
	labels: [
		'Cappacuion',
		'Green',
        'Yellow',
        'MilkShake',
        'Espresso'
	],
	datasets: [{
		data: [300, 50, 100,20,40],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};
    return (
      <div className="donaught">
           <DatePicker_day className="DatePicker_day" />
        <h2>Sales Record</h2>
       
        <Doughnut height={300}  data={data} />
      </div>
    );
  }
}
