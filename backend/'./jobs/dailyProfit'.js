const User = require('../models/User');

module.exports.run = async function() {
  const users = await User.find({});
  for (let user of users) {
    const profit = user.balance * 0.01; // 1% daily
    user.balance += profit;
    await user.save();
    console.log(`Added daily profit ${profit} to ${user.email}`);
  }
  console.log('✅ Daily profit job completed');
};
