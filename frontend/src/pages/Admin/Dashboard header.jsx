// Header.js

import React from 'react';
import './style.css' ;
import './responsive.css';


function Header() {
    return (
        <header>
            <div className="logosec">
                <div className="logo">Admin Dashboard</div>
                
            </div>
            <div className="searchbar">
                <input type="text" placeholder="Search" />
                <div className="searchbtn">
                    <img
                        src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                        className="icn srchicn"
                        alt="search-icon"
                    />
                </div>
            </div>
            <div className="message">
                <div className="circle"></div>
                <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
                    className="icn"
                    alt=""
                />
                <div className="dp">
                    <img
                        src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                        className="dpicn"
                        alt="dp"
                    />
                </div>
            </div>

        </header>
        
    );
}

export default Header;
