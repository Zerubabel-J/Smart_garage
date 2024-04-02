import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { FaHandPointUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import ordersService from "../../../../services/order.service";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.data.customer_token;
    console.log("what is whith in employee", employee);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderInfo = await ordersService.getOrderInformation();
        console.log("Orders it, man", orderInfo);

        // if (allCustomers.status !== 200) {
        //   // Using status code directly
        //   console.log("heyyyyyyy");
        //   console.log(allCustomers.status);
        //   setApiError(true);
        //   if (allCustomers.status === 401) {
        //     setApiErrorMessage("Please login again");
        //   } else if (allCustomers.status === 403) {
        //     setApiErrorMessage("You are not authorized to view this page");
        //   } else {
        //     setApiErrorMessage("Please try again later");
        //   }
        //   return;
        // }

        setOrders(orderInfo);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setApiError(true);
        setApiErrorMessage("Please try again later");
      }
    };

    fetchData();
  }, []);

  // Log customers whenever it changes
  // useEffect(() => {
  //   console.log("Customers updated:", orders);
  // }, [orders]);

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2 style={{ color: "red" }}>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Orders</h2>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Order Date</th>
                    <th>Received by</th>
                    <th>Order Status</th>
                    <th>View/Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order.order_id}>
                      <td>{order.order_id}</td>
                      <td>
                        <h4>{order.customer_first_name}</h4>
                        <p>{order.customer_email}</p>
                        <p>{order.customer_phone}</p>
                      </td>
                      <td>
                        <h4>{order.vehicle_make}</h4>
                        <p>{order.vehicle_year}</p>
                        <p>{order.vehicle_tag}</p>
                      </td>
                      <td>
                        {format(
                          new Date(order.order_date),
                          "MM - dd - yyyy | kk:mm"
                        )}
                      </td>
                      <td>{employee.employee_first_name}</td>
                      <td>{order.order_status ? "Yes" : "No"}</td>
                      <td>
                        <div className="edit-delete-icons">
                          <Link
                            style={{ color: "blue" }}
                            to={`/admin/customer/get/${order.order_id}`}
                          >
                            <FaHandPointUp />
                          </Link>
                          <Link
                            style={{ color: "blue" }}
                            to={`/admin/customer/edit/${order.order_id}`}
                          >
                            <MdEdit />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default OrdersList;
