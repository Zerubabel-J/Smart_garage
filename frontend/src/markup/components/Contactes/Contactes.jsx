import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
function Contactes() {
  return (
    <section className="about-section">
      <div className="auto-container">
        <div className="row">
          <div className="col-lg-6">
            <div className="image-box">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31523.80380701426!2d38.712689898073435!3d9.020316224195062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b860b3a4e6733%3A0x3ae74ad7c1cd9d1e!2sAbinet%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1711117652523!5m2!1sen!2set"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="col-lg-6 pl-lg-5">
            <div className="sec-title">
              <h2>Our Address</h2>
              <h4>
                Completely synergize resource Professionally cultivate
                one-to-one customer service.
              </h4>
            </div>

            <div className="text">
              {" "}
              <CiLocationOn color="red" />
              Address:
              <p>Addis Ababa,Ethipia</p>
              <MdOutlineEmail color="red" />
              Email:
              <p>abegarage@net.et</p>
              <FaPhoneAlt color="red" />
              <p>+251-11-555-987</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Contactes;
