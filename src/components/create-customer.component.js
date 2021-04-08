import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCustomer extends Component {

    constructor(props) {
        super(props);

        this.onChangeCustomerDescription = this.onChangeCustomerDescription.bind(this);
        this.onChangeCustomerResponsible = this.onChangeCustomerResponsible.bind(this);
        this.onChangeCustomerPriority = this.onChangeCustomerPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            customer_description: '',
            customer_responsible: '',
            customer_priority: '',
            customer_completed: false
        }
    }

    onChangeCustomerDescription(e) {
        this.setState({
            customer_description: e.target.value
        });
    }

    onChangeCustomerResponsible(e) {
        this.setState({
            customer_responsible: e.target.value
        });
    }

    onChangeCustomerPriority(e) {
        this.setState({
            customer_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Customer Description: ${this.state.customer_description}`);
        console.log(`Customer Responsible: ${this.state.customer_responsible}`);
        console.log(`Customer Priority: ${this.state.customer_priority}`);
        console.log(`Customer Completed: ${this.state.customer_completed}`);


        
        const newCustomer = {
            customer_description: this.state.customer_description,
            customer_responsible: this.state.customer_responsible,
            customer_priority: this.state.customer_priority,
            customer_completed: this.state.customer_completed
        };
        
        axios.post('http://localhost:4000/customers/add', newCustomer)
            .then(res => console.log(res.data));

        
        this.setState({
            customer_description: '',
            customer_responsible: '',
            customer_priority: '',
            customer_completed: false
        })
    }


    render() {
        return (
            <div>
                <div style={{marginTop: 10}}>
                <h3>Create New Customer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        
                        <input  type="text"
                                className="form-control"
                                value={this.state.customer_description}
                                onChange={this.onChangeCustomerDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Responsible Person: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.customer_responsible}
                                onChange={this.onChangeCustomerResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.customer_priority==='Low'} 
                                    onChange={this.onChangeCustomerPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.customer_priority==='Medium'} 
                                    onChange={this.onChangeCustomerPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.customer_priority==='High'} 
                                    onChange={this.onChangeCustomerPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Customer" className="btn btn-primary" />
                    </div>
                </form>
            </div>
            </div>
        )
    }
}