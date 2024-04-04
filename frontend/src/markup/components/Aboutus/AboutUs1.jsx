import React from "react";
import about from "../../../assets/images/custom/servicep.png";
function AboutUs1() {
  return (
    <section className="about-section">
      <div className="auto-container">
        <div className="row">
          <div className="col-lg-7 pl-lg-5">
            <div className="sec-title">
              <h3>We are highly skilled mechanics for your car repair</h3>
            </div>

            <div className="text">
              <p>
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation X is on the runway
                heading towards a streamlined cloud solution. User generated
                content in real-time will have multiple touchpoints for
                offshoring. Capitalize on low hanging fruit to identify a
                ballpark value added activity to beta test. Override the digital
                divide with additional clickthroughs from DevOps. Nanotechnology
                immersion along the information highway will close the loop on
                focusing.
              </p>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="image-box">
              <img src={about} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs1;
