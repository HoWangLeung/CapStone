import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import axios from "axios";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import { useSpring, animated } from "react-spring";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345
//   }
// });

export default function Boxes() {
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
      spacing={1}
    >
      <Grid item xs={12} sm={4}>
        <Box
          boxShadow={3}
          bgcolor="#f7f7f7"
          borderRadius={2}
          color="#00000"
          p={6}
          fontSize={{ xs: "h6.fontSize", sm: "h4.fontSize", md: "h5.fontSize" }}
        >
          <span><MonetizationOnIcon/>This Month's Income $</span>
          <animated.span>
            {props.number.interpolate(val => Math.floor(val))}
          </animated.span>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box
          boxShadow={3}
          bgcolor="#f7f7f7"
          borderRadius={2}
          color="#00000"
          p={6}
          fontSize={{ xs: "h6.fontSize", sm: "h4.fontSize", md: "h5.fontSize" }}
        >
          <span><MoneyOffIcon/>This Month's Cost $</span>
          <animated.span>
            {spring_cost.number.interpolate(val => Math.floor(val))}
          </animated.span>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box
          boxShadow={3}
          bgcolor="#f7f7f7"
          borderRadius={2}
          color="#00000"
          p={6}
          fontSize={{ xs: "h6.fontSize", sm: "h4.fontSize", md: "h5.fontSize" }}
        >
        <span><AccountBalanceIcon/> Monthly net Income $</span>       <animated.span>
            {spring_net.number.interpolate(val => Math.floor(val))}
          </animated.span>
       
        </Box>
      </Grid>
    </Grid>
  );
}
