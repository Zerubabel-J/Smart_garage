import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
// import customer service

import orderService from "../../../services/order.service";

import { format } from "date-fns";

// import userParams, useNavigate, Link and useParams from react-router-dom
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../../Contexts/AuthContext";
// import useAuth
// import the css file
// import "./OrderDetail.css";

const CustomerOrderDetial = () => {
  const [orders, setOrders] = useState([]);
  const { employee } = useAuth();
  // api error
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const navigate = useNavigate();
  // let { order_id, order_status } = useParams();
  let { order_hash } = useParams();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const order = await orderService.getOrderDetailByOrderHash(order_hash);
        setOrders(order);
      } catch (error) {
        console.error("Error fetching customer data:", error.message);
        setApiError(true);
        setApiErrorMessage(error.message);
      }
    };

    fetchCustomerData();
    orderStateUpdater();
  }, [order_hash]);

  console.log("Customerrr Detailllll", orders);
  const orderStateUpdater = async () => {
    let order_status = orders?.[0]?.order_status;
    let serviceLength = orders?.[0]?.orderServices.length;
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
  console.log("Orders detail here lastttt", orders);
  console.log(
    "Orders detail here lastttt",
    orders?.[0]?.orderServices[0].service_completed === 1
  );
  return (
    <>
      {apiError ? (
        <div>Error: {apiErrorMessage}</div>
      ) : (
        <>
          <div className="container-fluid customer-profile">
            <div className=" ml-4 pb-0  d-flex order-danger ">
              <div className=" ml-4 p-  ">
                <div className="contact-title ">
                  <div className=" ml-4 pb-0  d-flex order-danger ">
                    <div className=" ml-4 p-  ">
                      <div className="contact-title ">
                        <div>
                          <h2>
                            Selam :{" "}
                            {orders?.[0]?.customer_first_name +
                              " " +
                              orders?.[0]?.customer_last_name}
                          </h2>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                  <span className="text-secondary">
                    {orders?.[0]?.order_id}
                  </span>
                </div>
                <div>
                  <span className="font-weight-bold mr-2">
                    Active Customer:{" "}
                  </span>
                  <span className="text-secondary">
                    {orders?.[0]?.active_customer_status ? "Yes" : "No"}
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
                </div>
              </div>{" "}
            </div>

            {/* #####################3 */}

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
                                    : "text-center rounded-pill bg-warning font-weight-bold px-5"
                                }
                              >
                                {orders?.[0]?.orderServices[index]
                                  .service_completed == 1
                                  ? "Completed"
                                  : "In Progress"}
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

            {/* #####################3 */}

            <div className="contact-section my-0 py-4 pb-4">
              <div className="mr-5  ">
                <div className=" ml-5 pb-0  d-flex order-danger ">
                  <div className=" ml-4 p-3 flex-grow-1 bg-white Regular shadow">
                    <div className="contact-title ">
                      <div>
                        <h2>Additional Information</h2>{" "}
                      </div>

                      <div>
                        <div className="bg-white Regular shadow my-2 d-flex ">
                          <div className="py-4 pb-1 px-4 flex-grow-1 ">
                            <h5 className="mb-1 font-weight-bold ">
                              Order Date:
                              <span className="additional">
                                {new Date(
                                  orders?.[0]?.order_date
                                ).toLocaleString("en-US", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </h5>
                          </div>

                          <div className="d-flex align-items-center px-4"></div>
                        </div>

                        <div className="bg-white Regular shadow my-2 d-flex ">
                          <div className="py-4 pb-1 px-4 flex-grow-1 ">
                            <h5 className="mb-1 font-weight-bold ">
                              Additional Request:
                              <span className="additional">
                                {orders?.[0]?.orderServices?.[0]?.serviceName}
                              </span>
                            </h5>
                          </div>

                          <div className="d-flex align-items-center px-4"></div>
                        </div>

                        <div className="bg-white Regular shadow my-2 d-flex ">
                          <div className="py-4 pb-1 px-4 flex-grow-1 ">
                            <h5 className="mb-1 font-weight-bold ">
                              order Price:
                              <span className="additional">
                                {" "}
                                ${orders?.[0]?.order_total_price}
                              </span>
                            </h5>
                          </div>

                          <div className="d-flex align-items-center px-4"></div>
                        </div>

                        <div className=" text-center">
                          {" "}
                          <h6
                            className={
                              orders?.[0]?.order_status
                                ? "text-center rounded-pill bg-success font-weight-bold text-white py-2 py-2"
                                : "text-center rounded-pill bg-warning font-weight-bold px-3 py-2"
                            }
                          >
                            {orders?.[0]?.order_status
                              ? "Completed"
                              : "In Progress"}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomerOrderDetial;
