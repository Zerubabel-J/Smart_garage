import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
// import customer service
import customerService from "../../../../../services/customer.service";
import orderService from "../../../../../services/order.service";
import vehicleService from "../../../../../services/vehicle.service";
import serviceService from "../../../../../services/service.service";
// import userParams, useNavigate, Link and useParams from react-router-dom
import { useParams, useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../../../../Contexts/AuthContext";
// import useAuth
// import the css file
import "./Customer_vehicle_service.css";
import { FaEdit } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";

const Customer_vehicle_service = () => {
  const [customer, setCustomer] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const { employee } = useAuth();
  // form data
  const [selectedServices, setSelectedServices] = useState([]);
  const [comment, setComment] = useState("");
  const [inputValue, setInputValue] = useState("");
  // api error
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { id, vehicle_id } = useParams();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const data = await customerService.getCustomerById(id);
        setCustomer(data);

        const vehicle = await vehicleService.getVehicleById(vehicle_id);
        setVehicles(vehicle);
        // // console.log("Vehicle data", vehicles?.data);
        // const order = await customerService.getCustomerOrders(id);

        const service = await serviceService.getAllServices();
        setServices(service);
      } catch (error) {
        console.error("Error fetching customer data:", error.message);
        setApiError(true);
        setApiErrorMessage(error.message);
      }
    };

    fetchCustomerData();
  }, [id]);
  // a function to handle a service selection
  const handleServiceSelection = (serviceId) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.includes(serviceId)
        ? prevSelectedServices.filter((id) => id !== serviceId)
        : [...prevSelectedServices, serviceId]
    );
  };

  // write a function to handle a successful order creation
  const handleOrderCreation = async (e) => {
    try {
      e.preventDefault();

      const selectedServiceObjects = services.filter((service) =>
        selectedServices.includes(service.service_id)
      );

      const formData = {
        employee_id: employee.employee_id, // Assuming you have the employee id here
        customer_id: id,
        vehicle_id: vehicle_id,
        additional_request: comment,
        price: inputValue,
        order_status: 0,
        order_services: selectedServiceObjects.map((service) => ({
          service_id: service.service_id,
        })),
      };
      console.log("form dataaaa from front enddddd", formData);
      const loggedInEmployeeToken = localStorage.getItem("token");
      await orderService.createOrder(formData, loggedInEmployeeToken);
      navigate("/admin/orders");
    } catch (error) {
      console.error("Error creating order:", error.message);
      setApiError(true);
      setApiErrorMessage(error.message);
    }
  };

  return (
    <>
      {apiError ? (
        <div>Error: {apiErrorMessage}</div>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Create a new order</h2>
            </div>
            <div className="content ">
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>
                    <h3>
                      Customer: {customer?.data?.[0]?.customer_first_name}
                    </h3>
                  </Card.Title>
                  <Card.Text className="ml-3 d-flex justify-content-between align-items-start">
                    <div>
                      <p>
                        <b>Email: {customer?.data?.[0]?.customer_email}</b>
                      </p>
                      <p>
                        <b>
                          Phone Number:{" "}
                          {customer?.data?.[0]?.customer_phone_number}
                        </b>
                      </p>
                      <p>
                        <b>
                          Active Customer:{" "}
                          {customer?.data?.[0]?.active_customer_status}
                        </b>
                      </p>
                      <p>
                        <b>Edit customer info:</b> edit{" "}
                        <Link
                          style={{ color: "blue" }}
                          to={`/admin/customer/edit/${customer?.data?.[0]?.customer_id}`}
                        >
                          <FaEdit size={22} color="red" />
                        </Link>
                      </p>
                    </div>
                    <div className="text-right mr-4  ">
                      <Link to={"/admin/add-orders"}>
                        <CgCloseR size={25} color="red" />
                      </Link>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="content  ">
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>
                    <h3>{vehicles?.[0]?.vehicle_make}</h3>
                  </Card.Title>
                  <Card.Text className="ml-3 d-flex justify-content-between align-items-start">
                    <div>
                      <p>
                        <b>Color: {vehicles?.[0]?.vehicle_color}</b>
                      </p>
                      <p>
                        <b>vehicle tag: {vehicles?.[0]?.vehicle_tag}</b>
                      </p>
                      <p>
                        <b>vehicle type: {vehicles?.[0]?.vehicle_type}</b>
                      </p>
                      <p>
                        <b>Vehicle mileage: {vehicles?.[0]?.vehicle_mileage}</b>
                      </p>
                      <p>
                        <b>Vehicle serial: {vehicles?.[0]?.vehicle_serial}</b>
                      </p>
                      <p>
                        <b>Edit vehicle info:</b> edit{" "}
                        <Link
                          to={`/admin/vehicle/edit/${vehicles?.[0]?.vehicle_id}`}
                        >
                          <FaEdit size={22} color="red" />
                        </Link>
                      </p>
                    </div>
                    <div className="text-right mr-4  ">
                      <Link to={"/admin/add-orders"}>
                        <CgCloseR size={25} color="red" />
                      </Link>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div>
              {services.map((service) => (
                <>
                  <Card className="mb-3" key={service.service_id}>
                    <Card.Body>
                      <Card.Title>
                        <h3>{service.service_name}</h3>
                      </Card.Title>
                      <Card.Text className="">
                        <div className="service-description ml-3 d-flex justify-content-between align-items-start">
                          {service.service_description}
                          <input
                            className="text-right mr-4 "
                            type="checkbox"
                            value={service.service_id}
                            checked={selectedServices.includes(
                              service.service_id
                            )}
                            onChange={() =>
                              handleServiceSelection(service.service_id)
                            }
                          />
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </>
              ))}
            </div>

            <div className="m-lg-2">
              <div className="form-group">
                <label htmlFor="comment">Comment:</label>
                <textarea
                  className="form-control"
                  id="comment"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="input">Input:</label>
                <input
                  type="text"
                  className="form-control"
                  id="input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div
                className="form-group col-md-12"
                onClick={handleOrderCreation}
              >
                <Link
                  to={`/admin/customer/get/${id}`}
                  className="theme-btn btn-style-one"
                  type="submit"
                  data-loading-text="Please wait..."
                >
                  <span>SUBMIT ORDER</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Customer_vehicle_service;
