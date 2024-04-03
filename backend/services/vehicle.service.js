// Import the query function from the db.config.js file
const conn = require("../config/db.config");

// A function to create a new vehicle
async function createVehicle(customer_id, vehicle) {
  try {
    const query =
      "INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const rows = await conn.query(query, [
      customer_id,
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
    ]);
    return rows.insertId;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// A function to get all vehicles
async function getAllVehicles() {
  try {
    const query = "SELECT * FROM customer_vehicle_info";
    const rows = await conn.query(query);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// A function to get vehicles by customer id
async function getVehiclesByCustomerId(customer_id) {
  try {
    const query = "SELECT * FROM customer_vehicle_info WHERE customer_id = ?";
    const rows = await conn.query(query, [customer_id]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// A function to get a vehicle by its id
async function getVehicleById(vehicle_id) {
  try {
    const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?";
    const rows = await conn.query(query, [vehicle_id]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// A function to delete a vehicle by its id
async function deleteVehicleById(vehicle_id) {
  try {
    const query = "DELETE FROM customer_vehicle_info WHERE vehicle_id = ?";
    const result = await conn.query(query, [vehicle_id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// A function to edit a vehicle
async function editVehicle(vehicle_id, vehicle) {
  try {
    const query =
      "UPDATE customer_vehicle_info SET vehicle_year = ?, vehicle_make = ?, vehicle_model = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ? WHERE vehicle_id = ?";
    const result = await conn.query(query, [
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
      vehicle_id,
    ]);
    return result.affectedRows > 0;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehiclesByCustomerId,
  getVehicleById,
  deleteVehicleById,
  editVehicle,
};
