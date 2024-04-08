// Import the query function from the db.config.js file
const conn = require("../config/db.config");
const { query, pool } = require("../config/db.config");

// Import the bcrypt module
const bcrypt = require("bcrypt");
// A function to check if service exists in the database
async function checkIfServiceExists(service_name) {
  const query = "SELECT * FROM common_services  WHERE service_name = ? ";
  const rows = await conn.query(query, [service_name]);
  // console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new service
async function createService(service) {
  try {
    // Insert the email in to the service table
    const query =
      "INSERT INTO common_services (service_name, service_description) VALUES (?, ?)";
    const rows = await conn.query(query, [
      service.service_name,
      service.service_description,
    ]);
    // console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the service id from the insert
    const service_id = rows.insertId;
    // construct to the service object to return

    return service_id;
  } catch (error) {
    console.error("Error occurred while creating the service: ", error);
    return false;
  }
}

// A function to get service by id
async function getServiceById(service_id) {
  const query = "SELECT * FROM common_services WHERE service_id = ? ";
  const rows = await conn.query(query, [service_id]);

  return rows;
}

// A function to get all services
async function getAllServices() {
  const query = "SELECT * FROM common_services";
  const rows = await conn.query(query);

  return rows;
}

// A function to delete a service using try catch block for handling errors
async function deleteService(id) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await query("DELETE FROM common_services WHERE service_id = ?", [id]);
    await conn.commit();
    return true;
  } catch (error) {
    await conn.rollback();
    console.error("Error occurred while deleting the service: ", error.message);
    return false;
  } finally {
    conn.release();
  }
}

// a function to edit services
async function editService(service_id, service) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await query(
      "UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?",
      [service.service_name, service.service_description, service_id]
    );
    await conn.commit();
    return true;
  } catch (error) {
    await conn.rollback();
    console.error("Error occurred while updating the service: ", error);
    return false;
  } finally {
    conn.release();
  }
}

// Export the functions for use in the controller
module.exports = {
  checkIfServiceExists,
  createService,
  getServiceById,
  getAllServices,
  deleteService,
  editService,
};
