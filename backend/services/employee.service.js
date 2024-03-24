// Import the query function from the db.config.js file
const conn = require("../config/db.config");
const { query, pool } = require("../config/db.config");

// Import the bcrypt module
const bcrypt = require("bcrypt");
// A function to check if employee exists in the database
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await conn.query(query, [email]);
  // console.log(rows);
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
    // console.log(rows);
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

  return rows;
}
// A function to get all employees
async function getAllEmployees() {
  // const query =
  //   "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 10";
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id  INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 10";
  const rows = await conn.query(query);

  return rows;
}

// Function to delete an employee by ID
// async function deleteEmployeeById(id) {
//   const query = `DELETE employee, employee_info, employee_pass, employee_role
//   FROM employee
//   INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id
//   INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id
//   INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id
//   WHERE employee.employee_id = ?`;
//   // const query1 = "DELETE FROM employee_pass WHERE employee_id = ?";
//   // const query2 = "DELETE FROM employee_role WHERE employee_id = ?";
//   // const query3 = "DELETE FROM employee WHERE employee_id = ?";
//   const result = await conn.query(query, [id]);
//   console.log("Affected rows: ", result.affectedRows);
//   return result.affectedRows > 0;
// }
// async function deleteEmployeeById(id) {
//   try {
//     await conn.beginTransaction(); // Start a transaction

//     // Delete rows from child tables first
//     await conn.query("DELETE FROM employee_info WHERE employee_id = ?", [id]);
//     await conn.query("DELETE FROM employee_pass WHERE employee_id = ?", [id]);
//     await conn.query("DELETE FROM employee_role WHERE employee_id = ?", [id]);

//     // Then delete the row from the parent table
//     const result = await conn.query(
//       "DELETE FROM employee WHERE employee_id = ?",
//       [id]
//     );

//     await conn.commit(); // Commit the transaction
//     console.log("Transaction committed.");

//     // Check if any row is affected by the DELETE query
//     return result.affectedRows > 0;
//   } catch (error) {
//     await conn.rollback(); // Rollback the transaction if an error occurs
//     console.error("Error occurred during transaction:", error);
//     throw error; // Rethrow the error for handling at a higher level
//   }
// }
// const mysql = require("mysql2/promise");

// async function deleteEmployeeById(id) {
//   const pool = mysql.createPool({
//     connectionLimit: 10,
//     password: process.env.DB_PASS,
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//   });

//   const conn = await pool.getConnection(); // Acquire a connection
//   try {
//     await conn.beginTransaction(); // Start a transaction

//     // Delete rows from child tables first
//     await conn.query("DELETE FROM employee_info WHERE employee_id = ?", [id]);
//     await conn.query("DELETE FROM employee_pass WHERE employee_id = ?", [id]);
//     await conn.query("DELETE FROM employee_role WHERE employee_id = ?", [id]);

//     // Then delete the row from the parent table
//     const result = await conn.query(
//       "DELETE FROM employee WHERE employee_id = ?",
//       [id]
//     );

//     await conn.commit(); // Commit the transaction
//     console.log("Transaction committed.");

//     // Check if any row is affected by the DELETE query
//     return result[0].affectedRows > 0;
//   } catch (error) {
//     await conn.rollback(); // Rollback the transaction if an error occurs
//     console.error("Error occurred during transaction:", error);
//     throw error; // Rethrow the error for handling at a higher level
//   } finally {
//     conn.release(); // Release the connection back to the pool
//   }
// }

async function deleteEmployeeById(id) {
  console.log(id);
  const conn = await pool.getConnection(); // Acquire a connection
  try {
    await conn.beginTransaction(); // Start a transaction

    // Delete rows from child tables first
    await query("DELETE FROM employee_info WHERE employee_id = ?", [id]);
    await query("DELETE FROM employee_pass WHERE employee_id = ?", [id]);
    await query("DELETE FROM employee_role WHERE employee_id = ?", [id]);

    // Then delete the row from the parent table
    const result = await query("DELETE FROM employee WHERE employee_id = ?", [
      id,
    ]);

    await conn.commit(); // Commit the transaction
    console.log("Transaction committed.");

    // Check if any row is affected by the DELETE query
    console.log("Affecteeddd", result.affectedRows);
    return result.affectedRows > 0;
  } catch (error) {
    await conn.rollback(); // Rollback the transaction if an error occurs
    console.error("Error occurred during transaction:", error);
    throw error; // Rethrow the error for handling at a higher level
  } finally {
    conn.release(); // Release the connection back to the pool
  }
}

// Export the functions for use in the controller
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployees,
  deleteEmployeeById,
};
