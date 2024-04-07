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
  console.log("Fromm dataaa", formData);
  try {
    const response = await axios.post(
      ` http://localhost:8000/api/order`,
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
const getOrderById = async (order_hash) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/order/${order_hash}`
    );
    console.log(`http://localhost:8000/api/order/${order_hash}`)
    console.log("Order", response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching order:", error.message);
    throw error;
  }
};
// Function to get all order informations using axios
const getOrderInformation = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/orderinformation`
    );
    console.log("Orders", response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching orders:", error.message);
    throw error;
  }
};

// Function to get all order detail using axios
const getOrderDetail = async (order_hash) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/orderdetail/${order_hash}`
    );
    console.log("Order detail", response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching order detail:", error.message);
    throw error;
  }
};

// Function to update order status with order_id
const updateOrder = async (order_hash, formData, loggedInEmployeeToken) => {
  console.log("Fromm dataaa", formData);
  try {
    const response = await axios.patch(
      ` http://localhost:8000/api/updateOrder/${order_hash}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": loggedInEmployeeToken,
        },
      }
    );
    console.log("Order created", response);
    return response;
  } catch (error) {
    // Handle error
    console.error("Error updating order:", error.message);
    throw error;
  }
};

const getSingleOrder = async (order_hash) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/order/${order_hash}`
    );
    console.log("Order detail", response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching order detail:", error.message);
    throw error;
  }
};


const orderService = {
  searchCustomers,
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderInformation,
  getOrderDetail,
  updateOrder,
  getSingleOrder
};

//export the functions

export default orderService;
