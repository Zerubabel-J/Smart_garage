import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { FaHandPointUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import customerService from "../../../../services/customer.service";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.data.customer_token;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCustomers = await customerService.getAllCustomer();
        console.log("Got it, man", allCustomers.data[0].customer_id);

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

        const data = allCustomers.data;
        console.log("Customers List", data);
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setApiError(true);
        setApiErrorMessage("Please try again later");
      }
    };

    fetchData();
  }, []);

  // Log customers whenever it changes
  useEffect(() => {
    console.log("Customers updated:", customers);
  }, [customers]);

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
                <h2>Customers</h2>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added date</th>
                    <th>Active</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.customer_id}>
                      <td>{customer.customer_id}</td>
                      <td>{customer.customer_first_name}</td>
                      <td>{customer.customer_last_name}</td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone}</td>
                      <td>
                        {format(
                          new Date(customer.customer_added_date),
                          "MM - dd - yyyy | kk:mm"
                        )}
                      </td>
                      <td>{customer.active_customer ? "Yes" : "No"}</td>
                      <td>
                        <div className="edit-delete-icons">
                          <Link
                            style={{ color: "blue" }}
                            to={`/admin/customer/edit/${customer.customer_id}`}
                          >
                            <MdEdit />
                          </Link>
                          <Link
                            style={{ color: "blue" }}
                            to={`/admin/customer/get/${customer.customer_id}`}
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
          </section>
        </>
      )}
    </>
  );
};

export default CustomersList;