// Codebase: Smart Garage
import axios from "axios";

const logIn = async (formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/employee/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Axios response :", response);
    return response;
  } catch (error) {
    // Handle error
    console.error("Error during login:", error);
    throw error;
  }
};

export default {
  logIn,
};
