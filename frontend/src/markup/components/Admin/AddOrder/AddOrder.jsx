import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { FaHandPointUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import orderService from "../../../../services/order.service";

// import the addOrder.css file
import "./addOrder.css";

const AddOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.data.customer_token;
  }

  // write a function to handle customer search
  const handleSearch = async () => {
    try {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return; // Exit early if searchTerm is empty
      }
      const response = await orderService.searchCustomers(searchTerm);
      setSearchResults(response.data);
      console.log("Responssss search", response.data);
    } catch (error) {
      setApiErrorMessage(error.message);
      setApiError(true);
      // Handle error
      console.error("Error searching for customers:", error.message);
    }
  };

  // useEffect to execute handleSearch on searchTerm change
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <>
      <input
        type="text"
        placeholder="Search by first name, last name, email, or phone number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {/* <button>Search</button> */}

      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2 style={{ color: "red" }}>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        searchResults.length > 0 && ( // Conditional rendering
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
                  {searchResults.map((customer) => (
                    <tr key={customer.customer_id}>
                      <td>{customer.customer_id}</td>
                      <td>{customer.customer_first_name}</td>
                      <td>{customer.customer_last_name}</td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone_number}</td>
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
                            to={`/admin/customer-vehicle/get/${customer.customer_id}`}
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
        )
      )}
    </>
  );
};

export default AddOrder;
