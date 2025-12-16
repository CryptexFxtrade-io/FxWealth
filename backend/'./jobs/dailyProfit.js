const cron = require('node-cron');

console.log('dailyProfit file loaded');

cron.schedule('* * * * *', () => {
  console.log('Daily profit job running');
});

module.exports = {};
