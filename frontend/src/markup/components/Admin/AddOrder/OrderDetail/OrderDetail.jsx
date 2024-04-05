import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
// import customer service

import orderService from "../../../../../services/order.service";

// import userParams, useNavigate, Link and useParams from react-router-dom
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../../../../Contexts/AuthContext";
// import useAuth
// import the css file
import "./OrderDetail.css";

const OrderDetail = () => {
  const [orders, setOrders] = useState([]);
  const { employee } = useAuth();
  // api error
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { order_id, order_status } = useParams();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const order = await orderService.getOrderDetail(order_id);
        setOrders(order);
      } catch (error) {
        console.error("Error fetching customer data:", error.message);
        setApiError(true);
        setApiErrorMessage(error.message);
      }
    };

    fetchCustomerData();
  }, [order_id]);

  return (
    <>
      {apiError ? (
        <div>Error: {apiErrorMessage}</div>
      ) : (
        <div className="container-fluid customer-profile">
          <div className="cv-profiles">
            <div className="customer-info ">
              {/* <div className="info-icon ">Info</div> */}
              <div className="customer-detail ">
                <h3> {orders?.[0]?.customer_first_name}</h3>
                <p>
                  <b>Email: {orders?.[0]?.customer_email}</b>
                </p>
                <p>
                  <b>Phone Number: {orders?.[0]?.customer_phone_number}</b>
                </p>
                <p>
                  <b>
                    Active Customer:{" "}
                    {orders?.[0]?.active_customer_status ? "Yes" : "No"}
                  </b>
                </p>
                <p>
                  <b>Edit customer info:</b> edit{" "}
                  <Link
                    style={{ color: "blue" }}
                    to={`/admin/customer/edit/${orders?.data?.[0]?.customer_id}`}
                  >
                    <MdEdit />
                  </Link>
                </p>
              </div>
            </div>
            <div className="customer-info ">
              {/* <div className="info-icon ">Info</div> */}
              <div className="customer-detail ">
                <h3> {orders?.[0]?.vehicle_make}</h3>
                <p>
                  <b>Color: {orders?.[0]?.vehicle_color}</b>
                </p>
                <p>
                  <b>vehicle tag: {orders?.[0]?.vehicle_tag}</b>
                </p>
                <p>
                  <b>vehicle type: {orders?.[0]?.vehicle_type}</b>
                </p>
                <p>
                  <b>Vehicle mileage: {orders?.[0]?.vehicle_mileage}</b>
                </p>
                <p>
                  <b>Vehicle serial: {orders?.[0]?.vehicle_serial}</b>
                </p>
                <p>
                  <b>Edit vehicle info:</b> edit{" "}
                  <Link
                    style={{ color: "blue" }}
                    to={`/admin/vehicle/edit/${orders?.[0]?.vehicle_id}`}
                  >
                    <MdEdit />
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3>Requested Service</h3>
            {orders?.[0]?.orderServices?.map((service) => (
              <Card className="m-lg-2" key={service.service_id}>
                <Card.Title className="px-lg-3 pt-3">
                  <h4>{service.serviceName}</h4>
                </Card.Title>
                <Card.Body className="service">
                  <div className="service-description">
                    {service.serviceDescription}
                    {order_status == 1 ? (
                      <button
                        type="submit"
                        className="btn btn-primary customer-completed"
                      >
                        Completed
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary customer-pending"
                      >
                        In Progress
                      </button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>

          <div className="m-lg-2">
            <div className="form-group">
              <h5>Additional Information</h5>
              <h6>
                Additional request:
                <span>{orders?.[0]?.orderServices?.[0]?.serviceName}</span>{" "}
              </h6>
            </div>

            <div className="form-group">
              <h6>Order Date:{orders?.[0]?.order_date}</h6>
              <h6>Estimation Completion Date:</h6>
              <h6>Total Price: {orders?.[0]?.order_total_price}</h6>
            </div>

            {order_status == 1 ? (
              <button type="submit" className="btn btn-primary completed">
                Completed
              </button>
            ) : (
              <button type="submit" className="btn btn-primary pending">
                In Progress
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetail;
