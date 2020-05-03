# Your Everyday Masks

## Quick Summary
A single page Checkout application to pre-order a 6 pack of face masks powered by Stripe's Payment Intent API.

Wireframe: https://whimsical.com/SgvxgC6osmVvNPVipaPFNJ

## Setup Instructions

Install dependencies using npm:
### `npm install`

Copy the environment variables file from the root of the repository: 
### `cp .env.example .env`

Update `.env` with your own [Stripe API keys](https://dashboard.stripe.com/account/apikeys) and any other configuration details.

Next, follow [these installation steps](https://github.com/stripe/stripe-cli#installation) to install the Stripe CLI which we'll use for webhook testing.

After the installation has finished, authenticate the CLI with your Stripe account:
    stripe login --project-name=stripe-payments-demo

To start the webhook forwarding run:
    stripe listen --project-name=stripe-payments-demo --forward-to http://localhost:5000/webhook

This will output a Webhook Secret Key in your terminal. Copy this Key into the placeholder in `.env`

## Run Instructions

In the project directory, you can run: 
### `npm run start`

This will run both the server and the client. The Order Logs will be written at the root level with filename 'log.txt' and also available on your Stripe Dashboard.

Server is on port 5000

The page will reload if you make edits.
