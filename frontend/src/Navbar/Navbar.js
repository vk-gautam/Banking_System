import React, { Component } from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';


class Navbar extends Component{
    render(){
        return(
            <div className="Navstyle">
                
                <ul>
                   <li><Link to="/" style={{color:"white"}}>Home</Link></li>
                    <li><Link to="/customers" style={{color:"white"}}>View All Customers</Link></li>
                    <li><Link to="/maketransaction" style={{color:"white"}}>Make Transaction</Link></li>

                    <li><Link to="/transactionsHistory" style={{color:"white"}}>Transactions History</Link></li>
                    
                </ul>
            </div>
        )
    }
}

export default Navbar;