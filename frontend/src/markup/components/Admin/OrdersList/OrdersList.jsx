import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import ordersService from "../../../../services/order.service";
import Loader from "../../Loader/Loader";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderInfo = await ordersService.getOrderInformation();
        setOrders(orderInfo);
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching orders:", error);
        setApiError(true);
        setApiErrorMessage("Please try again later");
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? ( // Check if loading, show loader if true
        <Loader />
      ) : apiError ? ( // If not loading, check for API error
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2 style={{ color: "red" }}>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
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
              <tbody className="text-center">
                {orders.map((order) => (
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

                    <td
                      className={
                        order.order_status
                          ? "text-center badge rounded-pill bg-success text-white"
                          : "text-center badge rounded-pill bg-warning"
                      }
                      style={{ display: "inline-block", padding: "5px" }}
                    >
                      {order.order_status ? "completed" : "in progress"}
                    </td>

                    <td>
                      <div className="edit-delete-icons">
                        <Link to={`/customer/orderdetails/${order.order_hash}`}>
                          <FaArrowUpRightFromSquare />
                        </Link>
                        <Link
                          to={`/admin/order-update/${order.order_id}/${order.order_hash}`}
                        >
                          <FaEdit />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      )}
    </>
  );
};

export default OrdersList;
