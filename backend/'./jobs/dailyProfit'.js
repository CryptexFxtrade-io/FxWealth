// backend/jobs/dailyProfit.js
const cron = require('node-cron');

// This function will calculate daily profit
function calculateDailyProfit() {
  console.log("Running daily profit job...");

  // TODO: Add your logic here
  // Example: update users' profits in MongoDB
  // e.g., User.updateMany(...)

  console.log("Daily profit job completed!");
}

// Schedule the job to run every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log("Scheduled daily profit job started...");
  calculateDailyProfit();
});

module.exports = calculateDailyProfit;
