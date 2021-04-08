import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateCustomer from "./components/create-customer.component";
import EditCustomer from "./components/edit-customer.component";
import CustomersList from "./components/customers-list.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://joyeetanandi.com" target="_blank">
              <img src={logo} width="30" height="30" alt="joyeetanandi.com" />
            </a>
            <Link to="/" className="navbar-brand">MERN-Stack Customers Registration App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Customers</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create New Customer</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={CustomersList} />
          <Route path="/edit/:id" component={EditCustomer} />
          <Route path="/create" component={CreateCustomer} />     
        </div>        
      </Router>
    );
  }
}

export default App;