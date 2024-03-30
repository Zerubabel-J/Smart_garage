// customer Edit form
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import customerService
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { useParams } from "react-router-dom";

const EditCustomerForm = () => {
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone, setPhoneNumber] = useState("");

  const navigate = useNavigate();
  const { id } = useParams(); // Get customer_id from URL params

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
    loggedInEmployeeToken = employee.data.customer_token;
  }

  // UseEffect to fetch employee data based on the customer_id
  // You need to implement this to fetch the data for editing

  useEffect(() => {
    const fetchCustomerData = async () => {
      // Fetch employee data based on id
      try {
        const data = await customerService.getCustomerById(id);
        console.log(data);
        // const data = await response.json();
        console.log("Nightttttt", data);
        // Update state with fetched data
        setEmail(data.customer_email);
        setFirstName(data.customer_first_name);
        setLastName(data.customer_last_name);
        setPhoneNumber(data.customer_phone);
      } catch (error) {
        console.error("Error fetching employee data:", error.message);
      }
    };

    fetchCustomerData();
  }, [id]);

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
      const response = await customerService.updateCustomer(formData, id);

      console.log(response);
      if (!response.success) {
        setServerError(response.error);
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
      console.log("Server Error");
      console.log(serverError);
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
    setSuccess(true);
    setServerError("");
    setTimeout(() => {
      navigate("/admin/employees");
    }, 1000);
  };

  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Update an customer</h2>
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
                          name="customer_first_name"
                          value={customer_first_name}
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
                          name="customer_last_name"
                          value={customer_last_name}
                          onChange={(event) => setLastName(event.target.value)}
                          placeholder="Employee last name"
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
                          placeholder="Employee phone (555-555-5555)"
                          required
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>Update</span>
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

export default EditCustomerForm;
