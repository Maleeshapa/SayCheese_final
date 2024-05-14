import './style.css';
import './responsive.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from './Dashboard header';
import Sidebar from './sidebar';


function Users() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8081/users')
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
                <h1 className="recent-Articles">User Logins</h1>
                <Link to='/Create' className='btn btn-success'>Create User +</Link>
              </div>

              <div className="report-body">
                <div className="report-topic-heading">
                  <table className="table table-striped " style={{width:"100%"}} >
                    <thead>
                      <tr>
                        
                        <th scope="col " style={{width:"40%"}}>Email</th>
                        <th scope="col " style={{width:"40%"}}>Nic</th>
                        
                        
                        
                        
                      </tr>
                    </thead>
                    <tbody >
                    {data.map((users, index) => (
                      <tr key={index}>
                        
                        
                        <td> {users.Email}</td>
                        <td> {users.Nic}</td>
                        
                        
                        
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

export default Users;
