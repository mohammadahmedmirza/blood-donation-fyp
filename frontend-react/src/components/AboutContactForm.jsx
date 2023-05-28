import React from 'react'

function AboutContactForm() {
    return (
        <section className="send-contact">
            <div className="container">
                <div className='our-miss-content send-contact-content'>
                    <div className='row gx-5'>
                        <div className='col-md-5'>
                            <div className='our-miss-text'>
                                <label className='theme-label-mission'>Contact us</label>
                                <h4>Get in touch with us</h4>
                                <p>
                                    Get in touch with us today to learn more about how we can help you [what the company does for its customers]. We look forward to serving you!
                                    <br/><br/>
                                    Get in touch with us today to learn more about how we can help you [what the company does for its customers]. We look forward to serving you!
                                </p>
                            </div>
                        </div>
                        <div className='col-md-7'>
                            <div className='send-mess'>
                                <h4>Send Us a Message!</h4>
                                <p>If you have any question and need our assistance, kindly submit the form. One of our support agent will get back to you soon!</p>
                                <form className='form-send-mess'>
                                    <div className="row">
                                        <div className="col-md-6"><input type="text" placeholder='Name'/></div>
                                        <div className="col-md-6"><input type="text" placeholder='Subject'/></div>
                                        <div className="col-md-12"><input type="email" placeholder='Email'/></div>
                                    </div>
                                    <textarea cols="10" placeholder='Message'></textarea>
                                    <button type='submit' className='btn-nav'>Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutContactForm