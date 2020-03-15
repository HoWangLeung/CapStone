/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import MaterialTable from "material-table";
import SplitButton from "./SplitButton";
import "./CSS/OrderControl.css";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import DrawerLeft from "../Statistic/Drawer";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
export default function OrderControl() {
  const [state, setState] = React.useState({
    columns: [
      { title: "User ID", field: "user_id" },
      { title: "firstName", field: "first_name" },
      { title: "LastName", field: "last_name" },
      { title: "Order ID", field: "order_id" },
      {
        title: "Item Status",
        field: "ordered_item_status"
        // lookup: { 'pending': 'Pending', 'paid': 'Confirmed' }
      },
      {
        title: "Order Status",
        field: "status"
        // lookup: { 'pending': 'Pending', 'paid': 'Confirmed' }
      },
      { title: "Ordered_Item", field: "product_name" },
      { title: "Quantity", field: "quantity" },
      { title: "Created Date", field: "created_at" }
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
      .get(`${process.env.REACT_APP_API_SERVER}/api/admin/order`, config)
      .then(response => {
        console.log(response);
        let data = response.data;
        setState({
          ...state,
          data: data
        });
      });
  }, []);

  return (
    <>
      <DrawerLeft />
      <SplitButton />
      <br />
      <br />
      <Grid container direction="row" justify="center" alignItems="center">
        <MaterialTable
          options={{
            filtering: true,
            grouping: true
          }}
          className="mat-table"
          title="Editable Example"
          columns={state.columns}
          data={state.data}
          // editable={{
          //   onRowDelete: oldData =>
          //     new Promise(resolve => {
          //       setTimeout(() => {
          //         console.log(oldData);
          //         let order_id = oldData.order_id;
          //         console.log(order_id);
          //         let ordered_item_id = oldData.ordered_item_id;
          //         console.log(ordered_item_id);

          //         let token = localStorage.token;
          //         const config = {
          //           headers: { Authorization: `Bearer ${token}` }
          //         };

          //         axios.put(
          //           `${process.env.REACT_APP_API_SERVER}/api/orderedItem/refund/${ordered_item_id}`,
          //           {
          //             order_id
          //           },
          //           config
          //         );

          //         resolve();
          //         window.location.reload();
          //         // setState(prevState => {
          //         //   const data = [...prevState.data];
          //         //   data.splice(data.indexOf(oldData), 1);
          //         //   return { ...prevState, data };
          //         // });
          //       }, 600);
          //     })
          // }}
          actions={[
            {
              tooltip: "Refund this item",
              icon: () => <MonetizationOnIcon />,
              onClick: (event, rowData) => {
                if (
                  window.confirm("are you sure you want to refund this item?")
                ) {
                  console.log(rowData);

                  console.log(state.data);

                  let order_id = rowData.order_id;
                  console.log(order_id);
                  let ordered_item_id = rowData.ordered_item_id;
                  console.log(ordered_item_id);

                  let token = localStorage.token;
                  const config = {
                    headers: { Authorization: `Bearer ${token}` }
                  };

                  axios
                    .put(
                      `${process.env.REACT_APP_API_SERVER}/api/orderedItem/refund/${ordered_item_id}`,
                      {
                        order_id
                      },
                      config
                    )
                    .then(data => window.location.reload())
                    .catch(e => console.log(e));
                }
              }
            }
          ]}
        />
      </Grid>
    </>
  );
}
