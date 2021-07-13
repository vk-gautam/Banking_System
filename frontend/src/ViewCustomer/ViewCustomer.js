import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import "./ViewCustomer.css";


class ViewCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewcustomer: [],
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3002/customers/${this.props.location.state}`)
      .then((res) => res.json())
      .then((result) => {
       this.setState({
          viewcustomer: result,
        });
      })
      .catch(err=>{
        console.log("failed to fetch this customer")
      })
  }

  render() {
    const renderCustomerRow = (customer, index) => {
      return (
        <tr key={index}>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{customer.amount}</td>
        </tr>
      );
    };

    const renderCustomerRowNext = (customer, index) => {
      return (
        <tr key={index}>
          <td>{customer.account_no}</td>
          <td>{customer.ifsc_code}</td>
          <td>{customer.branch_name}</td>
        </tr>
      );
    };

    const renderCustomerRowNextNext = (customer, index) => {
      return (
        <tr key={index}>
          <td>{customer.contact_no}</td>
          <td>{customer.account_type}</td>
          <td>{customer.city}</td>
        </tr>
      );
    };

    return (
      <div>
        <div className="Modal">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>{this.state.viewcustomer.map(renderCustomerRow)}</tbody>
          </Table>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Account No.</th>
                <th>IFSC Code</th>
                <th>Branch Name</th>
              </tr>
            </thead>
            <tbody>{this.state.viewcustomer.map(renderCustomerRowNext)}</tbody>
          </Table>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Contact No.</th>
                <th>Account Type</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {this.state.viewcustomer.map(renderCustomerRowNextNext)}
            </tbody>
          </Table>
        </div>

        <Button variant="primary" style={{marginTop:"20px"}}>
            <Link to={{pathname:"/maketransaction"}} style={{color:"white"}}>Make Transaction</Link>
        </Button>

      </div>
    );
  }
}

export default ViewCustomer;
