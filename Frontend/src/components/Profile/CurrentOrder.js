import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PaymentIcon from '@material-ui/icons/Payment';
export default function CurrentOrder() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Ordered_Item", field: "product_name" },
      { title: "Quantity", field: "quantity" },
      {
        title: "Order Status",
        field: "status",
        lookup: { pending: "Pending", paid: "Confirmed" }
      },
      { title: "Created Date", field: "created_at" }
    ],
    data: [
      //   { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      //   {
      //     name: "Zerya Betül",
      //     surname: "Baran",
      //     birthYear: 2017,
      //     birthCity: 34
      //   }
    ]
  });

  useEffect(() => {
    let token = localStorage.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/orderedItem/`, config)
      .then(res => {
        let items = res.data;

        console.log(items);

        setState({
          ...state,
          data: res.data
        });
      })
      .catch(error => console.log("error:", error));
  }, []);

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <MaterialTable
          options={{ search: false }}
          localization={{
            pagination: {
              labelRowsPerPage: 3
            }
          }}
          className="mat-table"
          title="Current Order"
          columns={state.columns}
          data={state.data}
          actions={[
            {
              icon: "add",
              tooltip: "Add User",
              isFreeAction: true,
              onClick: event => alert("You want to add a new row")
            }
          ]}
        />
      </Grid>
    </>
  );
}
