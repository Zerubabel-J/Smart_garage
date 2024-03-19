// // Import the query function from the db.config.js file
// const conn = require("../config/db.config");
// // Import the fs module to read our sql file
// const fs = require("fs");
// // Write a function to create the database tables
// async function install() {
//   // Create a variable to hold the path to the sql file
//   const queryfile = __dirname + "/sql/initial-queries.sql";
//   // console.log(queryfile);
//   // Temporary variable, used to store all queries, the return message and the current query
//   let queries = [];
//   let finalMessage = {};
//   let templine = "";
//   // Read the sql file
//   const lines = await fs.readFileSync(queryfile, "utf-8").split("\n");
//   // Create a promise to handle the asynchronous reading of the file and storing of the queries in the variables
//   const executed = await new Promise((resolve, reject) => {
//     // Iterate over all lines
//     lines.forEach((line) => {
//       if (line.trim().startsWith("--") || line.trim() === "") {
//         // Skip if it's a comment or empty line
//         return;
//       }
//       templine += line;
//       if (line.trim().endsWith(";")) {
//         // If it has a semicolon at the end, it's the end of the query
//         // Prepare the individual query
//         const sqlQuery = templine.trim();
//         // Add query to the list of queries
//         queries.push(sqlQuery);
//         templine = "";
//       }
//     });
//     resolve("Queries are added to the list");
//   });
//   //Loop through the queries and execute them one by one asynchronously
//   for (let i = 0; i < queries.length; i++) {
//     try {
//       const result = await conn.query(queries[i]);
//       console.log("Table created");
//     } catch (err) {
//       // console.log("Err Occurred - Table not created");
//       finalMessage.message = "Not all tables are created";
//     }
//   }
//   // Prepare the final message to return to the controller
//   if (!finalMessage.message) {
//     finalMessage.message = "All tables are created";
//     finalMessage.status = 200;
//   } else {
//     finalMessage.status = 500;
//   }
//   // Return the final message
//   return finalMessage;
// }
// // Export the install function for use in the controller
// module.exports = { install };

// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
// A function to check if employee exists in the database
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new employee
async function createEmployee(employee) {
  let createdEmployee = {};
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);
    // Insert the email in to the employee table
    const query =
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
    const rows = await conn.query(query, [
      employee.employee_email,
      employee.active_employee,
    ]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the employee id from the insert
    const employee_id = rows.insertId;
    // Insert the remaining data in to the employee_info, employee_pass, and employee_role tables
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);
    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    const rows3 = await conn.query(query3, [employee_id, hashedPassword]);
    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    const rows4 = await conn.query(query4, [
      employee_id,
      employee.company_role_id,
    ]);
    // construct to the employee object to return
    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the employee object
  return createdEmployee;
}

// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await conn.query(query, [employee_email]);
  console.log("Rows of the data from inner join", rows);
  return rows;
}
// Export the functions for use in the controller
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
};
