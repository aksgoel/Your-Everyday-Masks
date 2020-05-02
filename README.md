Name of Project: Your Everyday Masks

Quick Summary:
Single Page Checkout Page to pre-order a 6 pack of face masks. Powered using Stripe Payment Intent API.

Setup Instructions:

Install dependencies using npm:
### `npm install`

Copy the environment variables file from the root of the repository:
    cp .env.example .env

Update `.env` with your own [Stripe API keys](https://dashboard.stripe.com/account/apikeys) and any other configuration details. These environment variables are loaded and used in [`server/node/config.js`](/server/node/config.js), where you can review and edit other options such as the app currency and your Stripe account country.

Next, follow [these installation steps](https://github.com/stripe/stripe-cli#installation) to install the Stripe CLI which we'll use for webhook testing.

After the installation has finished, authenticate the CLI with your Stripe account:
    stripe login --project-name=stripe-payments-demo

To start the webhook forwarding run:
    stripe listen --project-name=stripe-payments-demo --forward-to http://localhost:5000/webhook


In the project directory, you can run:
### `npm run`

Logs will be written at the root level with filename 'log.txt'

Server is on port 5000

This runs both the server and the client

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.