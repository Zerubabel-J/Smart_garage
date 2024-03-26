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

module.exports = {
  createOrder,
};
