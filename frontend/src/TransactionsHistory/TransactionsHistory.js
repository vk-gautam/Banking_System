import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import Moment from 'react-moment'

class TransactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3002/transactionHistory")
      .then((res) => res.json())
      .then((result) => {
        
        this.setState({
          transactions: result,
        });
      })
      .catch((err) => {
        console.log("failed to fetch transactions");
      });
  }

  render() {

    

    const rendertransaction = (transaction, index) => {
      const d=transaction.time;
      

        return (
          
          <tr key={index}>
            <td>{transaction.senders_name}</td>
            <td>{transaction.recievers_name}</td>
            <td>{transaction.amount}</td>
            <td><Moment format='MMMM Do YYYY, h:mm:ss a'>{d}</Moment></td>
          
            </tr>
        );
      };
  

    return (
      <div>
         <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Reciever</th>
            <th>Amount(in Rupees)</th>
            <th>Time</th>
            
          </tr>
        </thead>
        <tbody>
          {this.state.transactions.map(rendertransaction)}
          
        </tbody>
      </Table>
      </div>
    );
  }
}

export default TransactionTable;
