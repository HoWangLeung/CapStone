import React, { Component } from 'react'
import DonaughtChartDay from './DonaughtChartDay'
import LineChart_month from './LineChart_month'
import PersistentDrawer from './Drawer'
import { Jumbotron, Container } from 'reactstrap'
import '../CSS/Statistic.css'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

export default class Statistic extends Component {
  render () {
    return (
      <div>
        <PersistentDrawer />
        <div>
          <Card className='myRoot'>
            <CardContent className='myCardContent'>
              <DonaughtChartDay />
            </CardContent>
          </Card>
          <br />
          <Card className='myRoot'>
            <CardContent>
              <LineChart_month />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}
