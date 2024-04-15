import React, { useState } from 'react';
import serviceService from '../../../../services/service.service';
import { useAuth } from '../../../../Contexts/AuthContext';
import Notification from './Notification'; // Import the custom Notification component

function AddServiceForm(props) {
  const [service_name, setServiceName] = useState('');
  const [service_description, setServiceDescription] = useState('');
  const [serverError, setServerError] = useState('');
  const [descriptionRequired, setDescriptionError] = useState('');
  const [serviceNameRequired, setServiceNameRequired] = useState('');
  const [success, setSuccess] = useState(false);
  let loggedInserviceToken = '';
  const { service } = useAuth();
  if (service && service.service_token) {
    loggedInserviceToken = service.service_token;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if (!service_name) {
      setServiceNameRequired('Service name is required');
      valid = false;
    } else {
      setServiceNameRequired('');
    }
    if (!service_description) {
      setDescriptionError('Service description is required');
      valid = false;
    } else {
      setDescriptionError('');
    }

    if (!valid) {
      return;
    }
    const formData = {
      service_name,
      service_description,
    };

    try {
      const newService = await serviceService.addService(formData, loggedInserviceToken);
      console.log(newService);
      if (newService.error) {
        setServerError(newService.error);
      } else {
        setSuccess(true);
        setServerError('');
        setTimeout(() => {
          setSuccess(false); // Clear the success state after a certain time
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      setServerError(resMessage);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new service</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-9">
            <div className="inner-column">
              <div className="contact-form">
                <h3 className=' fw-bold  text-success '>
                {success && <Notification  message="Service added successfully!" type="success" />}
                {serverError && <Notification message={serverError} type="error" />}
                </h3>
                <form onSubmit={handleSubmit}>
                <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="service_name"
                        value={service_name}
                        onChange={(event) => setServiceName(event.target.value)}
                        placeholder="Service Name"
                      />
                      {serviceNameRequired && (
                        <div className="validation-error" role="alert">
                          {serviceNameRequired}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <textarea
                        type="text"
                        name="service_description"
                        value={service_description}
                        onChange={(event) => setServiceDescription(event.target.value)}
                        placeholder="Service description"
                      />
                      {descriptionRequired && (
                        <div className="validation-error" role="alert">
                          {descriptionRequired}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>ADD SERVICE</span>
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

export default AddServiceForm;