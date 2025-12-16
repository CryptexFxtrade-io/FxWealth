const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

router.post("/credit", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  const user = await User.findById(req.body.userId);
  user.balance += req.body.amount;
  await user.save();
  res.json({ message: "Credited" });
});

module.exports = router;
