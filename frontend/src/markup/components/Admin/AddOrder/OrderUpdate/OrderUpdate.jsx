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

  useEffect(() => {
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
      console.log("Current Orders??......", orders);
      // // Check if all services are selected
      // const allServicesSelected = orders[0].orderServices.every((service) =>
      //   selectedServices.includes(service.service_id)
      // );

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
      console.log(
        "Checkkkkk",
        orders?.[0]?.orderServices?.[0].service_completed
      );
      console.log("Here is...???????", order_status);
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
      await fetchCustomerData();
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
          {/* ########################## */}
          <div className=" ml-5 pb-0  d-flex order-danger ">
            <div className="bg-white p-4 mr-2 w-100">
              <div className=" d-flex justify-content-between">
                <h4 className="fw-bold font-weight-bold">
                  <span className=" fw-bold mr-2">
                    {orders?.[0]?.customer_first_name}
                  </span>

                  {orders?.[0]?.customer_last_name}
                  <span></span>
                </h4>
              </div>
              <div>
                <span className="font-weight-bold mr-2">Email :</span>
                <span className="text-secondary">
                  {orders?.[0]?.customer_email}
                </span>
              </div>
              <div>
                <span className="font-weight-bold mr-2 ">Phone Number:</span>
                <span className="text-secondary">
                  {orders?.[0]?.customer_phone_number}
                </span>
              </div>
              <div>
                <span className="font-weight-bold mr-2">Order Id: </span>
                <span className="text-secondary">{orders?.[0]?.order_id}</span>
              </div>
              <div>
                <span className="font-weight-bold mr-2">Active Customer: </span>
                <span className="text-secondary">
                  {orders?.[0]?.active_customer_status ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <span className="font-weight-bold mr-2">
                  Edit customer info{" "}
                </span>
                <span>
                  <Link
                    style={{ color: "blue" }}
                    to={`/admin/customer/edit/${orders?.data?.[0]?.customer_id}`}
                  >
                    <MdEdit />
                  </Link>
                </span>
              </div>
            </div>{" "}
            <div className="bg-white p-4 mr-2 w-100">
              <div>
                <div className="d-flex justify-content-between">
                  <h4 className="fw-bold font-weight-bold">
                    <span className="fw-bold mr-2">
                      {orders?.[0]?.vehicle_make}
                    </span>
                  </h4>
                </div>
                <div>
                  <span className="font-weight-bold mr-2">Color :</span>
                  <span className="text-secondary">
                    {orders?.[0]?.vehicle_color}
                  </span>
                </div>
                <div>
                  <span className="font-weight-bold mr-2">Tag :</span>
                  <span className="text-secondary">
                    {orders?.[0]?.vehicle_tag}
                  </span>
                </div>
                <div>
                  <span className="font-weight-bold mr-2">Year :</span>
                  <span className="text-secondary">
                    {orders?.[0]?.vehicle_year}
                  </span>
                </div>
                <div>
                  <span className="font-weight-bold mr-2">
                    Vehicle mileage :
                  </span>
                  <span className="text-secondary">
                    {orders?.[0]?.vehicle_mileage}
                  </span>
                </div>
                <div>
                  <span className="font-weight-bold mr-2">Serial :</span>
                  <span className="text-secondary">
                    {orders?.[0]?.vehicle_serial}
                  </span>
                </div>
                <div>
                  <span className="font-weight-bold mr-2">
                    Edit vehicle info{" "}
                  </span>
                  <span>
                    <Link
                      style={{ color: "blue" }}
                      to={`/admin/vehicle/edit/${orders?.[0]?.vehicle_id}`}
                    >
                      <MdEdit />
                    </Link>
                  </span>
                </div>
              </div>
            </div>{" "}
          </div>
          {/* ########################## */}

          {/* <div>
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
          </div> */}

          <div className="contact-section my-0 py-4 pb-4">
            <div className="mr-5  ">
              <div className=" ml-5 pb-0  d-flex order-danger ">
                <div className=" ml-4 p-3 flex-grow-1 bg-white Regular shadow">
                  <div className="contact-title ">
                    <div>
                      <h2>Requested Services</h2>{" "}
                    </div>

                    {orders?.[0]?.orderServices?.map((service, index) => (
                      <>
                        <div
                          key={service.service_id}
                          className="bg-white Regular shadow my-2 d-flex "
                        >
                          <div className="py-4 pb-1 px-4 flex-grow-1 ">
                            <h5 className="mb-1 font-weight-bold ">
                              {service.serviceName}
                            </h5>
                            <h6 className=" mb-1 text-secondary">
                              {service.serviceDescription}
                            </h6>
                          </div>
                          <div className="order_status px-5">
                            <h6
                              className={
                                orders?.[0]?.orderServices[index]
                                  .service_completed == 1
                                  ? "text-center rounded-pill bg-success font-weight-bold text-white px-5"
                                  : "text-center rounded-pill  font-weight-bold px-5"
                              }
                            >
                              {orders?.[0]?.orderServices[index]
                                .service_completed == 1 ? (
                                "Completed"
                              ) : (
                                <>
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
                            </h6>
                          </div>
                          <div className="d-flex align-items-center px-4"></div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
