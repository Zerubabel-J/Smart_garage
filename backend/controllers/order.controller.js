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
// Function to get all orders
async function getAllOrders(req, res, next) {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: "Failed to retrieve orders" });
  }
}

// Function to get an order by its ID
async function getOrderById(req, res, next) {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve order" });
  }
}

// Function to delete an order by ID
async function deleteOrderById(req, res, next) {
  const { id } = req.params;
  try {
    const deleted = await orderService.deleteOrderById(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.json({
      success: true,
      message: `Order with ID ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting order",
      error: error.message,
    });
  }
}

// Function to edit an order
async function editOrder(req, res, next) {
  const { id } = req.params;
  const orderData = req.body;
  try {
    const updated = await orderService.editOrder(id, orderData);
    console.log("Updated:????", updated);
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.json({
      success: true,
      message: `Order with ID ${id} updated successfully`,
    });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: error.message,
    });
  }
}

// Export the module
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
  editOrder,
};
