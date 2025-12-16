const cron = require("node-cron");
const Investment = require("../models/Investment");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

cron.schedule("0 0 * * *", async () => {
  const investments = await Investment.find({ active: true });

  for (let inv of investments) {
    if (new Date() > inv.endDate) {
      inv.active = false;
      await inv.save();
      continue;
    }

    const profit = (inv.amount * inv.dailyRate) / 100;
    const user = await User.findById(inv.userId);
    user.balance += profit;

    await user.save();
    await new Transaction({
      userId: user._id,
      type: "daily_profit",
      amount: profit
    }).save();

    inv.lastProfitDate = new Date();
    await inv.save();
  }
});
