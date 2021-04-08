const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const customerRoutes = express.Router();
const PORT = 4000;

let Customer = require('./customer.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/customers', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

customerRoutes.route('/').get(function(req, res) {
    Customer.find(function(err, customers) {
        if (err) {
            console.log(err);
        } else {
            res.json(customers);
        }
    });
});

customerRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Customer.findById(id, function(err, customer) {
        res.json(customer);
    });
});

customerRoutes.route('/add').post(function(req, res) {
    let customer = new Customer(req.body);
    customer.save()
        .then(customer => {
            res.status(200).json({'customer': 'Customer added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new customer failed');
        });
});

customerRoutes.route('/update/:id').post(function(req, res) {
    Customer.findById(req.params.id, function(err, customer) {
        if (!customer)
            res.status(404).send("data is not found");
        else
        customer.customer_description = req.body.customer_description;
        customer.customer_responsible = req.body.customer_responsible;
        customer.customer_priority = req.body.customer_priority;
        customer.customer_completed = req.body.customer_completed;

        customer.save().then(customer => {
                res.json('Customer updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/customers', customerRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});