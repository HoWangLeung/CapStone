import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import axios from 'axios'

export default function MaterialTable_Edit_Menu () {
  const [state, setState] = React.useState({
    columns: [
      {
        title: 'Product',
        field: 'product_name'
        // render: rowData => <p >{rowData.genre_id}{rowData.product_name}</p>
      },
      { title: 'Unit Price ($)', field: 'product_price' },
      { title: 'Unit Cost ($)', field: 'product_cost' },
      {
        title: 'product image',
        field: 'product_img',
        render: rowData => (
          <img src={rowData.product_img} style={{ width: 40 }} />
        )
      },
      { title: 'Genre ID', field: 'genre_id' }
    ],
    data: [
      { nam: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
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
      .get(`${process.env.REACT_APP_API_SERVER}/api/admin/product`, config)
      .then(result => {
        console.log('======================================')

        let data = result.data
        console.log(data)
        setState({
          ...state,
          data: data
        })
      })
  }, [])

  return (
    <MaterialTable
      title='Current Products'
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            let token = localStorage.token
            const config = {
              headers: { Authorization: `Bearer ${token}` }
            }
            console.log(newData)

            axios
              .post(
                `${process.env.REACT_APP_API_SERVER}/api/admin/product`,
                newData,
                config
              )
              .then(result => {
                console.log('<<======================================')
                let data = result.data
                console.log(data)
              })
              .catch(error => {
                console.log(error)
              })

            setTimeout(() => {
              resolve()
              setState(prevState => {
                const data = [...prevState.data]
                data.push(newData)
                return { ...prevState, data }
              })
            }, 600)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            let token = localStorage.token
            const config = {
              headers: { Authorization: `Bearer ${token}` }
            }

            axios
              .put(
                `${process.env.REACT_APP_API_SERVER}/api/admin/product/${oldData.id}`,
                newData,
                config
              )
              .then(result => {
                console.log('<<======================================')
                let data = result.data
                console.log(data)
              })
              .catch(error => {
                console.log(error)
              })
            setTimeout(() => {
              resolve()
              if (oldData) {
                console.log(newData)

                setState(prevState => {
                  const data = [...prevState.data]
                  data[data.indexOf(oldData)] = newData
                  return { ...prevState, data }
                })
              }
            }, 600)
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            let token = localStorage.token
            const config = {
              headers: { Authorization: `Bearer ${token}` }
            }

            axios
              .delete(
                `${process.env.REACT_APP_API_SERVER}/api/admin/product/${oldData.id}`,
                config
              )
              .then(result => {
                console.log('<<======================================')
                let data = result.data
                console.log(data)
              })
              .catch(error => {
                console.log(error)
              })

            console.log(oldData)

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
  )
}
