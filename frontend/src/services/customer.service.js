import axios from "../axiosConfig";

const createCustomer = async (formData, loggedInEmployeeToken) => {
  try {
    // console.log("Form dataaa", formData);
    const response = await axios.post(`/api/customer`, formData, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInEmployeeToken,
      },
    });
    console.log("Customerrr", response);
    return response;
  } catch (error) {
    // Handle error
    console.error("Error creating customer:", error.message);
    throw error; // Optional: rethrow the error to be caught by the caller
  }
};

// A function to send get request to get all employees
const getAllCustomer = async () => {
  try {
    const response = await axios.get(`/api/customers`);
    console.log("It's me", response);
    console.log("It's data", response.data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching customers:", error.message);
    throw error;
  }
};
// A function to get an employee by id
const getCustomerById = async (customerId) => {
  try {
    console.log(customerId);
    const response = await axios.get(`/api/customer/${customerId}`);
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
    const response = await axios.delete(`/api/customer/${customerId}`, {
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
const updateCustomer = async (customerId, formData) => {
  console.log("Active status", formData);
  try {
    console.log(formData);
    const response = await axios.patch(`/api/customer/${customerId}`, formData);
    console.log("Respooooo", response);
    console.log("Axios Resp", response.data);
    return response.data; // If you want to return something from the delete operation
  } catch (error) {
    // Handle error
    console.error("Error updating customer:", error.message);
    throw error;
  }
};

// write a function to get vehicles data with customer id
const getCustomerVehicles = async (customerId) => {
  try {
    const response = await axios.get(`/api/customer/vehicle/${customerId}`);
    console.log("Vehicles", response.data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching vehicles:", error.message);
    throw error;
  }
};

// write a function to get customer orders with customer id
const getCustomerOrders = async (customerId) => {
  try {
    const response = await axios.get(`/api/customer/order/${customerId}`);
    console.log("Orders", response.data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching orders:", error.message);
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
  getCustomerVehicles,
  getCustomerOrders,
};

export default customerService;
