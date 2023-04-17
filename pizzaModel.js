const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema(
  {
    flavor: { type: String, required: true },
    toppings: { type: [String], required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  });

const Pizza = mongoose.model('pizza', pizzaSchema);

module.exports = Pizza;
