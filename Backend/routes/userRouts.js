const router = require("express").Router();
let User = require("../models/user");
const bycrypt = require("bcryptjs");

router.route("/add").post(async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const encryptedPass = await bycrypt.hash(password, 10);
  //create new object for user model
  const newUser = new User({
    username,
    email,
    password: encryptedPass,
  });
  //Meka javascript promise ekak then eken wenne success unoth "User added" kiyala message ekak enawa
  await newUser
    .save()
    .then(() => {
      res.json("User Added");
    })
    .catch((err) => {
      //error ekak awoth eka console eken capture krnw
      console.log(err);
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bycrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Password is correct, user is authenticated
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
