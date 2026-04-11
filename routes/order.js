const Order = require("../models/Order");

router.get("/", async (req, res) => {

  const orders = await Order.find()
    .populate("user")        // replaces user ID with actual data
    .populate("products");   // replaces product IDs

  res.json(orders);
});