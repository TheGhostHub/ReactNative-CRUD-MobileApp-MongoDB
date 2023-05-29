const router = require("express").Router();
const Products = require("../models/products");

router.route("/add").post(async (req, res) => {
  const picture = req.body.picture;
  const price = req.body.price;
  const name = req.body.name;
  const release_date = req.body.release_date;
  const addProduct = new Products({
    picture,
    price,
    name,
    release_date,
  });
  //Meka javascript promise ekak then eken wenne success unoth "Student added" kiyala message ekak enawa
  await addProduct
    .save()
    .then(() => {
      res.json("Product Added");
    })
    .catch((err) => {
      //error ekak awoth eka console eken capture krnw
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Products.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  try {
    let product = await Products.findById(userId);
    res.status(200).send({ status: "Product Fetched", product: product });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with get user", error: err.message });
  }
});
module.exports = router;
