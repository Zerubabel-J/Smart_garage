const express = require("express");
// Call the router method from express to create the router
const router = express.Router();

// Import the install router
const installRouter = require("./install.routes");
// Import the employee routes
const employeeRouter = require("./employee.routes");

// import the login routes
const loginRouter = require("./login.routes");

// Add the install router to the main router
router.use(installRouter);
// Add the employee routes to the main router
router.use(employeeRouter);
// Add the loginRouter
router.use(loginRouter);
// Export the router
module.exports = router;
