const mongoose = require("mongoose");

const schema = mongoose.Schema;

const cartSchema = new schema({
  picture: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

//creating a model named "Student" using the Mongoose library and the "studentSchema" variable
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
