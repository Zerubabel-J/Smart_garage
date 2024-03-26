// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the vehicle controller
const vehicleController = require("../controllers/vehicle.controller");
// import authMiddleware
const authMiddleware = require("../middlewares/auth.middleware");

// Create a route to handle the add vehicle request on post
router.post(
  "/api/vehicle",

  vehicleController.createVehicle
);

// Create a route to handle the get all vehicles request on get
router.get(
  "/api/vehicles",

  vehicleController.getAllVehicles
);
// Create a route to handle getting vehicles by vehicle id
router.get("/api/vehicle/:id", vehicleController.getVehicleById);
// Create a route to handle getting vehicles by customer id
router.get(
  "/api/vehicles/:customer_id",
  [authMiddleware.verifyToken],
  vehicleController.getVehiclesByCustomerId
);

// Create a route to handle deleting a vehicle
router.delete(
  "/api/vehicle/:id",

  vehicleController.deleteVehicle
);

// Create a route to handle editing a vehicle
router.patch("/api/vehicle/:id", vehicleController.editVehicle);
// Export the router
module.exports = router;
