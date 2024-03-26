// Import the vehicle service
const vehicleService = require("../services/vehicle.service");

// Create a new vehicle
async function createVehicle(req, res, next) {
  try {
    const vehicleData = req.body;
    const vehicleId = await vehicleService.createVehicle(vehicleData);
    res
      .status(201)
      .json({ id: vehicleId, message: "Vehicle created successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to create vehicle" });
  }
}

// Get all vehicles
async function getAllVehicles(req, res, next) {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve vehicles" });
  }
}

// Get vehicles by customer id
async function getVehiclesByCustomerId(req, res, next) {
  try {
    const { customer_id } = req.params;
    const vehicles = await vehicleService.getVehiclesByCustomerId(customer_id);
    res.status(200).json(vehicles);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to retrieve vehicles for the customer" });
  }
}

// Get vehicle by id
async function getVehicleById(req, res, next) {
  try {
    const { id } = req.params;
    const vehicle = await vehicleService.getVehicleById(id);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve vehicle" });
  }
}

// Delete a vehicle by id
async function deleteVehicle(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await vehicleService.deleteVehicleById(id);
    if (deleted) {
      res.status(200).json({ message: "Vehicle deleted successfully" });
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to delete vehicle" });
  }
}

// Edit a vehicle
async function editVehicle(req, res, next) {
  try {
    const { id } = req.params;
    const vehicleData = req.body;
    const updated = await vehicleService.editVehicle(id, vehicleData);
    if (updated) {
      res.status(200).json({ message: "Vehicle updated successfully" });
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to update vehicle" });
  }
}

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehiclesByCustomerId,
  getVehicleById,
  deleteVehicle,
  editVehicle,
};
