import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import vehicleService from "../../../../services/vehicle.service";

const EditVehicleForm = () => {
  const { vehicle_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [vehicleData, setVehicleData] = useState({
    customer_id: "",
    vehicle_year: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_type: "",
    vehicle_mileage: "",
    vehicle_tag: "",
    vehicle_serial: "",
    vehicle_color: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const responseData = await vehicleService.getVehicleById(vehicle_id);
        setVehicleData(responseData);
        console.log("Vehicleee dataaaa", responseData);
        setVehicleData({
          customer_id: responseData?.[0]?.customer_id,
          vehicle_year: responseData?.[0]?.vehicle_year,
          vehicle_make: responseData?.[0]?.vehicle_make,
          vehicle_model: responseData?.[0]?.vehicle_model,
          vehicle_type: responseData?.[0]?.vehicle_type,
          vehicle_mileage: responseData?.[0]?.vehicle_mileage,
          vehicle_tag: responseData?.[0]?.vehicle_tag,
          vehicle_serial: responseData?.[0]?.vehicle_serial,
          vehicle_color: responseData?.[0]?.vehicle_color,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      }
    };

    fetchVehicle();
  }, [vehicle_id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await vehicleService.updateVehicleById(
        vehicle_id,
        vehicleData
      );
      if (response.error) {
        console.error("Error updating vehicle:", response.error);
      } else {
        // Handle successful response
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating vehicle:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!vehicleData) {
    return <div>No vehicle found.</div>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit Vehicle</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_year"
                        value={vehicleData.vehicle_year}
                        onChange={handleInputChange}
                        placeholder="Year"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_make"
                        value={vehicleData.vehicle_make}
                        onChange={handleInputChange}
                        placeholder="Make"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_model"
                        value={vehicleData.vehicle_model}
                        onChange={handleInputChange}
                        placeholder="Model"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_type"
                        value={vehicleData.vehicle_type}
                        onChange={handleInputChange}
                        placeholder="Type"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_mileage"
                        value={vehicleData.vehicle_mileage}
                        onChange={handleInputChange}
                        placeholder="Mileage"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_tag"
                        value={vehicleData.vehicle_tag}
                        onChange={handleInputChange}
                        placeholder="Tag"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_serial"
                        value={vehicleData.vehicle_serial}
                        onChange={handleInputChange}
                        placeholder="Serial"
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_color"
                        value={vehicleData.vehicle_color}
                        onChange={handleInputChange}
                        placeholder="Color"
                      />
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

export default EditVehicleForm;
