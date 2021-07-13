import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';



class AllCustomers extends Component {
  constructor(props){
      super(props)
      this.state={
          customers:[]
      }
  }

     componentDidMount() {
        fetch("http://localhost:3002/customers")
        .then(res => res.json())
        .then((result) => {
            this.setState({
              customers: result
            });
          }
        )
        .catch(err=>{
          console.log("failed to fetch customers")
        })
    }


  render() {
    const renderCustomer = (customer, index) => {
      return (
        <tr key={index}>
          <td>{customer.id}</td>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{customer.amount}</td>
          <td><Button variant="primary" >
            <Link to={{pathname:"/view", state:customer.id}} style={{color:"white"}}>View</Link>
            </Button></td>
        </tr>
      );
    };

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Amount(in Rupees)</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {this.state.customers.map(renderCustomer)}
        </tbody>
      </Table>
    );
  }
}

export default AllCustomers;
