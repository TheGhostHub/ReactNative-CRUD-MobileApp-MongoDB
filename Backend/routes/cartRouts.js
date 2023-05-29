const router = require("express").Router();
const Cart = require("../models/cart");

router.route("/add").post(async (req, res) => {
  const picture = req.body.picture;
  const name = req.body.name;
  const price = req.body.price;
  const userEmail = req.body.userEmail;
  //create new object for student model
  const itemAddToCart = new Cart({
    picture,
    name,
    price,
    userEmail,
  });
  //Meka javascript promise ekak then eken wenne success unoth "Student added" kiyala message ekak enawa
  await itemAddToCart
    .save()
    .then(() => {
      res.json("Item Added");
    })
    .catch((err) => {
      //error ekak awoth eka console eken capture krnw
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Cart.find()
    .then((cartItems) => {
      res.json(cartItems);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/cartitems/:userEmail", async (req, res) => {
  try {
    let userEmail = req.params.userEmail;

    // Find all cart items that belong to the specific email ID
    const cartItems = await Cart.find({ userEmail });

    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  let itemId = req.params.id;

  await Cart.findByIdAndDelete(itemId)
    .then(() => {
      res.status(200).send({ status: "Item deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with delete data", error: err.message });
    });
});

// DELETE route to delete all cart items
router.route("/delete-all/:userEmail").delete(async (req, res) => {
  const userEmail = req.params.userEmail; // Assuming the user email is provided in the request body

  // Code to delete all cart items associated with the user
  await Cart.deleteMany({ userEmail })
    .then(() => {
      res.sendStatus(200); // Send a success response
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to delete cart items" }); // Send an error response
    });
});

module.exports = router;
