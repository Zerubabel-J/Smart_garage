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
  let { order_id, order_status } = useParams();

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

  const orderStateUpdater = async () => {
    let serviceLength = orders?.[0]?.orderServices?.length;
    console.log("Service Length", serviceLength);
    let allCompleted = true; // Flag to track if all services are completed
    for (let i = 0; i < serviceLength; i++) {
      console.log(i, orders?.[0]?.orderServices?.[i].service_completed);
      if (orders?.[0]?.orderServices?.[i].service_completed === 0) {
        allCompleted = false; // Set flag to false if any service is not completed
        break; // Break loop if any service is not completed
      }
    }
    console.log(allCompleted);
    if (allCompleted) {
      order_status = 1; // Set order_status to 1 if all services are completed
    } else {
      order_status = 0;
      console.log(
        "Some services are not completed and the status is ",
        order_status
      );
    }
  };

  const updateOrderServiceStatusById = async (serviceId, status) => {
    try {
      await orderService.updateOrderServiceStatusById(serviceId, status);
      console.log(`Service ${serviceId} status updated successfully.`);
    } catch (error) {
      console.error(
        `Error updating service ${serviceId} status:`,
        error.message
      );
      throw error;
    }
  };

  const handleServiceSelection = async (serviceId) => {
    try {
      const newSelectedServices = selectedServices.includes(serviceId)
        ? selectedServices.filter((id) => id !== serviceId)
        : [...selectedServices, serviceId];

      setSelectedServices(newSelectedServices);
    } catch (error) {
      setApiError(true);
      setApiErrorMessage(error.message);
    }
  };
  const handleOrderUpdating = async (e) => {
    try {
      e.preventDefault();

      // Check if all services are selected
      const allServicesSelected = orders[0].orderServices.every((service) =>
        selectedServices.includes(service.service_id)
      );

      // let order_status = order_status; // Keep the original order status

      // if (allServicesSelected) {
      //   // If all services are selected, mark order status as completed
      //   order_status = 1;
      // } else {
      //   // If not all services are selected, keep order status unchanged
      //   order_status = 0;
      // }

      // Iterate over selected services to update their statuses
      for (const serviceId of selectedServices) {
        const service_completed = {
          service_completed: 1,
        };
        await updateOrderServiceStatusById(serviceId, service_completed);
      }
      // orderStateUpdater();
      console.log("What is going on", orders?.[0]?.orderServices?.length);
      orderStateUpdater();
      console.log("Here is...", order_status);
      // Update the order status
      const loggedInEmployeeToken = localStorage.getItem("token");
      const updated = await orderService.updateOrder(
        order_id,
        {
          order_status: order_status,
        },
        loggedInEmployeeToken
      );
      console.log("Update info", updated);
      navigate("/admin/orders");
    } catch (error) {
      console.error("Error updating order:", error.message);
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
          <div className="cv-update">
            <div className="customer-info ">
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
                    to={`/admin/customer/edit/${orders?.[0]?.customer_id}`}
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
            <h3>Update Status</h3>
            {orders[0]?.orderServices.map((service, index) => (
              <Card className="m-lg-2" key={service.service_id}>
                <Card.Title className="px-lg-3 pt-3">
                  <h4>{service.serviceName}</h4>
                </Card.Title>
                <Card.Body className="service">
                  <div className="service-description">
                    {orders?.[0]?.orderServices?.[index].service_completed ==
                    1 ? (
                      <h3 className="completed">
                        {service.serviceDescription}
                      </h3>
                    ) : (
                      <>
                        <h6>{service.serviceDescription}</h6>
                        <input
                          type="checkbox"
                          value={service.service_id}
                          checked={selectedServices.includes(
                            service.service_id
                          )}
                          onChange={() =>
                            handleServiceSelection(service.service_id)
                          }
                        />
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
          {/* Update button */}
          {console.log("Order Statusss", order_status)}
          {order_status == 1 ? (
            <button
              type="submit"
              className="btn btn-primary completed"
              onClick={handleOrderUpdating}
            >
              Completed
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary pending"
              onClick={handleOrderUpdating}
            >
              Pending
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default OrderUpdate;
