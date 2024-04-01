// Import the query function from the db.config.js file
const conn = require("../config/db.config");

// Function to create a new order
async function createOrder(orderData) {
  try {
    // console.log(orderData);
    // Create order
    const orderQuery =
      "INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES (?, ?, ?, ?, ?)";
    const orderValues = [
      orderData.employee_id,
      orderData.customer_id,
      orderData.vehicle_id,
      orderData.active_order,
      orderData.order_hash,
    ];

    const orderResult = await conn.query(orderQuery, orderValues);
    // console.log("Inserted Idddd", orderResult.insertId);
    const orderId = orderResult.insertId;

    // Create order info
    const orderInfoQuery =
      "INSERT INTO order_info (order_id, order_total_price,additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed) VALUES (?, ?, ?, ?, ?, ?)";
    const orderInfoValues = [
      orderId,
      orderData.order_total_price,
      orderData.additional_request,
      orderData.notes_for_internal_use,
      orderData.notes_for_customer,
      orderData.additional_requests_completed,
    ];
    // console.log(orderInfoQuery);
    // console.log(orderInfoValues);
    const rows = await conn.query(orderInfoQuery, orderInfoValues);
    // console.log("Order Info rows", rows);

    // Create order status
    const orderStatusQuery =
      "INSERT INTO order_status (order_id, order_status) VALUES (?, ?)";
    const orderStatusValues = [orderId, orderData.order_status];
    await conn.query(orderStatusQuery, orderStatusValues);

    // Create order services
    console.log(orderData.order_services);
    if (orderData.order_services && orderData.order_services.length > 0) {
      const orderServicesQuery =
        "INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?,?,?)";
      const [orderServicesValues] = orderData.order_services.map((service) => [
        orderId,
        service.service_id,
        service.service_completed,
      ]);
      console.log(orderServicesValues);
      const rows = await conn.query(orderServicesQuery, orderServicesValues);
      console.log("Errrr", rows);
    }
    console.log("Last id", orderId);
    return orderId;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

// // Function to get all of the orders from all the of the tables
async function getAllOrders() {
  try {
    const orderQuery =
      "SELECT orders.id, orders.employee_id, orders.customer_id, orders.vehicle_id, orders.active_order, orders.order_hash, order_info.order_total_price, order_info.additional_request FROM orders INNER JOIN order_info ON orders.id = order_info.order_id";

    const [rows] = await conn.query(orderQuery);
    // console.log(rows);
    return rows;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
// Function to get all orders
async function getAllOrders() {
  try {
    const query =
      "SELECT * FROM orders JOIN order_info ON orders.order_id = order_info.order_id JOIN order_status ON orders.order_id = order_status.order_id";
    const orders = await conn.query(query);
    return orders;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

// Function to get an order by its ID
async function getOrderById(orderId) {
  try {
    const query =
      "SELECT * FROM orders JOIN order_info ON orders.order_id = order_info.order_id JOIN order_status ON orders.order_id = order_status.order_id WHERE orders.order_id = ?";
    const order = await conn.query(query, [orderId]);
    return order;
  } catch (error) {
    throw error;
  }
}

// Function to delete an order by its ID
async function deleteOrderById(orderId) {
  try {
    await conn.query("DELETE FROM order_services WHERE order_id = ?", [
      orderId,
    ]);
    await conn.query("DELETE FROM order_status WHERE order_id = ?", [orderId]);
    await conn.query("DELETE FROM order_info WHERE order_id = ?", [orderId]);
    const result = await conn.query("DELETE FROM orders WHERE order_id = ?", [
      orderId,
    ]);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
}

// Function to edit an order
async function editOrder(orderId, orderData) {
  // console.log(orderData);
  try {
    const orderQuery =
      "UPDATE orders SET employee_id = ?, customer_id = ?, vehicle_id = ?, active_order = ?, order_hash = ? WHERE order_id = ?";
    const orderValues = [
      orderData.employee_id,
      orderData.customer_id,
      orderData.vehicle_id,
      orderData.active_order,
      orderData.order_hash,
      orderId,
    ];
    await conn.query(orderQuery, orderValues);

    const orderInfoQuery =
      "UPDATE order_info SET order_total_price = ?,  additional_request = ?, notes_for_internal_use = ?, notes_for_customer = ?, additional_requests_completed = ? WHERE order_id = ?";
    const orderInfoValues = [
      orderData.order_total_price,
      orderData.additional_request,
      orderData.notes_for_internal_use,
      orderData.notes_for_customer,
      orderData.additional_requests_completed,
      orderId,
    ];

    await conn.query(orderInfoQuery, orderInfoValues);

    const orderStatusQuery =
      "UPDATE order_status SET order_status = ? WHERE order_id = ?";
    const orderStatusValues = [orderData.order_status, orderId];
    await conn.query(orderStatusQuery, orderStatusValues);

    // Update order services
    await conn.query("DELETE FROM order_services WHERE order_id = ?", [
      orderId,
    ]);
    if (orderData.order_services && orderData.order_services.length > 0) {
      const orderServicesQuery =
        "INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?,?,?)";
      for (const service of orderData.order_services) {
        await conn.query(orderServicesQuery, [
          orderId,
          service.service_id,
          service.service_completed,
        ]);
      }
    }

    return true;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

// Export modules
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
  editOrder,
};
