import React, { Component } from "react";
import { BrowserRouter, Route, Switch,   } from "react-router-dom";
 import "./App.css";

import Navbars from "./components/Navbars";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";
 import Profile from "./components/Profile/Profile";
import Home from "./pages/Home";
 import Checkout from "./components/checkout/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SignUp from "./components/Authentication/SignUp";
import MaterialTableEditMenu from "./components/dashboard/MaterialTable_Edit_Menu";
import Statistic from "./components/dashboard/DashboardStat";
import OrderControl from "./components/dashboard/OrderControl/OrderControl";
import SignUpSuccess from "./components/Authentication/SignUpSuccess";

const stripePromise = loadStripe("pk_test_oHDsyL0Wxhko6HIFRMrm7QXS00h1og1ziG");

export default class App extends Component {
 
  render() {
    return (
      <>
        <BrowserRouter>
          <div className="App">
            <Navbars />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/coffee_menu" component={Menu} />
              <Route path="/cart" component={Cart} />
              <Route path="/profile" component={Profile} />
              <Route path="/dashboard/statistic" render={() => <Statistic />} />
              <Route
                path="/dashboard/product Control"
                render={() => <MaterialTableEditMenu />}
              />
              <Route path="/dashboard/Order Control" component={OrderControl} />

              <Route path="/signup" component={SignUp} />
              <Route path="/signUpSuccess" component={SignUpSuccess} />

              <Elements stripe={stripePromise}>
                <Route path="/checkout" component={Checkout} />
              </Elements>
            </Switch>
          </div>
        </BrowserRouter>
      </>
    );
  }
}
