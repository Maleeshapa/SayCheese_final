import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';

function Home() {
  return (
    
    <div className="bgHome">
      <Navbar/>
      <div className='container'>
        <div className='row'>

          <div className='col colOne col-6 fade-up'>
            <h1 className='homeh1'>Stay Steady <br /><b>Say Cheese !</b></h1>
            <p className='homeP'>Capture the perfect moments with us!</p>
            <button type="button" className="btn btn-primary fade-up mr-2">
              <a href="/Category" className="btn btn-primary ">Select Category</a>
            </button>
            {' '}
            <button type="button" className="btn btn-secondary fade-up mr-2">
              <Link to="/Booking" className="btn btn-secondary">Book a Date</Link>
            </button>
            <br /><br />
          </div>

          <div className='col colTwo col-6 fade-up'>
            <Carousel/>
          </div>

        </div>
      </div>
      
    </div>
    
  );
}

export default Home;
