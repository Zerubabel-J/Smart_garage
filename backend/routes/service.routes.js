// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the service controller
const serviceController = require("../controllers/service.controller");
// import authMiddleware
const authMiddleware = require("../middlewares/auth.middleware");

// Create a route to handle the add service request on post
router.post("/api/service", serviceController.createService);
// Create a route to handle the get all services request on get
router.get("/api/services", serviceController.getAllServices);
router.get("/api/service/:service_id", serviceController.getServiceById);

// Create a route to handle deleting a service
router.delete("/api/service/:id", serviceController.deleteService);

// Create a route to handle editing a service
router.patch("/api/service/:service_id", serviceController.editService);
// Export the router
module.exports = router;
