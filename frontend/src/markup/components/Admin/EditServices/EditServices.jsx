import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
import serviceService from "../../../../services/service.service";

function EditServices() {
  const navigate = useNavigate();
  const { service_id } = useParams();
  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || "";

  const [service, setService] = useState({
    service_name: "",
    service_description: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch the service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        const responseData = await serviceService.singleService(
          service_id, // Pass the service_id parameter directly
          loggedInEmployeeToken
        );
        

        setService({
          service_name: responseData[0].service_name || "",
          service_description: responseData[0].service_description || "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [service_id, loggedInEmployeeToken]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setService((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await serviceService.updateService(
        service,
        service_id,
        loggedInEmployeeToken
      );
      // Handle successful response
      console.log("Service updated successfully:", response);

      // Redirect to the services page after a successful update
      navigate("/admin/services");
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="contact-section pb-5">
        <div className=" bg-white px-5 pt-5 mt-4 contact-title mb-1">
          <h2>Update "{service.service_name}" Service</h2>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="row clearfix">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    name="service_name"
                    value={service.service_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group col-md-12">
                  <textarea
                    type="text"
                    name="service_description"
                    onChange={handleInputChange}
                    value={service.service_description}
                    required
                  ></textarea>
                </div>

                <div className="form-group col-md-12">
                  <button className="theme-btn btn-style-one" type="submit">
                    <span>UPDATE SERVICE</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditServices;
