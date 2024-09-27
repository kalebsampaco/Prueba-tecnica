/************ import models ************/

import Sequelize = require("sequelize");

/**
 * @author Styk Medina
 * @description Function to order model
 * if receive an object to organize the variables and returns an object to order the condition 
 * @param {string} order_field
 * @param {string} order_type
 */
export const orderModel = (order_field, order_type) => {
  let order = [];
  switch (order_field) {
    // ================================= default table
    default:
      order.push([order_field, order_type]);
      break;
  }
  return { order };
};
