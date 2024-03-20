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
// Export the function
const employeeService = {
  createEmployee,
};

export default employeeService;
