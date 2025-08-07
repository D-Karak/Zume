const  { verifyWebhook } = require('@clerk/express/webhooks');
const express = require ('express');
const { createUser } = require('../../../controller/webhook/clerk');

const router = express.Router();

router.post('/clerk-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    
    if (eventType === 'user.created') {
      await createUser(evt.data);
    }

    return res.send('Webhook received');
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).send('Error verifying webhook');
  }
});

module.exports = router;