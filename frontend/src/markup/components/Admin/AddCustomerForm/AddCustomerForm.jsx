import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import customer service
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const AddCustomerForm = () => {
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [serverError, setServerError] = useState("");
  // const [success, setSuccess] = useState(false);
  // Create a variable to hold the user's token
  let loggedInEmployeeToken = "";
  // Destructure the auth hook and get the token
  const { employee } = useAuth();
  // console.log("Customer Add .....", employee);
  // If the user is logged in, get the token
  if (employee) {
    loggedInEmployeeToken = employee.data.employee_token;
  }
  // if (employee.data.customer_token) {
  //   loggedInEmployeeToken = employee.data.customer_token;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone,
    };

    const isValid = validateFormData(formData);

    if (!isValid) {
      return;
    }

    try {
      const response = await customerService.createCustomer(
        formData,
        loggedInEmployeeToken
      );
      console.log("Response of customer", response);
      if (response.data.error) {
        console.log("Server Error");
        setServerError(response.data.error);
      } else {
        handleSuccess();
      }
    } catch (error) {
      console.log(error.message);
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

    if (!formData.customer_first_name) {
      setFirstNameRequired("First name is required");
      isValid = false;
    } else {
      setFirstNameRequired("");
    }

    if (!formData.customer_email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.customer_email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleSuccess = () => {
    // setSuccess(true);
    setServerError("");
    setTimeout(() => {
      navigate("/admin/customers");
    }, 1000);
  };

  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Add a new customer</h2>
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
                          name="customer_email"
                          value={customer_email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="Customer email"
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
                          name="customer_first_name"
                          value={customer_first_name}
                          onChange={(event) => setFirstName(event.target.value)}
                          placeholder="Customer first name"
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
                          name="customer_last_name"
                          value={customer_last_name}
                          onChange={(event) => setLastName(event.target.value)}
                          placeholder="Customer last name"
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="customer_phone"
                          value={customer_phone}
                          onChange={(event) =>
                            setPhoneNumber(event.target.value)
                          }
                          placeholder="Customer phone (555-555-5555)"
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>Add Customer</span>
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

export default AddCustomerForm;
