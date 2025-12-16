const cron = require('node-cron');
const Investment = require('../models/Investment');

cron.schedule('0 0 * * *', async () => {
  const investments = await Investment.find({ status: 'active' });

  for (const inv of investments) {
    inv.profit += inv.amount * 0.02;
    await inv.save();
  }

  console.log('Daily profit calculated');
});
