import React ,{ Component }from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import AllCustomers from './AllCustomers/AllCustomers';
import Home from './HomePage/Home';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ViewCustomer from './ViewCustomer/ViewCustomer';
import TransactionTable from './TransactionsHistory/TransactionsHistory';
import MakeTransaction from './MakeTransaction/TransactionForm';


class App extends Component {
  render(){
    return (
      <BrowserRouter>
      <div className="App">
       <Navbar/>
       
       <Switch>
       <Route path="/" exact component={Home}/>
      
       <Route path="/customers" component={AllCustomers}/>
       <Route path="/view" component={ViewCustomer}/>
       <Route path="/maketransaction" component={MakeTransaction}/>
       <Route path="/transactionsHistory" component={TransactionTable}/>

       </Switch>
      </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
