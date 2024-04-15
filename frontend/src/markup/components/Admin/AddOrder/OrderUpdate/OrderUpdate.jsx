import React, { useState, useEffect } from "react";
import orderService from "../../../../../services/order.service";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../../../../Contexts/AuthContext";
import "./OrderUpdate.css";
const OrderUpdate = () => {
  const [orders, setOrders] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceLists, setOrderServices] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const navigate = useNavigate();
  let { order_id } = useParams();
  // let [magic, setOrderStatus] = useState(0);
  let magic = 0;
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

  const handleServiceSelection = (serviceId, isChecked) => {
    try {
      setSelectedServices((prevSelectedServices) => {
        if (isChecked) {
          // If checked, add the serviceId
          return [...prevSelectedServices, serviceId];
        } else {
          // If unchecked, remove the serviceId
          return prevSelectedServices.filter((id) => id !== serviceId);
        }
      });
    } catch (error) {
      setApiError(true);
      setApiErrorMessage(error.message);
    }
  };

  const updateOrderServiceStatusById = async (serviceId, status) => {
    try {
      await orderService.updateOrderServiceStatusById(serviceId, status);
      // await orderStateUpdater();
      console.log(`Service ${serviceId} status updated successfully.`);
    } catch (error) {
      console.error(
        `Error updating service ${serviceId} status:`,
        error.message
      );
      throw error;
    }
  };

  const handleOrderUpdating = async (e) => {
    try {
      e.preventDefault();
      console.log("Current Orders??......", orders);
      // Iterate over selected services to update their statuses
      for (const serviceId of selectedServices) {
        const service_completed = {
          service_completed: 1,
        };
        await updateOrderServiceStatusById(serviceId, service_completed);
      }
      // await orderStateUpdater();
      const services = await orderService.getOrderServiceById(order_id);
      setOrderServices(services);
      console.log("Order Services###55ssssssssss", services);
      console.log("Here is...???????", magic);
      let allCompleted = services.every(
        (service) => service.service_completed === 1
      );
      console.log(allCompleted);
      if (allCompleted) {
        // setOrderStatus(1);
        magic = 1;
        console.log("updatedddddd", magic); // Set order_status to 1 if all services are completed
      } else {
        magic = 0;
        // setOrderStatus(0);
        console.log(magic);
        fetchCustomerData();
        console.log(
          "Some services are not completed and the status is ",
          magic
        );
      }
      // Update the order status resdf
      const loggedInEmployeeToken = localStorage.getItem("token");
      const updated = await orderService.updateOrder(
        order_id,
        {
          order_status: magic,
        },
        loggedInEmployeeToken
      );
      fetchCustomerData();
      // navigate("/admin/orders");
    } catch (error) {
      console.error("Error updating order:", error.message);
      fetchCustomerData();
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
                                  {/* <input
                                    type="checkbox"
                                    value={service.service_id}
                                    checked={selectedServices.includes(
                                      service.service_id
                                    )}
                                    onChange={() =>
                                      handleServiceSelection(service.service_id)
                                    }
                                  /> */}
                                  <input
                                    type="checkbox"
                                    onChange={(e) =>
                                      handleServiceSelection(
                                        service.service_id,
                                        e.target.checked
                                      )
                                    }
                                    checked={selectedServices.includes(
                                      service.service_id
                                    )}
                                  />
                                  {console.log(
                                    "Selectedddd sreviceddd",
                                    selectedServices
                                  )}
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
          {console.log("Order Statusss", orders?.[0]?.order_status)}
          {orders?.[0]?.order_status == 1 ? (
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
              Update
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default OrderUpdate;
