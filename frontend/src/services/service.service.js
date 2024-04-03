// import axios
import axios from "axios";
// write a function to get all the services from the backend api using axios
const getAllServices = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/services`);
    console.log("Services", response.data);
    return response.data.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching services:", error.message);
    throw error;
  }
};

// write a function to update order

const serviceService = {
  getAllServices,
};
//export the functions

export default serviceService;
