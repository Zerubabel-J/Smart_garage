const express = require("express");
// Call the router method from express to create the router
const router = express.Router();

// Import the install router
const installRouter = require("./install.routes");
// Import the employee routes
const employeeRouter = require("./employee.routes");

// import the login routes
const loginRouter = require("./login.routes");

// import the service route
const serviceRouter = require("./service.routes");
// import the customer route
const customerRouter = require("./customer.routes");
// Add the customer router to the main router
router.use(customerRouter);

// import the vehicle route
const vehicleRouter = require("./vehicle.routes");
// Add the vehicle router to the main router
router.use(vehicleRouter);

// import the order route
const orderRouter = require("./order.routes");
// Add the order router to the main router
router.use(orderRouter);
// Add the service router to the main router
router.use(serviceRouter);
// Add the install router to the main router
router.use(installRouter);
// Add the employee routes to the main router
router.use(employeeRouter);
// Add the loginRouter
router.use(loginRouter);
// Export the router
module.exports = router;
