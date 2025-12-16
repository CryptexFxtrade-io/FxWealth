const cron = require('node-cron');

cron.schedule('0 0 * * *', () => {
  console.log('Daily profit job running...');
});

module.exports = {};
