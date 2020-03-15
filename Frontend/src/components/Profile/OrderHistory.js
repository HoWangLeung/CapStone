/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

export default function CurrentOrder() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Order ID", field: "orderID" },

      { title: "Ordered_Item", field: "product_name" },
      { title: "Quantity", field: "quantity" },
      // {
      //   title: "Order Status",
      //   field: "status",
      //   // lookup: { pending: "Pending", paid: "paid" }
      // },
      {
        title: "Item Status",
        field: "ordered_item_status",
        // lookup: { pending: "Pending", paid: "paid" }
      },
      { title: "Created Date", field: "ordereditem_created_at" }
    ],
    data: [
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34
      }
    ]
  });

  useEffect(() => {
    let token = localStorage.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios
      .get(
        `${process.env.REACT_APP_API_SERVER}/api/orderedItem/orderHistory`,
        config
      )
      .then(response => {
        console.log(response);
        let data = response.data;
        console.log(data);
        
        setState({
          ...state,
          data: data
        });
      });
  }, []);

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <MaterialTable
          options={{
            grouping: true
          }}
          localization={{
            pagination: {
              labelRowsPerPage: 3
            }
          }}
          className="mat-table"
          title="Order History"
          columns={state.columns}
          data={state.data}
        />
      </Grid>
    </>
  );
}
