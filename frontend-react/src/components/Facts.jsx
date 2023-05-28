import React from 'react'

function Facts() {
  return (
    <section className="about-facts">
        <div className="container">
            <div className="about-fact-content">
                <h3>Fast facts</h3>
                <div className="row">
                    
                    <div className="col-md-3 ">
                        <div className="fact-box">
                            <h4>2K+</h4>
                            <p>Patients</p>
                            <span className="d-block">as of March 31, 2022</span>
                        </div>
                    </div>

                    <div className="col-md-3 ">
                        <div className="fact-box">
                            <h4>2K+</h4>
                            <p >Donors</p>
                            <span className="d-block">as of March 31, 2022</span>
                        </div>
                    </div>

                    <div className="col-md-3 ">
                        <div className="fact-box">
                            <h4>2K+</h4>
                            <p>Requests</p>
                            <span className="d-block">as of March 31, 2022</span>
                        </div>
                    </div>

                    <div className="col-md-3 ">
                        <div className="fact-box">
                            <h4>2K+</h4>
                            <p>Events Accomplished</p>
                            <span className="d-block">as of March 31, 2022</span>
                        </div>
                    </div>

                </div>
               
            </div>

        </div>
    </section>
  )
}

export default Facts