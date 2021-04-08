import React, { Component } from 'react';
import axios from 'axios';



export default class EditCustomer extends Component {

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

    componentDidMount() {
        axios.get('http://localhost:4000/customers/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    customer_description: response.data.customer_description,
                    customer_responsible: response.data.customer_responsible,
                    customer_priority: response.data.customer_priority,
                    customer_completed: response.data.customer_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
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

    onChangeCustomerCompleted(e) {
        this.setState({
            customer_completed: !this.state.customer_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            customer_description: this.state.customer_description,
            customer_responsible: this.state.customer_responsible,
            customer_priority: this.state.customer_priority,
            customer_completed: this.state.customer_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/customers/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Customer</h3>
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
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeCustomerCompleted}
                                checked={this.state.customer_completed}
                                value={this.state.customer_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Customer" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}