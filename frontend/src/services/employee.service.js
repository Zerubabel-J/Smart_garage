import axios from "../axiosConfig";

const createEmployee = async (formData, loggedInEmployeeToken) => {
  try {
    const response = await axios.post(`/api/employee`, formData, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInEmployeeToken,
      },
    });
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
    const response = await axios.get(`/api/employees`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    // console.log("It's me", response);
    // console.log("It's data", response.data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching employees:", error);
    throw error;
  }
};
// A function to get an employee by id
const getEmployeeById = async (token, employeeId) => {
  try {
    const response = await axios.get(`/api/employee/${employeeId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    console.log("Singlee Employeeeeee", response.data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching employee:", error);
    throw error;
  }
};
const deleteEmployeeById = async (token, employeeId) => {
  try {
    const response = await axios.delete(`/api/employee/${employeeId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    console.log("Axios Resp", response.data);
    return response.data; // If you want to return something from the delete operation
  } catch (error) {
    // Handle error
    console.error("Error deleting employee:", error);
    throw error;
  }
};
const updateEmployee = async (token, formData, employeeId) => {
  try {
    const response = await axios.patch(
      `/api/employee/${employeeId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );
    console.log("Respooooo", response);
    console.log("Axios Resp", response.data);
    return response.data; // If you want to return something from the delete operation
  } catch (error) {
    // Handle error
    console.error("Error updating employee:", error);
    throw error;
  }
};

// Export the function
const employeeService = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployee,
};

export default employeeService;
