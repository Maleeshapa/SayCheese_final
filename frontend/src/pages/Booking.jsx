import React, { useState,useEffect, useRef  } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Booking() {

  const [values, setValues] = useState({
    
    name: '',
    email: '',
   
    nic: '',
    type: '',
    date:'',
    message: '',
  });
  const [bookingStatus, setBookingStatus] = useState(null);
  const nicRef = useRef(null);
  const confirmNicRef = useRef(null);

  useEffect(() => {
    const nicInput = nicRef.current;
    const confirmNicInput = confirmNicRef.current;

    function validateNic() {
      if (nicInput.value !== confirmNicInput.value) {
        confirmNicInput.setCustomValidity("Nic Don't Match");
      } else {
        confirmNicInput.setCustomValidity('');
      }
    }

    nicInput.addEventListener('change', validateNic);
    confirmNicInput.addEventListener('keyup', validateNic);

    return () => {
      nicInput.removeEventListener('change', validateNic);
      confirmNicInput.removeEventListener('keyup', validateNic);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/Booking', values)
      .then(res => {
        console.log(res);
        setBookingStatus('success');
        sendEmail();
      })
      .catch(err => {
        console.log(err);
        setBookingStatus('error');
        setBookingStatus('error');
      });
  };

  const sendEmail = () => {
    const {  name, email, phone, nic, type, date, message } = values;
    axios.post('http://localhost:8081/send-email', {  name, email, phone, nic, type, date, message })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error('Error sending email:', err);
      });
  };


  return (
    <div className='bgBooking'>
      <Navbar />

      <div className='container'>
        <div className="row ">
          

          <div className='col-md-6 bookForm formBook fade-up' style={{ animationDelay: '0.5s' }} >
            

              <form onSubmit={handleSubmit}><div className="border rounded p-4 formO">
              <h3>Hurry! Book Your Day.</h3>
                <div className="form-group row mb-4 mt-4">
                  <label htmlFor="name" className="col-sm-2 col-form-label">Name:</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="name" placeholder="Your Name"  onChange={e => setValues({ ...values, name: e.target.value })} />
                  </div>
                </div>

                <div className="form-group row mb-4">
                  <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                  <div className="col-sm-10">
                    <input type="email" className="form-control" id="email" placeholder="Enter Your Email"  onChange={e => setValues({ ...values, email: e.target.value })} />
                  </div>
                </div>

                <div className="form-group row mb-4">
                  <label htmlFor="phone" className="col-sm-2 col-form-label">Phone:</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="phone" placeholder="Enter Your Phone" onChange={e => setValues({ ...values, phone: e.target.value })} required/>
                  </div>
                </div>

                <div className="form-group row mb-4">
                  <label htmlFor="nic" className="col-sm-2 col-form-label">NIC:</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="nic" placeholder="Your NIC" required ref={nicRef} onChange={e => setValues({ ...values, nic: e.target.value })} />
                   <br /> <input type="text" className="form-control" id="confirm_nic" placeholder="Re-Enter your NIC"  required ref={confirmNicRef} />
                  </div>
                </div>



                <div className="form-group row mb-4">
                  <label htmlFor="type" className="col-sm-2 col-form-label">Type:</label>
                  <div className="col-sm-10">
                    <select className="form-control" id="type" name="type" required  onChange={e => setValues({ ...values, type: e.target.value })} >
                      <option value="">Select Photography Type</option>
                      <option value="wedding">Wedding Photography</option>
                      <option value="portrait">Portrait Photography</option>
                      <option value="street">Street Photography</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row mb-4">
                  <label htmlFor="date" className="col-sm-2 col-form-label">Date:</label>
                  <div className="col-sm-10">
                    <input type="date" className="form-control" id="date" placeholder="Select Date" onChange={e => setValues({ ...values, date: e.target.value })} />
                  </div>
                </div>

               
                <div className="form-group row mb-4">
                  <label htmlFor="message" className="col-sm-2 col-form-label">Message:</label>
                  <div className="col-sm-10">
                    <textarea className="form-control" id="message" name="message" rows="2"  onChange={e => setValues({ ...values, message: e.target.value })} ></textarea>
                  </div>
                  </div>
                <button type="submit" className="btn btn-primary">Confirm</button> {'  '}
                <button type="reset" className="btn btn-secondary" >Clear</button>
                {' '}
                </div>
              </form>
              <br />
              {/* Alert message */}
              {bookingStatus && (
                <div className="message">
                  {bookingStatus === 'success' ? (
                    <div>
                    <div className="alert alert-success" role="alert">
                      Booking is done.
                      </div>
                      <div className="alert alert-danger" role="alert">
                      If you change your mind,  <Link to="/Login">log in</Link> to cancel booking.
                    </div>
                      </div>
                    
                  ) : (
                    <div>
                    <div className="alert alert-success" role="alert">
                      {`Welcome Back ${values.name}! Booking is done.`}
                    </div>
                    <div className="alert alert-danger" role="alert">
                      If you change your mind,  <Link to="/Login">log in</Link> to cancel booking.
                    </div>
                  </div>
                    
                    
                  )}
                </div>
              )}
             
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Booking;