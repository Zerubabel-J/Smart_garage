import axios from "axios";

const createEmployee = async (formData, loggedInEmployeeToken) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/employee`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": loggedInEmployeeToken,
        },
      }
    );
    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating employee:", error);
    throw error; // Optional: rethrow the error to be caught by the caller
  }
};

// A function to send get request to get all employees
const getAllEmployees = async (token) => {
  try {
    console.log(token);
    const response = await axios.get(`http://localhost:8000/api/employees`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// // A function to send get request to get all employees
// const getAllEmployees = async (token) => {
//   // console.log(token);
//   const requestOptions = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "x-access-token": token,
//     },
//   };
//   const response = await fetch(`${api_url}/api/employees`, requestOptions);
//   return response;
// };
// Export the function
const employeeService = {
  createEmployee,
  getAllEmployees,
};

export default employeeService;
