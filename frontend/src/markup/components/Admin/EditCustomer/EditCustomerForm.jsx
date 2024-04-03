// customer Edit form
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import customerService
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { useParams } from "react-router-dom";

const EditCustomerForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_phone_number: "",
    active_customer_status: false,
  });
  const navigate = useNavigate();

  const [firstNameRequired, setFirstNameRequired] = useState("");
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
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const responseData = await customerService.getCustomerById(id);
        // console.log(response.data);
        // const responseData = await response.json();
        // console.log(responseData);

        setCustomerData({
          customer_email: responseData.data[0].customer_email,
          customer_first_name: responseData.data[0].customer_first_name,
          customer_last_name: responseData.data[0].customer_last_name,
          customer_phone_number: responseData.data[0].customer_phone_number,
          active_customer_status: responseData.data[0].active_customer_status,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const isValid = validateFormData(customerData);

      if (!isValid) {
        return;
      }
      const response = await customerService.updateCustomer(id, customerData);
      if (response.error) {
        setServerError(response.error);
      } else {
        // Handle successful response
        setSuccess(true);
        setServerError("");
        setTimeout(() => {
          navigate("/admin/customers");
        }, 500);
      }
    } catch (error) {
      console.error("Error updating customer:", error.message);
      setServerError("Failed to update customer.");
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
    return isValid;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!customerData) {
    return <div>No customer found.</div>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            Edit: {customerData.customer_first_name}{" "}
            {customerData.customer_last_name}{" "}
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
                      <h4 className="fw-bold">
                        Customer email: {customerData.customer_email}
                      </h4>
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_first_name"
                        value={customerData.customer_first_name}
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
                        name="customer_last_name"
                        value={customerData.customer_last_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_phone_number"
                        value={customerData.customer_phone_number}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="checkbox"
                        name="active_customer_status"
                        checked={customerData.active_customer_status}
                        onChange={handleInputChange}
                      />{" "}
                      <span> is active customer</span>
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
};

export default EditCustomerForm;
