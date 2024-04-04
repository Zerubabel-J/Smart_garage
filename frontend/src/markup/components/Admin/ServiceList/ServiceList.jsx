import React, { useState, useEffect } from "react";
import { AlertLink, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "./ServiceList.css";
const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }

  // useEffect(() => {
  //   const allService = serviceService.getAllServices();
  //   allService
  //     .then((res) => {
  //       if (!res.ok) {
  //         setApiError(true);
  //         if (res.status === 401) {
  //           setApiErrorMessage("Please login again");
  //         } else if (res.status === 403) {
  //           setApiErrorMessage("You are not authorized to view this page");
  //         } else {
  //           setApiErrorMessage("Please try again later");
  //         }
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       if (data.data.length !== 0) {
  //         setServices(data.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allService = await serviceService.getAllServices();
        if (allService.length) {
          setServices(allService);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchService = () => {
    const result = services.filter((service) =>
      service.service_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return result;
  };

  const searchResult = searchService();
  const displayedServices = searchResult.slice(0, 10);

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Service we provide</h2>
                <div className="text">
                  <p>
                    Bring to the table win-win survival strategies to ensure
                    proactve domination. At the end of the day, going forward, a
                    new normal that has evolved from generation X is on the
                    runway heading towards a streamlined cloud solution.
                  </p>
                </div>
              </div>
              <Form>
                <Form.Group controlId="searchTerm" className="contact-form">
                  <Form.Control
                    className="form-group"
                    type="text"
                    placeholder="Search for service using service name"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </Form.Group>
              </Form>

              <div>
                {displayedServices.map((service) => (
                  <Card className=" m-lg-2 " key={service.service_id}>
                    <Card.Title className=" px-lg-3  pt-3  ">
                      <h4>{service.service_name}</h4>
                    </Card.Title>
                    <Card.Body className="service">
                      <div>{service.service_description}</div>

                      <div className="edit-delete-icons-sevice">
                        <Link to={`/admin/service/${service.service_id}`}>
                          <FaEdit size={20} />
                        </Link>
                        <RiDeleteBin5Fill size={20} color="red" />
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ServiceList;