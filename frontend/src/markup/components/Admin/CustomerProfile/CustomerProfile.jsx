import React, { useState, useEffect } from "react";
// import customer service
import customerService from "../../../../services/customer.service";
import vehicleService from "../../../../services/vehicle.service";
// import userParams, useNavigate, Link and useParams from react-router-dom
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaHandPointUp } from "react-icons/fa";
// import table from bootstrap
import { Table } from "react-bootstrap";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // form data useState variables
  const [vehicle_year, setVehicle_year] = useState("");
  const [vehicle_make, setVehicle_make] = useState("");
  const [vehicle_model, setVehicle_model] = useState("");
  const [vehicle_type, setVehicle_type] = useState("");
  const [vehicle_color, setVehicle_color] = useState("");
  const [vehicle_serial, setVehicle_serial] = useState("");
  const [vehicle_tag, setVehicle_tag] = useState("");
  const [vehicle_mileage, setVehicle_mileage] = useState("");

  //Errors
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const data = await customerService.getCustomerById(id);
        setCustomer(data);

        const vehicle = await customerService.getCustomerVehicles(id);
        setVehicles(vehicle.data);
        // console.log("Vehicle data", vehicles?.data);
        const order = await customerService.getCustomerOrders(id);
        setOrders(order.data);
      } catch (error) {
        console.error("Error fetching customer data:", error.message);
        setApiError(true);
        setApiErrorMessage(error.message);
      }
    };
    fetchCustomerData();
  }, [id, submitted]);

  const handleAddVehicle = async () => {
    try {
      const formData = {
        vehicle_year,
        vehicle_make,
        vehicle_model,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color,
      };

      const response = await vehicleService.addVehicle(id, formData);
      console.log("Response of customer", response);
      if (response.data.error) {
        console.log("Server Error");
        setServerError(response.data.error);
      } else {
        setServerError("");

        // Fetch the updated list of vehicles
        const updatedVehicleData = await customerService.getCustomerVehicles(
          id
        );
        setVehicles(updatedVehicleData.data);

        // Set submitted to true to trigger useEffec
        // navigate("/admin/customers");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddVehicle();

    // Hide the add vehicle form
    setShowAddVehicleForm(false);
    // Clear input fields
    setVehicle_year("");
    setVehicle_make("");
    setVehicle_model("");
    setVehicle_type("");
    setVehicle_color("");
    setVehicle_serial("");
    setVehicle_tag("");
    setVehicle_mileage("");

    setSubmitted(true);
  };

  return (
    <>
      {apiError ? (
        <div>Error: {apiErrorMessage}</div>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="history-block ">
              <div className="years">Info</div>
              <div className="content ">
                <h3>Customer: {customer?.data?.[0]?.customer_first_name}</h3>
                <p>
                  <b>Email: {customer?.data?.[0]?.customer_email}</b>
                </p>
                <p>
                  <b>
                    Phone Number: {customer?.data?.[0]?.customer_phone_number}
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
                    <MdEdit />
                  </Link>
                </p>
              </div>
            </div>

            <div className="history-block">
              <div className="years">Cars</div>
              <div className="content">
                <h3>Vehicles of {customer?.data?.[0]?.customer_first_name}</h3>

                {showAddVehicleForm ? (
                  <>
                    <h6>Add Vehicle</h6>
                    <form className="form-container" onSubmit={handleSubmit}>
                      {/* Input fields for vehicle info */}
                      <input
                        type="text"
                        placeholder="Vehicle Year"
                        value={vehicle_year}
                        onChange={(e) => setVehicle_year(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Vehicle Make"
                        value={vehicle_make}
                        onChange={(e) => setVehicle_make(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Vehicle model"
                        value={vehicle_model}
                        onChange={(e) => setVehicle_model(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Vehicle Type"
                        value={vehicle_type}
                        onChange={(e) => setVehicle_type(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Vehicle Mileage"
                        value={vehicle_mileage}
                        onChange={(e) => setVehicle_mileage(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Vehicle Tag"
                        value={vehicle_tag}
                        onChange={(e) => setVehicle_tag(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Vehicle Serial"
                        value={vehicle_serial}
                        onChange={(e) => setVehicle_serial(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Vehicle Color"
                        value={vehicle_color}
                        onChange={(e) => setVehicle_color(e.target.value)}
                      />

                      <button type="submit">Add</button>
                      <button
                        className="cancel-btn"
                        onClick={() => setShowAddVehicleForm(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Vehicle Make</th>
                          <th>Vehicle Model</th>
                          <th>Vehicle Type</th>
                          <th>Vehicle Tag</th>
                          <th>Vehcile Serial</th>
                          <th>Vehicle Color</th>
                          <th>Vehicle Meleage</th>
                          <th>Edit</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vehicles?.map((vehicle) => (
                          <tr key={vehicle.vehicle_id}>
                            <td>{vehicle.vehicle_make}</td>
                            <td>{vehicle.vehicle_model}</td>
                            <td>{vehicle.vehicle_type}</td>
                            <td>{vehicle.vehicle_tag}</td>
                            <td>{vehicle.vehicle_serial}</td>
                            <td>{vehicle.vehicle_color}</td>
                            <td>{vehicle.vehicle_mileage}</td>
                            <td>
                              <div className="edit-delete-icons">
                                <Link
                                  style={{ color: "blue" }}
                                  to={`/admin/vehicle/edit/${vehicle.vehicle_id}`}
                                >
                                  <MdEdit />
                                </Link>
                              </div>
                            </td>
                            <td>
                              <Link
                                style={{ color: "blue" }}
                                to={`/admin/customer-vehicle-service/get/${id}/${vehicle.vehicle_id}`}
                              >
                                <FaHandPointUp />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className="form-group col-md-12">
                      <button
                        onClick={() => setShowAddVehicleForm(true)}
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Add Vehicle</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="history-block">
              <div className="years">Orders</div>
              <div className="content">
                <h3>Orders of {customer?.data?.[0]?.customer_first_name} </h3>
                {}
                {/* ###### */}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Order Date</th>
                      <th>Order Status</th>
                      <th>Order Price</th>
                      <th>Edit/View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order) => (
                      <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>{order.order_date}</td>
                        <td>{order.order_status}</td>
                        <td>{order.order_total_price}</td>

                        <td>
                          <div className="edit-delete-icons">
                            <Link
                              style={{ color: "blue" }}
                              to={`/admin/customer/edit/${customer.customer_id}`}
                              className="edit-icon"
                            >
                              <MdEdit />
                            </Link>
                            <Link
                              style={{ color: "blue" }}
                              to={`/admin/customer/get/${customer.customer_id}`}
                            >
                              <FaHandPointUp />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {/* ###### */}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CustomerProfile;
