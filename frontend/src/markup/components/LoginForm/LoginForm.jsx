import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import loginService
import loginService from "../../../services/login.service";
const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  //##########################

  const validateForm = () => {
    let valid = true;

    if (!employee_email || !employee_email.includes("@")) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = {
      employee_email,
      employee_password,
    };
    console.log(formData);
    try {
      const response = await loginService.logIn(formData);
      console.log(response);
      // console.log(response.data.data.employee_token);
      console.log(response.data.status);
      if (response.status === 200 && response.data.status === "success") {
        // console.log(response.data.data.employee_token);
        if (response.data.data.employee_token) {
          localStorage.setItem("employee", JSON.stringify(response.data));
          console.log(" Local Storage" + localStorage.getItem("employee"));
          // console.log(" Local Storage" + localStorage.getItem("employee"));
        }

        if (location.pathname === "/login") {
          navigate("/admin");
          window.location.reload();
        }
      } else {
        setServerError(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setServerError("An error occurred during login.");
    }
  };

  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Login to your account</h2>
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
                          placeholder="Email"
                        />
                        {emailError && (
                          <div className="validation-error" role="alert">
                            {emailError}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="password"
                          name="employee_password"
                          value={employee_password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Password"
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
                          <span>Login</span>
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

export default LoginForm;
