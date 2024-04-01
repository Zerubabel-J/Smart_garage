//import axios
import axios from "axios";
//  write a function to customers with customer name, email or phone number
const searchCustomers = async (searchTerm) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/customers/search?searchTerm=${searchTerm}`
    );
    console.log("Search", response.data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error searching for customers:", error.message);
    throw error;
  }
};
// write a function to create new order
const createOrder = async (formData, loggedInEmployeeToken) => {
  try {
    const response = await axios.post(
      ` http://localhost:8000/api/orders`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": loggedInEmployeeToken,
        },
      }
    );
    console.log("Order created", response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating order:", error.message);
    throw error;
  }
};
// write a function to get all orders
const getAllOrders = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/orders`);
    console.log("Orders", response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching orders:", error.message);
    throw error;
  }
};
// write a function to get order by id
const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/order/${orderId}`
    );
    console.log("Order", response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching order:", error.message);
    throw error;
  }
};
// write a function to update order

const orderService = {
  searchCustomers,
  createOrder,
  getAllOrders,
  getOrderById,
};

//export the functions

export default orderService;
