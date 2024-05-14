import React from 'react';
import aboutTwo from '../images/About 4.png';
import Navbar from '../components/Navbar';

export const About = () => {
  return (
    <div className='bgAbout'>
      <Navbar />
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-md-6 fade-up ' style={{ animationDelay: '0.5s' }}>
            <div>
              <img className='imgOne' src={aboutTwo} alt='owner' />
            </div>
          </div>
          <div className='col-6 col-md-6 aboutCol fade-up text-center'>
          <p className='bookingH1'>Shashini Rathnayake</p>
            <h2 className='aboutH'>Contact Us ASAP!</h2>
            <p><i className="bi bi-facebook"></i> Facebook</p>
            <p><i className="bi bi-instagram"></i> Instagram</p>
            <br />
            <h4 className='aboutH'>Email Address</h4>
            <p><i className="bi bi-envelope-at-fill"></i> hello@gmail.com</p>
            <br />
            <h4 className='aboutH'>Phone Number</h4>
            <p><i className="bi bi-telephone-forward-fill"></i> 123 456 789</p>
          </div>




        </div>
      </div>
    </div>
  )
}
