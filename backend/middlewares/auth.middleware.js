// Import the dotenv package
require("dotenv").config();
// Import the jsonwebtoken package
const jwt = require("jsonwebtoken");
// A function to verify the token received from the frontend
// Import the employee service
const employeeService = require("../services/employee.service");

// A function to verify the token received from the frontend
const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    console.log("No token provided!");
    return res.status(403).send({
      status: "fail",
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Unauthorized!");
      return res.status(401).send({
        status: "fail",
        message: "Unauthorized!",
      });
    }
    // console.log("Here is the decoded token");
    // console.log(decoded);
    req.employee_email = decoded.employee_email;
    next();
  });
};

// A function to check if the user is an admin
const isAdmin = async (req, res, next) => {
  // let token = req.headers["x-access-token"];
  console.log(req.employee_email);
  const employee_email = req.employee_email;
  const employee = await employeeService.getEmployeeByEmail(employee_email);
  if (employee[0].company_role_id === 3) {
    next();
  } else {
    console.log("Not an Admin!");
    return res.status(403).send({
      status: "fail",
      error: "Not an Admin!",
      message: "Only Admins can add employees",
    });
  }
};

const authMiddleware = {
  verifyToken,
  isAdmin,
};

module.exports = authMiddleware;
