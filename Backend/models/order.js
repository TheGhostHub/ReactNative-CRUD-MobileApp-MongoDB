const mongoose = require("mongoose");

const schema = mongoose.Schema;

const orderSchema = new schema({
  ordernumber: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

//creating a model named "Student" using the Mongoose library and the "studentSchema" variable
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
