import './style.css';
import './responsive.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Header from './Dashboard header';
import Sidebar from './sidebar';


function Update() {


    
    const [download, setDownload] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id, { download })
            .then(res => {
                console.log(res);
                navigate('/AlbumUpload');
            })
            .catch(err => console.log(err));
    }





    return (
        <div className="dashboard">
            <Header />

            <div className="content">
                <Sidebar />

                <div className="main-container">

                    <div className="main">
                       

                        <div className="report-container">
                            <div className="report-header">
                                <h1 className="recent-Articles">Upload Album URL</h1>
                                <Link to='/AlbumUpload' className='btn btn-success'>Back</Link>
                            </div>

                            <div className="report-body">
                                <div className="report-topic-heading">
                                <form onSubmit={handleSubmit}>
                                    <table className="table table-striped " style={{ width: "100%" }} >
                                        <thead>
                                            <tr>
                                                
                                                
                                                
                                                <th scope="col " style={{ width: "60%" }}>Album URL</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                           
                                                <tr >
                                                    
                                                    
                                                    
                                                    
                                                    <td> <div className='mb-2'>
                                                        <input type='text' placeholder='URL' className='form-control' onChange={e => setDownload(e.target.value)} />
                                                    </div></td>

                                                    <td>
                                                    <button className='btn btn-success'>Update</button>{' '}
                                                    </td>
                                                    
                                                </tr>
                                            
                                            {/* Add more rows as needed */}
                                        </tbody>
                                    </table>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update