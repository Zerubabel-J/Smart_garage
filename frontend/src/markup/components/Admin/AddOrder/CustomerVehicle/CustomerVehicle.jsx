import React, { useState, useEffect } from "react";
// import customer service
import customerService from "../../../../../services/customer.service";
// import userParams, useNavigate, Link and useParams from react-router-dom
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaHandPointUp } from "react-icons/fa";
// import table from bootstrap
import { Table } from "react-bootstrap";
// import the css file
import "./CustomerVehicle.css";

const CustomerVehicle = () => {
  const [customer, setCustomer] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const data = await customerService.getCustomerById(id);
        setCustomer(data);
        const vehicle = await customerService.getCustomerVehicles(id);
        setVehicles(vehicle.data);
      } catch (error) {
        console.error("Error fetching customer data:", error.message);
        setApiError(true);
        setApiErrorMessage(error.message);
      }
    };

    fetchCustomerData();
  }, [id]);

  return (
    <>
      {apiError ? (
        <div>Error: {apiErrorMessage}</div>
      ) : (
        <div className="container-fluid customer-profile">
          <div className="customer-info ">
            <div className="info-icon ">Info</div>
            <div className="customer-detail ">
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
                  Active Customer: {customer?.data?.[0]?.active_customer_status}
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

          <div className="customer-vehicle customer-info">
            <div className="cars-icon info-icon">Cars</div>
            <div className="vehicle-lists customer-detail">
              <h3>Vehicles of {customer?.data?.[0]?.customer_first_name}</h3>
              {/* {console.log("Vehicle data", vehicles?.data)} */}
              {/* ###### */}
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
                    <th>Edit/View</th>
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
                            to={`/admin/customer-vehicle-service/get/${id}/${vehicle.vehicle_id}`}
                          >
                            <FaHandPointUp />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="form-group col-md-12">
            <Link
              to={"/admin/add-customer"}
              className="theme-btn btn-style-one"
              type="submit"
              data-loading-text="Please wait..."
            >
              <span>Add Vehicle</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerVehicle;
