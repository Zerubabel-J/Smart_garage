import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import Order from "../../../../services/order.service";
import { Link } from "react-router-dom";
// import the date-fns library
import { format } from "date-fns";

function OrderDetail() {
  const [orders, setOrders] = useState("");
  const [orderServices, setOrderServices] = useState([]);

  const { order_id } = useParams();

  // console.log(orders);

  async function fetchData() {
    try {
      const data = await Order.getOrderDetail(order_id);

      console.log(data);
      setOrders(data[0]);
      setOrderServices(data[0].orderServices);
      console.log(data[0].orderServices);

      // setVehicleError("");
    } catch (error) {
      console.log(error);
    }
  }

  // call the fetchData in useEffect
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="contact-section pb-5 ">
      {/*  */}

      {/*order details*/}
      <div className=" ml-4 pb-0  d-flex order-danger ">
        <div className=" ml-4 p-  ">
          <div className="contact-title ">
            <div>
              <h2>
                Selam :{" "}
                {orders.customer_first_name + " " + orders.customer_last_name}
              </h2>{" "}
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
            <span className="text-secondary">{orders.order_id}</span>
          </div>
          <div>
            <span className="font-weight-bold mr-2">Active Customer: </span>
            <span className="text-secondary">
              {orders?.[0]?.active_customer_status ? "Yes" : "No"}
            </span>
          </div>
          <div>
            <span className="font-weight-bold mr-2">Edit customer info </span>
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
              <span className="text-secondary">{orders?.[0]?.vehicle_tag}</span>
            </div>
            <div>
              <span className="font-weight-bold mr-2">Year :</span>
              <span className="text-secondary">
                {orders?.[0]?.vehicle_year}
              </span>
            </div>
            <div>
              <span className="font-weight-bold mr-2">Vehicle mileage :</span>
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
              <span className="font-weight-bold mr-2">Edit vehicle info </span>
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

      {/* Requested Services  */}
      <div className="contact-section my-0 py-4 pb-4">
        <div className="mr-5  ">
          <div className=" ml-5 pb-0  d-flex order-danger ">
            <div className=" ml-4 p-3 flex-grow-1 bg-white Regular shadow">
              <div className="contact-title " key={orderServices.order_id}>
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

      {/* Additional Information */}
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
                          {format(
                            new Date(orders?.[0]?.order_date),
                            "MM - dd - yyyy | kk:mm"
                          )}
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
                        order_status == 1
                          ? "text-center rounded-pill bg-success font-weight-bold text-white py-2 py-2"
                          : "text-center rounded-pill bg-warning font-weight-bold px-3 py-2"
                      }
                    >
                      {orders.order_status ? "Completed" : "In Progress"}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetail;
