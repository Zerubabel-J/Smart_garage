// Import the order service
const orderService = require("../services/order.service");
// Function to create a new order
async function createOrder(req, res, next) {
  try {
    const orderId = await orderService.createOrder(req.body);

    res
      .status(201)
      .json({ id: orderId, message: "Order created successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to create order" });
  }
}
// Export the module
module.exports = {
  createOrder,
};
