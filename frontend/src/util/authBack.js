// // import jwt_decode from "jwt-decode";
// // Function to read the data from the user's local storage
// const getAuth = async () => {
//   const employee = await JSON.parse(localStorage.getItem("employee"));
//   // employee is object with status, message and data{token: "akjsfd;ljcqsadfo;iudqsa"}, prperties

//   if (employee && employee.employee_token) {
//     const decodedToken = await decodeTokenPayload(employee.employee_token);
//     employee.employee_role = decodedToken.employee_role;
//     employee.employee_id = decodedToken.employee_id;
//     employee.employee_first_name = decodedToken.employee_first_name;
//     return employee;

//     // Employee object is exported as follow
//     // {
//     //   employee_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjY2M2E4ZTUwNjE2MjY5MjE3Nzc0MmIiLCJ1c2VybmFtZSI6IjEyMzQ1NiIsImVtYWlsIjoiam9obmRvZUBnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2MjQ1MjY0NzB9.71QwHF-KD0f7U2XxZ8EyZlQ3G7yxNJKXG7JjYQ7ZG8M",
//     //   employee_role: 3,
//     //   employee_id: 1,
//     //   employee_first_name: "Evangadi",
//     // }
//   } else {
//     return {};
//   }
// };

// // Function to decode the payload from the token
// // The purpose of this code is to take a JWT token, extract its payload, decode it from Base64Url encoding, and then convert the decoded payload into a JavaScript object for further use and manipulation
// const decodeTokenPayload = (token) => {
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
//       .join("")
//   );
//   return JSON.parse(jsonPayload);
// };

// // const decodeTokenPayload = (token) => {
// //   return jwt_decode(token);
// // };

// Function to read the data from the user's local storage
const getAuth = async () => {
  const employee = await JSON.parse(localStorage.getItem("employee"));

  if (employee && employee.employee_token) {
    const decodedToken = decodeTokenPayload(employee.employee_token);
    employee.employee_role = decodedToken.employee_role;
    employee.employee_id = decodedToken.employee_id;
    employee.employee_first_name = decodedToken.employee_first_name;
    return employee;
  } else {
    return {};
  }
};

// Function to decode the payload from the token
const decodeTokenPayload = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export default getAuth;
