'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const orders = require('./orders');
const io = require('./socket');

const map = require('lodash/map');

const app = module.exports = express();

app.use(bodyParser.json());

/** Stores an order and updates the categories summary */
app.post('/orders', (req, res) => {
  if (orders.add(req.body)) {
    io.emit('addOrder', {
      total: orders.total,
      categories: map(orders.categories, (category, name) => Object.assign({name}, category))
    });
  }

  res.send({
    categories: map(orders.categories, (category, name) => Object.assign({name}, category)),
    total: orders.total
  });
});

/** Gets all orders */
app.get('/orders', (req, res) => {
  res.send(orders.list);
});


/** Gets the summary for the categories */
app.get('/orders/summary', (req, res) => {
  res.send({
    total: orders.total,
    categories: map(orders.categories, (category, name) => Object.assign({name}, category))
  });
});


// Make the frontend files available
app.use(express.static('frontend'));
app.use(express.static('node_modules/socket.io-client'));
app.use(express.static('node_modules/rx/dist'));
app.use(express.static('node_modules/@cycle/core/dist'));
app.use(express.static('node_modules/@cycle/dom/dist'));

