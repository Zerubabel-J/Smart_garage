// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the customer controller
const customerController = require("../controllers/customer.controller");
// import authMiddleware
const authMiddleware = require("../middlewares/auth.middleware");

// Create a route to handle the add customer request on post
router.post("/api/customer", customerController.createCustomer);

// Create a route to handle the get all customers request on get
router.get("/api/customers", customerController.getAllCustomers);

// Create a route to handle getting a customer by id
router.get("/api/customer/:id", customerController.getCustomerById);

// Create a route to handle deleting a customer
router.delete("/api/customer/:id", customerController.deleteCustomer);

// Create a route to handle editing a customer
router.patch("/api/customer/:id", customerController.editCustomer);

// Create a route to handle getting a customer's vehicles
router.get(
  "/api/customer/vehicle/:id",
  customerController.getVehiclesByCustomerId
);

// Create a route to handle getting a customer's orders
router.get("/api/customer/order/:id", customerController.getOrdersByCustomerId);

// // Create a route to handle searching customers
router.get("/api/customers/search", customerController.searchCustomers);

// Export the router
module.exports = router;
