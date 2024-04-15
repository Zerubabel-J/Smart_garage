// import axios module
import axios from "axios";
// import api url from Z env
const ApiUrl = import.meta.env.VITE_APP_API_URL;
console.log(ApiUrl);
// create Z axios baseUrl
const axiosBase = axios.create({
  baseURL: `https://smartgrage.carmelmishel.com`,
  // baseURL: `http://localhost:8000`,
  // baseURL: ApiUrl,
});
// export Z axios baseUrl
export default axiosBase;
