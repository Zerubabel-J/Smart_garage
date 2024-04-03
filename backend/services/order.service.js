// Import the query function from the db.config.js file
const conn = require("../config/db.config");

// Function to create a new order
async function createOrder(orderData) {
  console.log("From the front side", orderData);
  try {
    // console.log(orderData);
    orderData.active_order = 1;
    orderData.order_hash = "12345sdfknbdfvbjm";
    orderData.notes_for_internal_use = "stay tuned";
    orderData.notes_for_customer = "stay well";
    orderData.additional_requests_completed = 0;
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
      orderData.price,
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

    if (orderData.order_services && orderData.order_services.length > 0) {
      const orderServicesQuery =
        "INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?,?,?)";
      // const [orderServicesValues] = orderData.order_services.map((service) => [
      //   orderId,
      //   service.service_id,
      //   service.service_completed,
      // ]);
      const orderServices = orderData.order_services;
      for (const service of orderServices) {
        const values = [orderId, service.service_id, 0];
        await conn.query(orderServicesQuery, values);
      }
      // const rows = await conn.query(orderServicesQuery, orderServicesValues);
      // console.log("Errrr", rows);
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

async function getOrderInformation() {
  try {
    const sql = `
    SELECT customer_info.customer_first_name AS customer_first_name,
    customer_info.customer_last_name AS customer_last_name,
    customer_identifier.customer_email AS customer_email,
    customer_identifier.customer_phone_number AS customer_phone,
    customer_vehicle_info.vehicle_make AS vehicle_make,
    customer_vehicle_info.vehicle_year AS vehicle_year,
    customer_vehicle_info.vehicle_tag AS vehicle_tag,
    orders.order_id AS order_id,
    orders.order_date AS order_date,
    order_status.order_status AS order_status FROM orders
  JOIN customer_identifier ON orders.customer_id = customer_identifier.customer_id
  JOIN customer_vehicle_info ON orders.vehicle_id = customer_vehicle_info.vehicle_id
  JOIN order_status ON orders.order_id = order_status.order_id
  JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id;
    `;

    // Assuming 'conn' is your database connection object
    const rows = await conn.query(sql);
    console.log("Orders", rows);
    return rows;
  } catch (error) {
    console.error("Error fetching order information:", error.message);
    throw error;
  }
}

async function getOrderDetail(orderId) {
  try {
    const sql = `
      SELECT
        customer_info.customer_first_name,
        customer_info.customer_last_name,
        customer_identifier.customer_email,
        customer_identifier.customer_phone_number,
        customer_vehicle_info.vehicle_year,
        customer_vehicle_info.vehicle_make,
        customer_vehicle_info.vehicle_model,
        customer_vehicle_info.vehicle_type,
        customer_vehicle_info.vehicle_mileage,
        customer_vehicle_info.vehicle_tag,
        customer_vehicle_info.vehicle_serial,
        customer_vehicle_info.vehicle_color,
        orders.order_id,
        orders.order_date,
        orders.active_order,
        orders.order_hash,
        order_info.order_total_price,
        order_info.estimated_completion_date,
        order_info.completion_date,
        order_info.additional_request,
        order_info.notes_for_internal_use,
        order_info.notes_for_customer,
        order_info.additional_requests_completed,
        order_status.order_status,
        common_services.service_name AS serviceName,
        common_services.service_description AS serviceDescription
      FROM
        orders
      JOIN
        customer_identifier ON orders.customer_id = customer_identifier.customer_id
      JOIN
        customer_vehicle_info ON orders.vehicle_id = customer_vehicle_info.vehicle_id
      JOIN
        order_info ON orders.order_id = order_info.order_id
      JOIN
        order_services ON orders.order_id = order_services.order_id
      JOIN
        common_services ON order_services.service_id = common_services.service_id
      JOIN
        order_status ON orders.order_id = order_status.order_id
      JOIN
        customer_info ON customer_identifier.customer_id = customer_info.customer_id
      WHERE
        orders.order_id = ?;`;

    // Assuming 'conn' is your database connection object
    const rows = await conn.query(sql, [orderId]);

    // Grouping order services by order ID
    const orderServices = rows.map((row) => ({
      serviceName: row.serviceName,
      serviceDescription: row.serviceDescription,
    }));

    // Removing redundant service data from order detail
    const orderDetail = {
      customer_first_name: rows[0].customer_first_name,
      customer_last_name: rows[0].customer_last_name,
      customer_email: rows[0].customer_email,
      customer_phone_number: rows[0].customer_phone_number,
      vehicle_year: rows[0].vehicle_year,
      vehicle_make: rows[0].vehicle_make,
      vehicle_model: rows[0].vehicle_model,
      vehicle_type: rows[0].vehicle_type,
      vehicle_mileage: rows[0].vehicle_mileage,
      vehicle_tag: rows[0].vehicle_tag,
      vehicle_serial: rows[0].vehicle_serial,
      vehicle_color: rows[0].vehicle_color,
      order_id: rows[0].order_id,
      order_date: rows[0].order_date,
      active_order: rows[0].active_order,
      order_hash: rows[0].order_hash,
      order_total_price: rows[0].order_total_price,
      estimated_completion_date: rows[0].estimated_completion_date,
      completion_date: rows[0].completion_date,
      additional_request: rows[0].additional_request,
      notes_for_internal_use: rows[0].notes_for_internal_use,
      notes_for_customer: rows[0].notes_for_customer,
      additional_requests_completed: rows[0].additional_requests_completed,
      order_status: rows[0].order_status,
      orderServices: orderServices,
    };

    console.log("Order Detail:", orderDetail);
    return [orderDetail]; // Returning array of order detail objects
  } catch (error) {
    console.error("Error fetching order detail:", error.message);
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
  getOrderInformation,
  getOrderDetail,
  getOrderById,
  deleteOrderById,
  editOrder,
};
