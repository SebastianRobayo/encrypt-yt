const { Router } = require("express");
const { createProduct } = require("../controllers/products.controller");
const checkToken = require("../middleware/session");
const router = Router();

router.post("/create-product", checkToken, createProduct);

module.exports = router;
