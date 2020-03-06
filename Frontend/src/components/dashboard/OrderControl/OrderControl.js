import React from 'react'
import MaterialTable from 'material-table'
import SplitButton from './SplitButton'
import './CSS/OrderControl.css'
import Grid from '@material-ui/core/Grid'

export default function OrderControl () {
  const [state, setState] = React.useState({
    columns: [
      { title: 'User ID', field: 'name' },
      { title: 'firstName', field: 'name' },
      { title: 'LastName', field: 'surname' },
      { title: 'Order ID', field: 'birthYear', type: 'numeric' },
      {
        title: 'Order Status',
        field: 'birthCity',
        lookup: { 34: 'Pending', 63: 'Confirmed' }
      },
      { title: 'Ordered_Item', field: 'birthYear' },
      { title: 'Created Date', field: 'birthYear' },

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

  return (
    <>
      <SplitButton />
      <br />
      <br />
      <Grid container direction='row' justify='center' alignItems='center'>
        <MaterialTable
          options={{
            filtering: true,
            grouping: true
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
        />
      </Grid>
    </>
  )
}
