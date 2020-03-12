import React, { Component } from 'react'
  import '../CSS/Review.css'
import axios from 'axios'
import { Jumbotron,   Table } from 'reactstrap'
import Button from '@material-ui/core/Button'

export default class Review extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  continue = e => {
    e.preventDefault()
    console.log('reaching',e);
    
    this.props.nextStep()
  }

  componentDidMount () {
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/orderedItem/`, config)
      .then(data => {
        console.log(data)
        this.setState({
          items: data.data
        })
      })
      .catch(error => console.log(error))
  }

  render () {
    let { items } = this.state
    console.log(items)

    return (
      <div align='center'>
        <Jumbotron className='myJumboTron'>
          <h4>Order Summary</h4>
          <Table borderless>
            <thead align='center'>
              <tr align='center'>
                <th>#</th>
                <th>Product</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => {
                return (
                  <tr align='center'>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>

          <Button variant='contained' color='primary' onClick={this.continue}>
            Continue
          </Button>
        </Jumbotron>
      </div>
    )
  }
}
