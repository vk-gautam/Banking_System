import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button, InputGroup } from "react-bootstrap";
import "./MakeTransaction.css";

class MakeTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allcustomers: [],
      selectFrom: "",
      selectTo: "",
      balance: "",
      transactionHistory: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3002/customers")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          allcustomers: result,
        });
      })
      .catch((err) => {
        console.log("failed to fetch customers");
      });
  }

  handleSelectFromChange = (event) => {
    this.setState({
      selectFrom: event.target.value,
    });
  };

  handleSelectToChange = (event) => {
    this.setState({
      selectTo: event.target.value,
    });
  };

  handleBalanceChange = (event) => {
    this.setState({
      balance: event.target.value,
    });
  };

  handleSubmit = (event) => {
    let senderbalance = 0;

    for (const val of this.state.allcustomers) {
      if (val.name === this.state.selectFrom) {
        senderbalance = val.amount;
      }
    }

    if (senderbalance - this.state.balance < 0) {
      return alert("Insufficient Balance , Transaction Failed");
    } else {
      fetch("http://localhost:3002/transaction", {
        method: "put",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          sender_name: this.state.selectFrom,
          bal: this.state.balance,
          reciever_name: this.state.selectTo,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            fetch("http://localhost:3002/transactionHistory", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                sender_name: this.state.selectFrom,
                bal: this.state.balance,
                reciever_name: this.state.selectTo,
              }),
            })
              .then((response) => response.json())
              .then((transactionResult) => {
                this.setState({
                  transactionHistory: transactionResult,
                });
              });
          }
        })
        .catch((err) => {
          console.log("failed to make transaction");
        });

      alert(
        `Transaction Successful,
        amount of Rs. ${this.state.balance} transferred from ${this.state.selectFrom} to ${this.state.selectTo}`
      );
      event.preventDefault();
    }
  };

  render() {
    let button=<Button variant="secondary">Submit</Button>
    if (this.state.selectFrom && this.state.selectTo && this.state.balance) {
      button = (
        <Button type="submit" className="my-3" style={{ width: "125px" }}>
          Submit
        </Button>
      );
    }

    return (
      <div className="Form">
        <h1>Transaction Form</h1>
        <Form inline onSubmit={this.handleSubmit} className="Card">
          <Form.Label className="my-1 mr-3" htmlFor="inlineFormFrom">
            From
          </Form.Label>
          <Form.Control
            as="select"
            className="my-1 mr-md-3"
            id="inlineFormFrom"
            custom
            onChange={this.handleSelectFromChange}
            style={{ width: "152px" }}
          >
            <option value=""></option>
            {this.state.allcustomers.map((val, key) => {
              return (
                <option value={val.name} key={key}>
                  {val.name}
                </option>
              );
            })}
          </Form.Control>

          <Form.Label className="my-1 mr-3" htmlFor="inlineFormTo">
            To
          </Form.Label>
          <Form.Control
            as="select"
            className="my-1 mr-sm-3"
            id="inlineFormTo"
            custom
            onChange={this.handleSelectToChange}
            style={{ width: "153px" }}
          >
            <option value=""></option>
            {this.state.allcustomers.map((val, key) => {
              return (
                <option value={val.name} key={key}>
                  {val.name}
                </option>
              );
            })}
          </Form.Control>

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Amount</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              value={this.state.balance}
              onChange={this.handleBalanceChange}
            />
          </InputGroup>

          {button}
        </Form>
      </div>
    );
  }
}

export default MakeTransaction;
