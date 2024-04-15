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
// Function to get all order informations
async function getOrderInformation(req, res, next) {
  try {
    const orders = await orderService.getOrderInformation();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: "Failed to retrieve orders" });
  }
}

// Function to get getOrderDetail by orderId
async function getOrderDetail(req, res, next) {
  try {
    const orderDetail = await orderService.getOrderDetail(req.params.order_id);
    res.status(200).json(orderDetail);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve order detail" });
  }
}

async function getOrderDetailByOrderHash(req, res, next) {
  try {
    // const hash = req.params.customer_hash;
    // res.status(200).json({ message: req.params.customer_hash });
    const orderDetail = await orderService.getOrderDetailByOrderHash(
      req.params.order_hash
    );
    res.status(200).json(orderDetail);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve order detail" });
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
// Function to get an order services by its ID
async function getOrderServices(req, res, next) {
  try {
    const order_services = await orderService.getOrderServices(
      req.params.order_id
    );
    res.status(200).json(order_services);
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
async function updateOrder(req, res, next) {
  const { id } = req.params;
  const orderData = req.body;
  console.log("Delivereddd ????", id, orderData);
  try {
    const updated = await orderService.updateOrder(id, orderData);
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
// Function to update order_status
async function updateOrderServiceStatus(req, res, next) {
  const { id } = req.params;
  const service_completed = req.body.service_completed;
  console.log("Delivereddd value ????", id, req.body.service_completed);
  try {
    const updated = await orderService.updateOrderServiceStatus(
      id,
      service_completed
    );
    console.log("Updated value:????", updated);
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.json({
      success: true,
      message: `Order service with ID ${id} updated successfully`,
    });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error updating order service",
      error: error.message,
    });
  }
}
// Export the module
module.exports = {
  createOrder,
  getAllOrders,
  getOrderInformation,
  getOrderDetail,
  getOrderById,
  deleteOrderById,
  updateOrder,
  updateOrderServiceStatus,
  getOrderDetailByOrderHash,
  getOrderServices,
};
