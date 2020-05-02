import React from 'react';
import './CheckoutFormStyles.css'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import OrderSection from './OrderSection';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async(event) => {

        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        var response = fetch('/secret').then(function(response) {
            return response.json();
        }).then(function(responseJson) {
            var clientSecret = responseJson.client_secret;
            // Call stripe.confirmCardPayment() with the client secret.
            var billing_details = {
                email: document.getElementById("email").value,
                name: document.getElementById("fullname").value,
            }

            stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details,
                    // description: "6 pack of Black Masks"
                }
            }).then(function(result) {
                if (result.error) {
                    // Show error to your customer (e.g., insufficient funds)
                    console.log(result.error.message);
                    window.alert(result.error.message)
                } else {
                    // The payment has been processed!
                    if (result.paymentIntent.status === 'succeeded') {
                        // Show a success message to your customer
                        // There's a risk of the customer closing the window before callback
                        // execution. Set up a webhook or plugin to listen for the
                        // payment_intent.succeeded event that handles any business critical
                        // post-payment actions.

                        window.alert('Payment Succeeded')
                    }
                }
            })
        });
};

return (
    <div className= "div">
    <form onSubmit={handleSubmit}>
      <OrderSection />
      <CardSection />
      <button className = "button" disabled={!stripe}>Pay $12.00</button>
      <h5>Note: We will request for your shipping information via email once the order is ready to ship. Please limit purchase to one pack per person.</h5>
    </form>
    </div>
);}