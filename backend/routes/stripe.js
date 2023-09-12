const express = require('express')
const router = express.Router()


const stripe = require('stripe')(process.env.STRIPE_KEY)



router.post('/payment', async (req, res) => {
  if (req.body.items.length != 0)
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],


        line_items: req.body.items.map(item => {
          console.log(item)
          return {
            price_data: {
              currency: 'usd',
              unit_amount: item.price,
              product_data: {
                name: item.title,
              }
            },
            quantity: item.quantity
          }
        }),
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout/success`,
        cancel_url: `${process.env.CLIENT_URL}/checkout`
      })
      res.json({ url: session.url })

    } catch (err) {
      console.log(err)
    }
});

module.exports = router