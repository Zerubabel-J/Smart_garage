import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import employeeService
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const AddEmployeeForm = () => {
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee, setActive_employee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);
  const navigate = useNavigate();

  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  // Create a variable to hold the user's token
  let loggedInEmployeeToken = "";
  // Destructure the auth hook and get the token
  const { employee } = useAuth();
  // If the user is logged in, get the token
  if (employee) {
    loggedInEmployeeToken = employee.data.employee_token;
  }
  // if (employee.data.employee_token) {
  //   loggedInEmployeeToken = employee.data.employee_token;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    };

    const isValid = validateFormData(formData);

    if (!isValid) {
      return;
    }

    try {
      const response = await employeeService.createEmployee(
        formData,
        loggedInEmployeeToken
      );
      console.log(response);
      if (response.data.error) {
        console.log("Server Error");
        setServerError(response.data.error);
      } else {
        handleSuccess();
      }
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setServerError(errorMessage);
    }
  };

  const validateFormData = (formData) => {
    let isValid = true;

    if (!formData.employee_first_name) {
      setFirstNameRequired("First name is required");
      isValid = false;
    } else {
      setFirstNameRequired("");
    }

    if (!formData.employee_email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.employee_email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!formData.employee_password || formData.employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSuccess = () => {
    setSuccess(true);
    setServerError("");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  // const handleSubmit = (e) => {
  //   // Prevent the default behavior of the form
  //   e.preventDefault();
  //   // Handle client-side validations
  //   let valid = true; // Flag
  //   // First name is required
  //   if (!employee_first_name) {
  //     setFirstNameRequired("First name is required");
  //     valid = false;
  //   } else {
  //     setFirstNameRequired("");
  //   }
  //   // Email is required and must have a valid format
  //   if (!employee_email) {
  //     setEmailError("Email is required");
  //     valid = false;
  //   } else if (
  //     !employee_email.includes("@") ||
  //     !/\S+@\S+\.\S+/.test(employee_email)
  //   ) {
  //     setEmailError("Invalid email format");
  //     valid = false;
  //   } else {
  //     setEmailError("");
  //   }
  //   // Password must be at least 6 characters long
  //   if (!employee_password || employee_password.length < 6) {
  //     setPasswordError("Password must be at least 6 characters long");
  //     valid = false;
  //   } else {
  //     setPasswordError("");
  //   }
  //   // If the form is not valid, do not submit
  //   if (!valid) {
  //     return;
  //   }
  //   const formData = {
  //     employee_email,
  //     employee_first_name,
  //     employee_last_name,
  //     employee_phone,
  //     employee_password,
  //     active_employee,
  //     company_role_id,
  //   };

  //   // Pass the form data to the service
  //   const newEmployee = employeeService.createEmployee(formData);

  //   newEmployee
  //     .then((response) => {
  //       // If Error is returned from the API server, set the error message
  //       if (response.data.error) {
  //         console.log("Server Error");
  //         setServerError(response.data.error);
  //       } else {
  //         // Handle successful response
  //         setSuccess(true);
  //         setServerError("");
  //         // Redirect to the employees page after 2 seconds
  //         // For now, just redirect to the home page
  //         setTimeout(() => {
  //           // window.location.href = '/admin/employees';
  //           window.location.href = "/login";
  //         }, 2000);
  //       }
  //     })
  //     // Handle Catch
  //     .catch((error) => {
  //       const resMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       setServerError(resMessage);
  //     });
  // };
  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Add a new employee</h2>
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
                        <input
                          type="email"
                          name="employee_email"
                          value={employee_email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="Employee email"
                        />
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
                          value={employee_first_name}
                          onChange={(event) => setFirstName(event.target.value)}
                          placeholder="Employee first name"
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
                          value={employee_last_name}
                          onChange={(event) => setLastName(event.target.value)}
                          placeholder="Employee last name"
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="employee_phone"
                          value={employee_phone}
                          onChange={(event) =>
                            setPhoneNumber(event.target.value)
                          }
                          placeholder="Employee phone (555-555-5555)"
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <select
                          name="employee_role"
                          value={company_role_id}
                          onChange={(event) =>
                            setCompany_role_id(event.target.value)
                          }
                          className="custom-select-box"
                        >
                          <option value="1">Employee</option>
                          <option value="2">Manager</option>
                          <option value="3">Admin</option>
                        </select>
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="password"
                          name="employee_password"
                          value={employee_password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Employee password"
                        />
                        {passwordError && (
                          <div className="validation-error" role="alert">
                            {passwordError}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>Add employee</span>
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
    </>
  );
};

export default AddEmployeeForm;
