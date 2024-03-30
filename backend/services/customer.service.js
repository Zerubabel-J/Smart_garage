// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");

// A function to check if customer exists in the database
async function checkIfCustomerExists(email) {
  const query = "SELECT * FROM customer_identifier WHERE customer_email = ?";
  const rows = await conn.query(query, [email]);
  return rows.length > 0;
}

// A function to create a new customer
async function createCustomer(customer) {
  console.log("Cutomerrr", customer);
  // console.log(customer.customer_email, customer.customer_phone);
  // let createdCustomer = {};
  let customer_id = null;
  try {
    // // Generate a salt and hash the password
    // const salt = await bcrypt.genSalt(10);
    // // Hash the password
    // const customer_hash = await bcrypt.hash(customer.customer_hash, salt);
    // Insert data into customer_identifier table
    const query =
      "INSERT INTO customer_identifier (customer_email, customer_phone_number) VALUES (?, ?)";
    const rows = await conn.query(query, [
      customer.customer_email,
      customer.customer_phone,
    ]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the customer id from the insert
    customer_id = rows.insertId;
    // Insert data into customer_info table
    const query2 =
      "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name) VALUES (?, ?, ?)";
    const rows2 = await conn.query(query2, [
      customer_id,
      customer.customer_first_name,
      customer.customer_last_name,
    ]);
    // construct the customer object to return
    // createdCustomer = {
    //   customer_id: customer_id,
    // };
  } catch (err) {
    console.log(err);
  }
  // Return the customer id
  return customer_id;
}

// A function to get customer by email
async function getCustomerByEmail(customer_email) {
  const query =
    "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_email = ?";
  const rows = await conn.query(query, [customer_email]);
  return rows;
}

// A function to get all customers
async function getAllCustomers() {
  const query =
    "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id ORDER BY customer_identifier.customer_id DESC LIMIT 10";
  const rows = await conn.query(query);
  return rows;
}

// A function to get a customer by id
async function getCustomerById(id) {
  const query =
    "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = ?";
  const rows = await conn.query(query, [id]);
  console.log("Singleeee customerrrrrrr with ID", rows);
  return rows;
}

// A function to delete a customer by id
async function deleteCustomerById(id) {
  const conn = await pool.getConnection(); // Acquire a connection
  try {
    await conn.beginTransaction(); // Start a transaction

    // Delete rows from child table first
    await query("DELETE FROM customer_info WHERE customer_id = ?", [id]);

    // Then delete the row from the parent table
    const result = await query(
      "DELETE FROM customer_identifier WHERE customer_id = ?",
      [id]
    );

    await conn.commit(); // Commit the transaction
    console.log("Transaction committed.");

    return result.affectedRows > 0;
  } catch (error) {
    await conn.rollback(); // Rollback the transaction if an error occurs
    console.error("Error occurred during transaction:", error);
    throw error; // Rethrow the error for handling at a higher level
  } finally {
    conn.release(); // Release the connection back to the pool
  }
}

// A function to edit customer details
async function editCustomer(id, customer) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await query(
      "UPDATE customer_identifier SET customer_email = ?, customer_phone_number = ?, customer_hash = ? WHERE customer_id = ?",
      [
        customer.customer_email,
        customer.customer_phone_number,
        customer.customer_hash,
        id,
      ]
    );

    await query(
      "UPDATE customer_info SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ? WHERE customer_id = ?",
      [
        customer.customer_first_name,
        customer.customer_last_name,
        customer.active_customer_status,
        id,
      ]
    );

    await conn.commit();
    console.log("Transaction committed.");
    return true;
  } catch (error) {
    await conn.rollback();
    console.error("Error occurred during transaction:", error);
    throw error;
  } finally {
    conn.release();
  }
}

// Export the functions for use in the controller
module.exports = {
  checkIfCustomerExists,
  createCustomer,
  getCustomerByEmail,
  getAllCustomers,
  getCustomerById,
  deleteCustomerById,
  editCustomer,
};
