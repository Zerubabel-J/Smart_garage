// // Import the mysql2 module Promise Wrapper
// const mysql = require("mysql2/promise");
// // Prepare connection parameters we use to connect to the database
// const dbConfig = {
//   connectionLimit: 10,
//   password: process.env.DB_PASS,
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
// };
// // Create the connection pool
// const pool = mysql.createPool(dbConfig);
// // Prepare a function that will execute the SQL queries asynchronously
// // async function query(sql, params) {
// //   const [rows, fields] = await pool.execute(sql, params);
// //   return rows;
// // }
// // Prepare a function that will execute the SQL queries asynchronously
// async function query(sql, params) {
//   const connection = await pool.getConnection();
//   try {
//     await connection.beginTransaction();
//     const [rows, fields] = await connection.execute(sql, params);
//     await connection.commit();
//     return rows;
//   } catch (error) {
//     await connection.rollback();
//     throw error;
//   } finally {
//     connection.release();
//   }
// }

// // Export the query function for use in the application
// module.exports = { query };

// Import the mysql2 module Promise Wrapper
const mysql = require("mysql2/promise");

// Prepare connection parameters we use to connect to the database
const dbConfig = {
  connectionLimit: 10,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
};

// Create the connection pool
const pool = mysql.createPool(dbConfig);

// Prepare a function that will execute the SQL queries asynchronously
async function query(sql, params) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [rows, fields] = await connection.execute(sql, params);
    await connection.commit();
    return rows;
  } catch (error) {
    await connection.rollback();
    console.log(error.message);
    throw error;
  } finally {
    connection.release();
  }
}

// Export the query function and pool for use in the application
module.exports = { query, pool };
