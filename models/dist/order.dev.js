"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var orderSchema = new Schema({
  products: [{
    product: {
      type: Object,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});
module.exports = mongoose.model('Order', orderSchema);