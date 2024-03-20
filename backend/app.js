const express = require("express");
require("dotenv").config();
const sanitize = require("sanitize");
const cors = require("cors");

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

const port = process.env.PORT;
const router = require("./routes");
const app = express();
const fs = require("fs").promises;
app.use(cors());
app.use(express.json());
app.use(sanitize.middleware);

app.use(router); // handle all the request from the user
// async function show() {
//   const queries = await readSQLFile(
//     __dirname + "/services/sql/initial-queries.sql"
//   );
//   // console.log(queries);
// }

// show();
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

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

module.exports = app;
