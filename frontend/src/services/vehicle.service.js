// import axios
import axios from "../axiosConfig";

// write a function to add a vehicle
const addVehicle = async (id, formData) => {
  try {
    const response = await axios.post(`/api/vehicle/${id}`, formData);
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
    const response = await axios.get(`/api/vehicles`);
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
    const response = await axios.get(`/api/vehicle/${id}`);
    console.log("Vehicle", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle:", error.message);
    throw error;
  }
};

// write a function to update vehicle by id
const updateVehicleById = async (id, formData) => {
  try {
    const response = await axios.patch(`/api/vehicle/${id}`, formData);
    console.log("Vehicle updated", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error.message);
    throw error;
  }
};

// write a function to update order
const vehicleService = {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleById,
};

//export the functions

export default vehicleService;
