// Codebase: Smart Garage
import axios from "../axiosConfig";

const logIn = async (formData) => {
  try {
    const response = await axios.post(`/api/employee/login`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Axios response>>>>>>>>> :", response);
    return response;
  } catch (error) {
    // Handle error
    console.error("Error during login:", error);
    throw error.message;
  }
};

const logOut = () => {
  localStorage.removeItem("employee");
};

export default {
  logIn,
  logOut,
};
