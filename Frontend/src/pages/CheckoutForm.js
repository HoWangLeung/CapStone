import React from 'react'
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js'
import axios from 'axios'
import CardSection from './CardSection'

class CheckoutForm extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      items: []
    }
  }

  componentDidMount () {
    console.log('sdfsf')

    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/orderedItem`, config)
      .then(data => {
        console.log(data)
        this.setState({
          items: data
        })
      })
  }

  handleSubmit = async event => {
    let token = localStorage.token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()
    const { stripe, elements } = this.props

    if (!stripe || !elements) {
      alert('no')
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }

    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/stripe/create-payment-intent`,
        {},
        config
      )
      .then(data => {
        console.log(data)

        console.log(data.data)
        let client_secret = data.data

        const result = stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: 'Jenny Rosen'
            }
          }
        })

        result.then(result => {
          console.log(result.paymentIntent)

          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message)
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              console.log('successful pay intent')
              console.log(result)

              let token = localStorage.token
              const config = {
                headers: { Authorization: `Bearer ${token}` }
              }

              let order_id = this.state.items.data[0].orderID
              console.log(order_id)

              axios
                .post(
                  `${process.env.REACT_APP_API_SERVER}/api/stripe/order/${order_id}`,
                  result,
                  config
                )
                .then(res => {
                  console.log(res)
                })
                .catch(error => console.log(error))
            }
          }
        })
      })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button disabled={!this.props.stripe}>Confirm order</button>
      </form>
    )
  }
}

export default function InjectedCheckoutForm () {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  )
}
