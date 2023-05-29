const router = require("express").Router();
const Order = require("../models/order");

router.route("/add").post(async (req, res) => {
  const ordernumber = req.body.ordernumber;
  const total = req.body.total;
  const date = req.body.date;
  const userEmail = req.body.userEmail;
  const addOrder = new Order({
    ordernumber,
    total,
    date,
    userEmail,
  });
  //Meka javascript promise ekak then eken wenne success unoth "Student added" kiyala message ekak enawa
  await addOrder
    .save()
    .then(() => {
      res.json("Order Added");
    })
    .catch((err) => {
      //error ekak awoth eka console eken capture krnw
      console.log(err);
    });
});
router.route("/").get((req, res) => {
  Order.find()
    .then((orderItems) => {
      res.json(orderItems);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/orders/:userEmail", async (req, res) => {
  try {
    let userEmail = req.params.userEmail;

    // Find all cart items that belong to the specific email ID
    const orderItems = await Order.find({ userEmail });

    res.json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
