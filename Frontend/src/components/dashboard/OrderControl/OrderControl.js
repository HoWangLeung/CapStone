/* eslint-disable react-hooks/exhaustive-deps */
import React, {   useEffect } from 'react'
import MaterialTable from 'material-table'
import SplitButton from './SplitButton'
import './CSS/OrderControl.css'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

export default function OrderControl () {
  const [state, setState] = React.useState({
    columns: [
      { title: 'User ID', field: 'user_id' },
      { title: 'firstName', field: 'first_name' },
      { title: 'LastName', field: 'last_name' },
      { title: 'Order ID', field: 'order_id', type: 'numeric' },
      {
        title: 'Order Status',
        field: 'status',
        lookup: { 'pending': 'Pending', 'paid': 'Confirmed' }
      },
      { title: 'Ordered_Item', field: 'product_name' },
      { title: 'Quantity', field: 'quantity' },
      { title: 'Created Date', field: 'created_at' }
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34
      }
    ]
  })

  useEffect(() => {
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/admin/order`,config)
      .then(response => {
    
        console.log(response)
        let data = response.data
        setState({
            ...state,
            data:data
        })
      })
  },[])

  return (
    <>
      <SplitButton />
      <br />
      <br />
      <Grid container direction='row' justify='center' alignItems='center'>
        <MaterialTable
          options={{
            filtering: true,
            grouping: true,
            selection: true
          }}
          className='mat-table'
          title='Editable Example'
          columns={state.columns}
          data={state.data}
          editable={{
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve()
                  setState(prevState => {
                    const data = [...prevState.data]
                    data.splice(data.indexOf(oldData), 1)
                    return { ...prevState, data }
                  })
                }, 600)
              })
          }}
          actions={[
            {
              tooltip: 'Remove All Selected Users',
              icon: 'delete',
              onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
            }
          ]}
        />
      </Grid>
    </>
  )
}
