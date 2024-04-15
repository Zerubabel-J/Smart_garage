import axios from "../axiosConfig";

//  write a function to customers with customer name, email or phone number
const searchCustomers = async (searchTerm) => {
  try {
    const response = await axios.get(
      `/api/customers/search?searchTerm=${searchTerm}`
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
    const response = await axios.post(`/api/order`, formData, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInEmployeeToken,
      },
    });
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
    const response = await axios.get(`/api/orders`);
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
    const response = await axios.get(`/api/order/${order_hash}`);
    console.log(`/api/order/${order_hash}`);
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
    const response = await axios.get(`/api/orderinformation`);
    console.log("Orders plsss", response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching orders:", error.message);
    console.log(object);
    throw error;
  }
};

// Function to get all order detail using axios
const getOrderDetail = async (order_id) => {
  try {
    console.log(order_id);
    const response = await axios.get(`/api/orderdetail/${order_id}`);
    console.log("Order detail", response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching order detail:", error.message);
    throw error;
  }
};
// Function to get all order detail using customer hash
const getOrderDetailByOrderHash = async (order_hash) => {
  try {
    const response = await axios.get(
      `/api/customer/orderdetails/${order_hash}`
    );
    console.log("Customer details with hash", response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching order detail:", error.message);
    throw error;
  }
};

// Function to update order status with order_id
const updateOrder = async (order_id, formData, loggedInEmployeeToken) => {
  console.log("Order statussss.....???????", formData);
  try {
    const response = await axios.patch(
      `/api/updateOrder/${order_id}`,
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
    const response = await axios.get(`/api/order/${order_hash}`);
    console.log("Order detail", response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching order detail:", error.message);
    throw error;
  }
};

// A function to update order_service status with service id
const updateOrderServiceStatusById = async (serviceId, service_completed) => {
  try {
    console.log("Singleee Serivice update", { service_completed });
    const response = await axios.patch(
      `/api/updateOrderService/${serviceId}`,
      service_completed,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "loggedInEmployeeToken",
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

// write a function to get order by id
const getOrderServiceById = async (order_id) => {
  try {
    const response = await axios.get(`/api/orderServices/${order_id}`);

    console.log("Order Servicsssss lastttt", response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching order:", error.message);
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
  getSingleOrder,
  updateOrderServiceStatusById,
  getOrderDetailByOrderHash,
  getOrderServiceById,
};

//export the functions

export default orderService;
