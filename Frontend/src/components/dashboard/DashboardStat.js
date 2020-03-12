import React, { Component } from "react";
import DonaughtChartDay from "./DonaughtChartDay";
import LineChartMonth from "./LineChart_month";
import PersistentDrawer from "./Statistic/Drawer";
import "../CSS/Statistic.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Boxes from "./Statistic/Boxes.js";
import Grid from "@material-ui/core/Grid";

export default class Statistic extends Component {
  render() {
    return (
      <>
        <PersistentDrawer />
        <Grid
          container
          direction="row"
          justify="center"
          // alignItems='space-around'
          spacing={0}
        >
          <Card className="myBoxes">
            <CardContent className="myCardContent">
              <Boxes />
            </CardContent>
          </Card>
          <Card className="myRoot">
            <CardContent className="myCardContent">
              <DonaughtChartDay />
            </CardContent>
          </Card>

          <Card className="myRoot">
            <CardContent>
              <LineChartMonth />
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  }
}
