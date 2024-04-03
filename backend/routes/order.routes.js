// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the order controller
const orderController = require("../controllers/order.controller");
// import authMiddleware
const authMiddleware = require("../middlewares/auth.middleware");

// Create a route to handle the add order request on post
router.post("/api/order", orderController.createOrder);

// Create a route to handle the get all orders request on get
router.get("/api/orders", orderController.getAllOrders);

// Create a route to handle the get order information request on get
router.get("/api/orderinformation", orderController.getOrderInformation);

// Create a route to handle the get order detail  request on get
router.get("/api/orderdetail/:order_id", orderController.getOrderDetail);

// Create a route to handle the get orders by id request on get
router.get("/api/order/:id", orderController.getOrderById);

// Create a route to handle the delete order request on delete
router.delete("/api/order/:id", orderController.deleteOrderById);

// Create a route to handle the update order request on put
router.patch("/api/order/:id", orderController.editOrder);

module.exports = router;
