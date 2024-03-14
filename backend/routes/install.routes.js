// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the install controller
const installController = require("../controllers/install.controller");
// Create a route to handle the install request on get
// router.get("/", (req, res) => {
//   res.send("Router, Welcome to the Smart Garage API");
// });
router.get("/", installController.welcome);
router.get("/install", installController.install);
// Export the router
module.exports = router;
