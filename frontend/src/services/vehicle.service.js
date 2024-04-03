// import axios
import axios from "axios";

// write a function to add a vehicle
const addVehicle = async (formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/vehicle`,
      formData
    );
    console.log("Vehicle", response.data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error adding vehicle:", error.message);
    throw error;
  }
};

// write a function to get all vehicles
const getAllVehicles = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/vehicles`);
    console.log("Vehicles", response);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching vehicles:", error.message);
    throw error;
  }
};

// write a function to get vehicle by id
const getVehicleById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/vehicle/${id}`);
    console.log("Vehicle", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle:", error.message);
    throw error;
  }
};

// write a function to update order
const vehicleService = {
  addVehicle,
  getAllVehicles,
  getVehicleById,
};

//export the functions

export default vehicleService;
