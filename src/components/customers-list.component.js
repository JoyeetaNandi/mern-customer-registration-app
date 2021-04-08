import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Customer = props => (
    <tr>
        <td className={props.customer.customer_completed ? 'completed' : ''}>{props.customer.customer_description}</td>
        <td className={props.customer.customer_completed ? 'completed' : ''}>{props.customer.customer_responsible}</td>
        <td className={props.customer.customer_completed ? 'completed' : ''}>{props.customer.customer_priority}</td>
        
        <td>
            <Link to={"/edit/"+props.customer._id}>Edit</Link>          
        </td>
        <td>            
          <Link to={"/delete/"+props.customer._id}>Delete</Link>
        </td>
    </tr>
)

export default class CustomersList extends Component {

    constructor(props) {
        super(props);
        this.state = {customers: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/customers/')
            .then(response => {
                this.setState({ customers: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    customerList() {
        return this.state.customers.map(function(currentCustomer, i){
            return <Customer customer={currentCustomer} key={i} />;
        })
    }

    

    render() {
        return (
            <div>
                <h3>Customers List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible Person</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.customerList() }
                    </tbody>
                </table>

            </div>
        )
    }
}