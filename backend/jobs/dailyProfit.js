console.log('dailyProfit loaded successfully');

const cron = require('node-cron');

cron.schedule('* * * * *', () => {
  console.log('Daily profit cron running');
});

module.exports = {};
