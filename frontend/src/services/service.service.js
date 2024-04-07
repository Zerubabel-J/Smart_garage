import axios from "axios";

async function addService(formData, loggedInserviceToken) {
  const headers = {
    "x-access-token": loggedInserviceToken,
  };

  try {
    const response = await axios.post("http://localhost:8000/api/service", formData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error adding service:", error.message);
    throw error;
  }
}

async function getAllServices() {
  try {
    const response = await axios.get("http://localhost:8000/api/services");
    console.log("Services", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching services:", error.message);
    throw error;
  }
}

async function updateService(formData, service_id, loggedInEmployeeToken) {
  try {
    const response = await axios.patch(
      `http://localhost:8000/api/service/${service_id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": loggedInEmployeeToken,
        },
      }
    );
    console.log("Response", response);
    console.log("Axios Response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
}

async function singleService(service_id, loggedInEmployeeToken) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/service/${service_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": loggedInEmployeeToken,
        },
      }
    );
    console.log(`http://localhost:8000/api/service/${service_id}`)
    console.log("Single service", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
}

const serviceService = {
  addService,
  getAllServices,
  updateService,
  singleService
};

export default serviceService;