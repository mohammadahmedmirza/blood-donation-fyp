import React from "react";
import blood from "../images/blood3.jpg";

function AboutMission() {
  return (
    <section className="our-mission">
      <div className="container">
        <div className="our-miss-content">
          <div className="row gx-5">
            <div className="col-md-6">
              <div className="our-miss-img">
                <img src={blood} alt="..." />
              </div>
            </div>
            <div className="col-md-6">
              <div className="our-miss-text">
                <label className="theme-label-mission">Our Mission</label>
                <h4>How we work</h4>
                <p>
                  Thalassemia is commonly known to represent Thalassemia Major
                  patients, who are born to two thalassemia minor carriers. Due
                  to lack of awareness before giving birth to a child,
                  Thalassemia is a widespread, genetic disorder especially in
                  Punjab province of Pakistan. However, most thalassemia major
                  patients, if managed properly with regular blood transfusions,
                  can live a long healthy and normal life.
                  <br />
                  The Thalassemia center has currently registered 200 blood
                  transfusion dependent thalassemia patients. To make blood
                  readily available for them at regular fixed intervals, their
                  requests are floated on our website. The website keeps track
                  of volume of respective blood groups required.
                  <br />
                  When a donor signs up, he can set his availability for
                  donation. The donor then visits our center and after blood
                  group confirmation and initial screening, his blood is
                  collected. The donor’s profile is then locked for 2 months
                  before he/she can donate blood again.
                  <br />
                  Through this system, the donor has the leverage to know to
                  which patient his blood was donated too. The donor can choose
                  to repeatedly donate blood to a certain patient in order to
                  adopt them and even request to meet the patient in person,
                  upon the patients approval.
                </p>

                {/* <Link className='btn-nav'>Explore Our Listing</Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMission;
