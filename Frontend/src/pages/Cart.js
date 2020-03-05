import React, { Component } from 'react'
import axios from 'axios'
import './Cart.css'
// import {
//   Card,
//   CardImg,
//   CardText,
//   CardBody,
//   CardTitle,
//   CardSubtitle,
//   Button,
//   Container,
//   Row,
//   Col,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   FormText,
//   Table
// } from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
class Cart extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [],
      grand_total: 0
    }
  }

  componentDidMount () {
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/orderedItem/`, config)
      .then(res => {
        let items = res.data
        let grand_total = 0
        items.forEach(item => {
          grand_total += item.quantity * item.price
        })

        console.log(items)

        this.setState({
          items: res.data,
          grand_total
        })
      })
      .catch(error => console.log('error:', error))
  }

  handleChange (event, orderItemID) {
    let targetValue = event.target.value
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    axios
      .put(
        `${process.env.REACT_APP_API_SERVER}/api/orderedItem/${orderItemID}`,
        {
          quantity: targetValue
        },
        config
      )
      .then(response => {
        const index = this.state.items.findIndex(
          item => item.orderItemID === orderItemID
        )

        console.log(index, 'itemtochange')
        //===============================/
        let items = [...this.state.items]
        let item = { ...items[index] }

        item.quantity = targetValue
        items[index] = item

        this.setState({
          items
        })
        this.calculateTotal(config)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleDelete (event, orderItemID) {
    let targetValue = event.target.value
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios
      .delete(
        `${process.env.REACT_APP_API_SERVER}/api/orderedItem/${orderItemID}`,
        config
      )
      .then(response => {
        const index = this.state.items.findIndex(
          item => item.orderItemID === orderItemID
        )

        let filtered = this.state.items.filter(item => {
          return item.orderItemID !== orderItemID
        })

        console.log(filtered)
        this.setState({
          items: filtered
        })
        this.calculateTotal(config)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  calculateTotal (config) {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/orderedItem/`, config)
      .then(res => {
        console.log('cal now')
        let items = res.data
        let grand_total = 0
        items.forEach(item => {
          grand_total += item.quantity * item.price
        })

        this.setState({
          grand_total
        })
        console.log(grand_total)
      })
      .catch(error => console.log('error:', error))
  }

  ccyFormat (num) {
    return `${num.toFixed(2)}`
  }
  render () {
    let items = this.state.items
    const listItems = items.map((row, index) => (
      <TableRow key={row.desc}>
        <TableCell>
          {' '}
          <img className='cart_img' src={row.product_img}></img>{' '}
        </TableCell>
        <TableCell align='left'>{row.product_name}</TableCell>
        <TableCell align='left'>
          {' '}
          <input
            key={row.orderItemID}
            onChange={event => this.handleChange(event, row.orderItemID)}
            type='number'
            name='quantity'
            min='1'
            max='99'
            value={this.state.items[index].quantity}
          ></input>
        </TableCell>
        <TableCell align='left'>{this.ccyFormat(row.price)}</TableCell>
        <TableCell align='left'>
          {' '}
          <HighlightOffIcon
            className='icon'
            key={row.orderItemID}
            onClick={event => this.handleDelete(event, row.orderItemID)}
          />
        </TableCell>
      </TableRow>
    ))

    return (
      <TableContainer component={Paper}>
        <Table className='myTable' aria-label='spanning table'>
          <TableHead>
           
          </TableHead>
          <TableBody>
            {listItems.length === 0 ? (
              <>
                <img src='https://cdn.dribbble.com/users/204955/screenshots/4930541/emptycart.png'></img>
                <h2>Cart is empty!</h2>
                <h5>Looks like you have nothing in your cart</h5>
                <h5>
                  Click <Link to='/coffee_menu'>here </Link> to continue
                  shopping
                </h5>
              </>
            ) : (
              <>
               <TableRow>
              <TableCell align='left'>Product</TableCell>
              <TableCell align='left'>Product</TableCell>
              <TableCell align='left'>Qty.</TableCell>
              <TableCell align='left'>Unit Price($)</TableCell>
            </TableRow>
                {listItems}

                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align='left'>${this.state.grand_total}</TableCell>
                  <TableCell align='left'>
                    <Link className='myLink' to='/checkout'>
                      <Button variant='contained' color='secondary'>
                        Confirm
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    sub_total: state.cartReducer.sub_total,
    grand_total: state.cartReducer.grand_total
  }
}

export default connect(mapStateToProps)(Cart)

//===
