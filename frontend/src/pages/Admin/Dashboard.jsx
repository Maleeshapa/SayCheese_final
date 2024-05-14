import './style.css';
import './responsive.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from './Dashboard header';
import Sidebar from './sidebar';



function Dashboard() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8081/bookingdetails')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/delete/${id}`)
      .then(res => {
        console.log(res.data);
        fetchData(); // Fetch updated data after successful deletion
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="dashboard">
      <Header />

      <div className="content">
        <Sidebar />

        <div className="main-container">

          <div className="main">
            

            <div className="report-container" >
              <div className="report-header">
                <h1 className="recent-Articles">Booking Details</h1>
                <Link to='/create' className='btn btn-success'>Create New +</Link>
              </div>

              <div className="report-body">
                <div className="report-topic-heading">
                  <table className="table table-striped " style={{width:"100%"}} >
                    <thead>
                      <tr>
                        <th scope="col " style={{width:"5%"}}>ID</th>
                        <th scope="col " style={{width:"20%"}}>Name</th>
                        <th scope="col " style={{width:"20%"}}>Email</th>
                        <th scope="col " style={{width:"20%"}}>Nic</th>
                        <th scope="col " style={{width:"10%"}}>Type</th>
                        <th scope="col " style={{width:"15%"}}>Date</th>
                        <th scope="col " style={{width:"10%"}}>Message</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody >
                    {data.map((bookingdetails, index) => (
                      <tr key={index}>
                        <td> {bookingdetails.id}</td>
                        <td>{bookingdetails.Name} </td>
                        <td> {bookingdetails.Email}</td>
                        <td> {bookingdetails.Nic}</td>
                        <td> {bookingdetails.Type}</td>
                        <td> {bookingdetails.Date}</td>
                        <td> {bookingdetails.Message}</td>
                        <td>
                        <button onClick={() => handleDelete(bookingdetails.id)} className='btn btn-sm btn-danger'>Delete</button>{' '}
                        </td>
                      </tr>
                    ))}
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
