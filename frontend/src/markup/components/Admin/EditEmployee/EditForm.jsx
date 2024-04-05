import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";
// Import the employeeService function
import employeeService from "../../../../services/employee.service";
import { useParams } from "react-router-dom";
function EditEmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employee_first_name, setFirstName] = useState("");
  const [employeeData, setEmployeeData] = useState({
    employee_first_name: "",
    employee_last_name: "",
    employee_phone: "",
    employee_role: "",
    active_employee: false,
  });
  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  // To get the logged in employee token
  const { employee } = useAuth();
  let token = null; // To store the token
  if (employee) {
    token = employee.employee_token;
  }
  // Fetch the employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const responseData = await employeeService.getEmployeeById(token, id);
        console.log("Employee update ........", responseData);

        setEmployeeData({
          employee_email: responseData.data[0].employee_email,
          employee_first_name: responseData.data[0].employee_first_name,
          employee_last_name: responseData.data[0].employee_last_name,
          employee_phone: responseData.data[0].employee_phone,
          employee_role: responseData.data[0].company_role_id,
          active_employee: responseData.data[0].active_employee,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id, token]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await employeeService.updateEmployee(
        token,
        employeeData,
        id
      );
      if (response.error) {
        setServerError(response.error);
      } else {
        // Handle successful response
        setSuccess(true);
        setServerError("");
        // Redirect to the employees page after 2 seconds
        // For now, just redirect to the home page
        setTimeout(() => {
          navigate("/admin/employees");
        }, 500);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      setServerError("Failed to update employee.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employeeData) {
    return <div>No employee found.</div>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            Edit: {employeeData.employee_first_name}{" "}
            {employeeData.employee_last_name}{" "}
          </h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <h4>Employee email: {employeeData.employee_email}</h4>
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_first_name"
                        value={employeeData.employee_first_name}
                        onChange={handleInputChange}
                      />
                      {firstNameRequired && (
                        <div className="validation-error" role="alert">
                          {firstNameRequired}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_last_name"
                        value={employeeData.employee_last_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_phone"
                        value={employeeData.employee_phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <select
                        name="employee_role"
                        value={employeeData.employee_role}
                        className="custom-select-box"
                        onChange={handleInputChange}
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="checkbox"
                        name="active_employee"
                        checked={employeeData.active_employee}
                        onChange={handleInputChange}
                      />{" "}
                      <span> is active employee</span>
                    </div>
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>UPDATE</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditEmployeeForm;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// // import employeeService
// import employeeService from "../../../../services/employee.service";
// import { useAuth } from "../../../../Contexts/AuthContext";
// import { useParams } from "react-router-dom";

// const EditForm = () => {
//   const [employee_email, setEmail] = useState("");
//   const [employee_first_name, setFirstName] = useState("");
//   const [employee_last_name, setLastName] = useState("");
//   const [employee_phone, setPhoneNumber] = useState("");
//   const [employee_password, setPassword] = useState("");
//   const [active_employee, setActive_employee] = useState(1);
//   const [company_role_id, setCompany_role_id] = useState(1);
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get employee_id from URL params

//   // Errors
//   const [emailError, setEmailError] = useState("");
//   const [firstNameRequired, setFirstNameRequired] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [serverError, setServerError] = useState("");
//   // Create a variable to hold the user's token
//   let loggedInEmployeeToken = "";
//   // Destructure the auth hook and get the token
//   const { employee } = useAuth();
//   // If the user is logged in, get the token
//   if (employee) {
//     loggedInEmployeeToken = employee.data.employee_token;
//   }

//   // UseEffect to fetch employee data based on the employee_id
//   // You need to implement this to fetch the data for editing
//   // This is just a placeholder, replace it with actual data fetching logic
//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       // Fetch employee data based on id
//       try {
//         const data = await employeeService.getEmployeeById(
//           loggedInEmployeeToken,
//           id
//         );
//         console.log(data);
//         // const data = await response.json();
//         console.log("Nightttttt", data);
//         // Update state with fetched data
//         setEmail(data.employee_email);
//         setFirstName(data.employee_first_name);
//         setLastName(data.employee_last_name);
//         setPhoneNumber(data.employee_phone);
//         // Similarly, update other state variables
//       } catch (error) {
//         console.error("Error fetching employee data:", error);
//       }
//     };

//     fetchEmployeeData();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = {
//       employee_email,
//       employee_first_name,
//       employee_last_name,
//       employee_phone,
//       employee_password,
//       active_employee,
//       company_role_id,
//     };

//     const isValid = validateFormData(formData);

//     if (!isValid) {
//       return;
//     }

//     try {
//       const response = await employeeService.updateEmployee(
//         formData,
//         loggedInEmployeeToken,
//         id
//       );

//       console.log(response);
//       if (!response.success) {
//         setServerError(response.error);
//       } else {
//         handleSuccess();
//       }
//     } catch (error) {
//       const errorMessage =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       setServerError(errorMessage);
//       console.log("Server Error");
//       console.log(serverError);
//       console.log(loggedInEmployeeToken);
//     }
//   };

//   const validateFormData = (formData) => {
//     let isValid = true;

//     if (!formData.employee_first_name) {
//       setFirstNameRequired("First name is required");
//       isValid = false;
//     } else {
//       setFirstNameRequired("");
//     }

//     if (!formData.employee_email) {
//       setEmailError("Email is required");
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(formData.employee_email)) {
//       setEmailError("Invalid email format");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (!formData.employee_password || formData.employee_password.length < 6) {
//       setPasswordError("Password must be at least 6 characters long");
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }

//     return isValid;
//   };

//   const handleSuccess = () => {
//     setSuccess(true);
//     setServerError("");
//     setTimeout(() => {
//       navigate("/admin/employees");
//     }, 2000);
//   };

//   return (
//     <>
//       <section className="contact-section">
//         <div className="auto-container">
//           <div className="contact-title">
//             <h2>Update an employee</h2>
//           </div>
//           <div className="row clearfix">
//             <div className="form-column col-lg-7">
//               <div className="inner-column">
//                 <div className="contact-form">
//                   <form onSubmit={handleSubmit}>
//                     <div className="row clearfix">
//                       <div className="form-group col-md-12">
//                         {serverError && (
//                           <div className="validation-error" role="alert">
//                             {serverError}
//                           </div>
//                         )}
//                         <input
//                           type="email"
//                           name="employee_email"
//                           value={employee_email}
//                           onChange={(event) => setEmail(event.target.value)}
//                           placeholder="Employee email"
//                         />
//                         {emailError && (
//                           <div className="validation-error" role="alert">
//                             {emailError}
//                           </div>
//                         )}
//                       </div>
//                       <div className="form-group col-md-12">
//                         <input
//                           type="text"
//                           name="employee_first_name"
//                           value={employee_first_name}
//                           onChange={(event) => setFirstName(event.target.value)}
//                           placeholder="Employee first name"
//                         />
//                         {firstNameRequired && (
//                           <div className="validation-error" role="alert">
//                             {firstNameRequired}
//                           </div>
//                         )}
//                       </div>

//                       <div className="form-group col-md-12">
//                         <input
//                           type="text"
//                           name="employee_last_name"
//                           value={employee_last_name}
//                           onChange={(event) => setLastName(event.target.value)}
//                           placeholder="Employee last name"
//                           required
//                         />
//                       </div>

//                       <div className="form-group col-md-12">
//                         <input
//                           type="text"
//                           name="employee_phone"
//                           value={employee_phone}
//                           onChange={(event) =>
//                             setPhoneNumber(event.target.value)
//                           }
//                           placeholder="Employee phone (555-555-5555)"
//                           required
//                         />
//                       </div>

//                       <div className="form-group col-md-12">
//                         <select
//                           name="employee_role"
//                           value={company_role_id}
//                           onChange={(event) =>
//                             setCompany_role_id(event.target.value)
//                           }
//                           className="custom-select-box"
//                         >
//                           <option value="1">Employee</option>
//                           <option value="2">Manager</option>
//                           <option value="3">Admin</option>
//                         </select>
//                       </div>

//                       <div className="form-group col-md-12">
//                         <input
//                           type="password"
//                           name="employee_password"
//                           value={employee_password}
//                           onChange={(event) => setPassword(event.target.value)}
//                           placeholder="Employee password"
//                         />
//                         {passwordError && (
//                           <div className="validation-error" role="alert">
//                             {passwordError}
//                           </div>
//                         )}
//                       </div>

//                       <div className="form-group col-md-12">
//                         <button
//                           className="theme-btn btn-style-one"
//                           type="submit"
//                           data-loading-text="Please wait..."
//                         >
//                           <span>Update</span>
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default EditForm;
