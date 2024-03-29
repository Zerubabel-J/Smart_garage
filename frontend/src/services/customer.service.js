import axios from "axios";

const createCustomer = async (formData, loggedInEmployeeToken) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/customer`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": loggedInEmployeeToken,
        },
      }
    );
    console.log("Customerrr", response);
    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating customer:", error.message);
    throw error; // Optional: rethrow the error to be caught by the caller
  }
};

// A function to send get request to get all employees
const getAllCustomer = async (token) => {
  try {
    console.log(token);
    const response = await axios.get(`http://localhost:8000/api/customers`, {
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
    console.error("Error fetching customers:", error.message);
    throw error;
  }
};
// A function to get an employee by id
const getCustomerById = async (token, customerId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/customer/${employeeId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );
    console.log("Singlee customer", response.data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching customer:", error.message);
    throw error;
  }
};
const deleteCustomerById = async (token, customerId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/employee/${customerId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );
    console.log("Axios Resp", response.data);
    return response.data; // If you want to return something from the delete operation
  } catch (error) {
    // Handle error
    console.error("Error deleting employee:", error);
    throw error;
  }
};
const updateCustomer = async (formData, token, customerId) => {
  try {
    const response = await axios.patch(
      `http://localhost:8000/api/employee/${customerId}`,
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
    console.error("Error updating customer:", error.message);
    throw error;
  }
};

// Export the function
const customerService = {
  createCustomer,
  getAllCustomer,
  getCustomerById,
  deleteCustomerById,
  updateCustomer,
};

export default customerService;
