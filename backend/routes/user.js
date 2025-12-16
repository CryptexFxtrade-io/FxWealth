const router = require("express").Router();
const auth = require("../middleware/auth");
const Investment = require("../models/Investment");

router.post("/invest", auth, async (req, res) => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  await new Investment({
    userId: req.user.id,
    amount: req.body.amount,
    dailyRate: req.body.dailyRate,
    endDate
  }).save();

  res.json({ message: "Investment started" });
});

module.exports = router;
