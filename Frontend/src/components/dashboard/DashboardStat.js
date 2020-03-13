import React, { Component } from "react";
import DonaughtChartDay from "./DonaughtChartDay";
import LineChartMonth from "./LineChart_month";
import PersistentDrawer from "./Statistic/Drawer";
import "../CSS/Statistic.css";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import Boxes from "./Statistic/Boxes.js";
import Grid from "@material-ui/core/Grid";

export default class Statistic extends Component {
  render() {
    return (
      <Grid direction="row" container fluid={true} >
          <Grid xs={12}  sm={12} md={12}>
          <PersistentDrawer />
          </Grid>
      
        <Grid xs={12}  sm={12} md={12}>
        <Boxes />
         </Grid>
        {/* <Grid sm={6}> */}

        {/* </Grid> */}
        <Grid xs={12}  sm={12} md={6}>
          <DonaughtChartDay />
        </Grid>
        <Grid  xs={12} sm={12} md={6}>
          <LineChartMonth />
        </Grid>
      </Grid>
    );
  }
}
