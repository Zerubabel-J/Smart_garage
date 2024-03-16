import React from "react";

function AddEmployeeForm(props) {
  // create validation function
const validate = () => {
  let isValid = true;

// validate first name
if(!employee_first_name) {
  setFirstNameRequired('First name is required');
  isValid = false;
}

// validate email
if(!employee_email) {
  setEmailError('Email is required');
  isValid = false;
} else if(!employee_email.includes('@')) {
  setEmailError('Invalid email format');
  isValid = false;
}

// validate password
if(!employee_password || employee_password.length < 6) {
  setPasswordError('Password must be at least 6 characters');
  isValid = false;
}

return isValid;
}

// create handleSubmit function
const handleSubmit = async (e) => {
e.preventDefault();

// validate form
const isValid = validate();

// if valid, submit to server
if(isValid) {

  try {

    const response = await fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        employee_email,
        employee_first_name,
        employee_last_name,
        employee_phone,
        employee_password,
        active_employee,
        company_role_id
      })
    });

    const result = await response.json();

    if(response.ok) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/employees');
      }, 2000);
    } else {
      setServerError(result.message);
    }

  } catch (error) {
    console.error(error);
    setServerError('Server error. Please try again later.');
  }

}

}
// Submit form if validations pass
if (valid) {
// Call API to create employee
const response = await employeeService.createEmployee({
  employee_email,
  employee_first_name,
  employee_last_name,
  employee_phone,
  employee_password,
  active_employee,
  company_role_id
});

// Handle response
if(response.ok) {
  setSuccess(true);
} else {
  const {message} = await response.json();
  setServerError(message);
}

}

// Handle errors
if(response.ok) {
setSuccess(true);
setServerError('');
} else {
const {message} = await response.json();
setServerError(message);
}

// Handle errors
if(!response.ok) {
const {message} = await response.json();
setServerError(message);
}
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        name="employee_email"
                        placeholder="Employee email"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_first_name"
                        placeholder="Employee first name"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_last_name"
                        placeholder="Employee last name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_phone"
                        placeholder="Employee phone (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <select
                        name="employee_role"
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
                        placeholder="Employee password"
                      />
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
  );
}

export default AddEmployeeForm;
