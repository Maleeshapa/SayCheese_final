import './style.css';
import './responsive.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from './Dashboard header';
import Sidebar from './sidebar';


function AlbumUpload() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8081/bookingdetails')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  

  return (
    <div className="dashboard">
      <Header />

      <div className="content">
        <Sidebar />

        <div className="main-container">

          <div className="main">
           

            <div className="report-container">
              <div className="report-header">
                <h1 className="recent-Articles">Album</h1>
                
              </div>

              <div className="report-body">
                <div className="report-topic-heading">
                  <table className="table table-striped " style={{width:"100%"}} >
                    <thead>
                      <tr>
                        <th scope="col " style={{width:"5%"}}>ID</th>
                        <th scope="col " style={{width:"10%"}}>Name</th>
                        <th scope="col " style={{width:"10%"}}>Email</th>
                        
                        <th scope="col " style={{width:"10%"}}>Type</th>
                        <th scope="col " style={{width:"15%"}}>Date</th>
                        
                        <th scope="col " style={{width:"25%"}}>Album URL</th>
                        <th> Action</th>
                      </tr>
                    </thead>
                    <tbody >

                    {data.map((bookingdetails, index) => (
                      <tr key={index}>
                        <td> {bookingdetails.id}</td>
                        <td>{bookingdetails.Name} </td>
                        <td> {bookingdetails.Email}</td>
                        
                        <td> {bookingdetails.Type}</td>
                        <td> {bookingdetails.Date}</td>
                        <td><a href={`http://${bookingdetails.Download}`} >{bookingdetails.Download}</a></td>
                        
                        <td>
                        <Link to={`/update/${bookingdetails.id}`} className='btn btn-success'>Add URL</Link>{' '}
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

export default AlbumUpload;
