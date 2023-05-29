const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//creating a model named "Student" using the Mongoose library and the "studentSchema" variable
const User = mongoose.model("User", userSchema);

module.exports = User;
