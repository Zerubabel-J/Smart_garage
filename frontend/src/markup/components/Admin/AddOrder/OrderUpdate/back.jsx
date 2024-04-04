// export default OrderUpdate;

import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import orderService from "../../../../../services/order.service";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../../../../Contexts/AuthContext";
import "./OrderUpdate.css";

const OrderUpdate = () => {
  const [orders, setOrders] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { order_id, order_status } = useParams();

  console.log("order_status", order_status);

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

  const handleServiceSelection = (serviceId) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.includes(serviceId)
        ? prevSelectedServices.filter((id) => id !== serviceId)
        : [...prevSelectedServices, serviceId]
    );
  };

  const handleOrderUpdating = async (e) => {
    try {
      e.preventDefault();
      const orderStatus = selectedServices.length > 0 ? 1 : 0; // If any service is selected, order status is considered completed (1), otherwise, it's pending (0)

      const loggedInEmployeeToken = localStorage.getItem("token");
      const updated = await orderService.updateOrder(
        order_id,
        { order_status: orderStatus },
        loggedInEmployeeToken
      );
      console.log("Update info", updated);
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
        <div className="container-fluid customer-profile">
          <div className="container-fluid customer-profile">
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
                  <b>Active Customer: {orders?.[0]?.active_customer_status}</b>
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
            <h1>Update Status</h1>
            {orders?.[0]?.orderServices?.map((service) => (
              <Card className="m-lg-2" key={service.service_id}>
                <Card.Title className="px-lg-3 pt-3">
                  <h4>{service.serviceName}</h4>
                </Card.Title>
                <Card.Body className="service">
                  <div className="service-description">
                    {service.serviceDescription}
                    <input
                      type="checkbox"
                      value={service.service_id}
                      checked={selectedServices.includes(service.service_id)}
                      onChange={() =>
                        handleServiceSelection(service.service_id)
                      }
                    />
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleOrderUpdating}
          >
            Pending
          </button>
        </div>
      )}
    </>
  );
};

export default OrderUpdate;