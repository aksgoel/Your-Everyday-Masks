// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys

const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const app = express();
const endpointSecret = process.env.ENDPOINT_SECRET_KEY;

const fs = require('fs');

app.use(require('body-parser').text({type: '*/*'}));


app.get('/secret', async (req, res) => {
    const intent = await stripe.paymentIntents.create({
        amount: 1200,
        currency: 'usd',
      });
  res.json({client_secret: intent.client_secret});
});

app.listen(5000, () => {
  console.log('Running on port 5000');
});


app.post('/webhook', function(request, response) {
  const sig = request.headers['stripe-signature'];
  const body = request.body;

  let event = null;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    // invalid signature
    response.status(400).end();
    return;
  }

  let intent = null;
  switch (event['type']) {
    case 'payment_intent.succeeded':
      intent = event.data.object;
      console.log("Succeeded:", intent.id);
      console.log(JSON.stringify(intent.billing_details));
      fs.appendFile('log.txt', JSON.stringify(intent), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      break;
    case 'payment_intent.payment_failed':
      intent = event.data.object;
      const message = intent.last_payment_error && intent.last_payment_error.message;
      console.log('Failed:', intent.id, message);
      break;
  }

  response.sendStatus(200);
});