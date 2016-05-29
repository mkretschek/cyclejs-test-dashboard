'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const orders = require('./orders');
const io = require('./socket');

const app = module.exports = express();

app.use(bodyParser.json());

/** Stores an order and updates the categories summary */
app.post('/orders', (req, res) => {
  if (orders.add(req.body)) {
    io.emit('addOrder', {
      total: orders.total,
      categories: orders.categories
    });
  }

  res.send({
    categories: orders.categories,
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
    categories: orders.categories
  });
});


// Make the frontend files available
app.use(express.static('frontend'));
app.use(express.static('node_modules/socket.io-client'));
app.use(express.static('node_modules/rx/dist'));
app.use(express.static('node_modules/@cycle/core/dist'));
app.use(express.static('node_modules/@cycle/dom/dist'));

