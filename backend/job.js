const cron = require('node-cron');

console.log('Cron jobs file loaded – scheduling tasks...');

// Example: Run every minute (for testing)
cron.schedule('* * * * *', () => {
  console.log('Cron job running every minute:', new Date().toISOString());
  // Put your actual scheduled logic here later
});

// Add more jobs as needed, e.g.:
// cron.schedule('0 0 * * *', () => { ... daily task ... });

module.exports = {};  // Optional – just to make it a module
