import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { shadows } from "@material-ui/system";

import { useSpring, animated } from "react-spring";
const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});

export default function Boxes() {
  const classes = useStyles();

  const [income, setIncome] = useState(0);
  const [cost, setCost] = useState(0);
  const [net, setNet] = useState(0);

  useEffect(() => {
    let token = localStorage.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/admin/statistic`, config)
      .then(res => {
        let MonthlyIncome = res.data.MonthlyIncome.income_thismonth;
        let MonthlyCost = res.data.MonthlyCost.cost_thismonth;
        setIncome(MonthlyIncome);
        setCost(MonthlyCost);

        let netIncome = MonthlyIncome - MonthlyCost;
        setNet(netIncome);

        console.log(MonthlyIncome);
        console.log(res.data.MonthlyCost.cost_thismonth);
      })
      .catch(error => console.log(error));
  }, []);

  console.log(parseInt(income));

  const props = useSpring({
    from: { number: 0 },
    to: { number: parseInt(income) },
    config: { duration: 1500 }
  });

  const spring_cost = useSpring({
    from: { number: 0 },
    to: { number: parseInt(cost) },
    config: { duration: 1500 }
  });
  const spring_net = useSpring({
    from: { number: 0 },
    to: { number: parseInt(net) },
    config: { duration: 1500 }
  });

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="space-around"
      spacing={8}
   
    >
      <Grid item xs={12} sm={4}>
        <Box
          boxShadow={3}
          bgcolor="#5c5c5c"
          borderRadius={16}
          color="primary.contrastText"
          p={6}
          fontSize={{ xs: "h6.fontSize", sm: "h4.fontSize", md: "h5.fontSize" }}
        >
          This Month's Income $
          <animated.span>
            {props.number.interpolate(val => Math.floor(val))}
          </animated.span>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box
          boxShadow={3}
          bgcolor="#a3a2a2"
          borderRadius={16}
          color="secondary.contrastText"
          p={6}
          fontSize={{ xs: "h6.fontSize", sm: "h4.fontSize", md: "h5.fontSize" }}
        >
          This Month's cost $
          <animated.span>
            {spring_cost.number.interpolate(val => Math.floor(val))}
          </animated.span>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box
          boxShadow={3}
          bgcolor="#5c5c5c"
          borderRadius={16}
          color="error.contrastText"
          p={6}
          fontSize={{ xs: "h6.fontSize", sm: "h4.fontSize", md: "h5.fontSize" }}
        >
          Monthly net Income $
          <animated.span>
            {spring_net.number.interpolate(val => Math.floor(val))}
          </animated.span>
        </Box>
      </Grid>
    </Grid>
  );
}
