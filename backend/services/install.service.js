const conn = require("../config/db.config");
const fs = require("fs").promises;

async function install() {
  try {
    // Read SQL queries from file
    const queries = await readSQLFile(__dirname + "/sql/user.sql");

    // Execute each query
    for (const query of queries) {
      await executeQuery(query);
      console.log("Table created");
    }

    // Return success message
    return { message: "All tables are created", status: 200 };
  } catch (error) {
    // Return error message
    console.error("Error during installation:", error);
    return { message: "Failed to create tables", status: 500 };
  }
}

async function readSQLFile(filePath) {
  // Read the SQL file asynchronously
  const sqlFileContent = await fs.readFile(filePath, "utf-8");

  // Split the content of the SQL file into individual queries
  const queriesArray = sqlFileContent.split(";");

  // Filter out any empty or whitespace-only queries
  const nonEmptyQueries = queriesArray.filter((query) => query.trim() !== "");

  // Return the array of non-empty SQL queries
  return nonEmptyQueries;
}

async function executeQuery(query) {
  // Execute a single SQL query
  try {
    await conn.query(query);
  } catch (error) {
    // Throw error if query execution fails
    console.error("Error executing query:", query, error);
    throw error;
  }
}

module.exports = { install };
