import React from "react";
import bgi from "../../assets/images/10003.jpg";
import image1 from "../../assets/images/10003.jpg";
import image2 from "../../assets/images/10001_2.jpg";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      {/* <!-- Video Section --> */}
      <section className="video-section">
        <div
          data-parallax={{ y: 50 }}
          className="sec-bg"
          style={{ backgroundImage: `url(${bgi})` }}
        ></div>
        <div className="auto-container">
          <h5>Working since 1992</h5>
          <h2>
            Tuneup Your Car <br /> to Next Level
          </h2>
          <div className="video-box">
            <div className="video-btn">
              <a
                href="/"
                className="overlay-link lightbox-image video-fancybox ripple"
              >
                <i className="flaticon-play"></i>
              </a>
            </div>
            <div className="text">
              Watch intro video <br /> about us
            </div>
          </div>
        </div>
      </section>
      {/* <!-- About Us --> */}
      <section className="about-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-5">
              <div className="image-box">
                <img src={image1} alt="" />
                <img src={image2} alt="" />
                <div className="year-experience" data-parallax='{"y": 30}'>
                  <strong>24</strong> years <br />
                  Experience{" "}
                </div>
              </div>
            </div>
            <div className="col-lg-7 pl-lg-5">
              <div className="sec-title">
                <h5>Welcome to Our workshop</h5>
                <h2>We have 24 years experience</h2>
                <div className="text">
                  <p>
                    Bring to the table win-win survival strategies to ensure
                    proactive domination. At the end of the day, going forward,
                    a new normal that has evolved from generation X is on the
                    runway heading towards a streamlined cloud solution. User
                    generated content in real-time will have multiple
                    touchpoints for offshoring.
                  </p>
                  <p>
                    Capitalize on low hanging fruit to identify a ballpark value
                    added activity to beta test. Override the digital divide
                    with additional clickthroughs from DevOps. Nanotechnology
                    immersion along the information highway will close the loop
                    on focusing.
                  </p>
                </div>
                <div className="link-btn mt-40">
                  <Link
                    to={"/about"}
                    className="theme-btn btn-style-one style-two"
                  >
                    <span>
                      About Us <i className="flaticon-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
