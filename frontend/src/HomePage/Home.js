import React, { Component } from "react";
import moneyHome from "../images/moneyHome.jpg";
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Content">
        <div className="TextBox">
          <h2>Welcome To <br/><span>TSF BANK</span></h2>
          <p>It is a simple dynamic website in which one can see all the customers and their details and their current amount. We can also send amount from one customer to another customer and can also see the transaction history.</p>
          <h3>by-<span>Vinay Kumar</span></h3>
        </div>
        <div className="Imgbox">
            <img src={moneyHome} alt="money" className="Money"/>
        </div>
      </div>
    );
  }
}

export default Home;
