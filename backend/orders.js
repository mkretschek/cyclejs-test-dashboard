'use strict';
const forEach = require('lodash/forEach');

const orders = module.exports = {};
const list = orders.list = [];
const categories = orders.categories = {
  bedroom: {orders: 0, amount: 0},
  kitchen: {orders: 0, amount: 0},
  bathroom: {orders: 0, amount: 0},
  livingRoom: {orders: 0, amount: 0},
  balcony: {orders: 0, amount: 0},
  garden: {orders: 0, amount: 0}
};

orders.total = 0;


function updateSummaries(order) {
  forEach(order, (value, key) => {
    value = Number(value);

    if (
      value &&
      value > 0 &&
      value < 1e6 && // lt 1 million (protect the example from high values)
      categories.hasOwnProperty(key)
    ) {
      const category = categories[key];
      category.amount += value;
      category.orders += 1;
      orders.total += value;
    }
  });
}

orders.add = function (order) {
  const currentTotal = orders.total;

  updateSummaries(order);

  if (currentTotal !== orders.total) {
    list.push(order);
    return true;
  }

  // The order had no valid values and has been ignored
  return false;
};

