const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const { plan } = req.body;

  const priceId = plan === 'pro'
    ? 'price_1TagDbQOuixtoNXNaQtb2cI4'
    : 'price_1TagDMQOuixtoNXNyI9NHEoM';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers.origin}/betaling-ok?plan=${plan}`,
      cancel_url: `${req.headers.origin}/`,
      locale: 'nb',
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};