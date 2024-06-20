"use strict";

var path = require("path");

var express = require("express");

var adminController = require("../controllers/admin");

var router = express.Router(); // // /admin/add-product => GET

router.get("/add-product", adminController.getAddProduct); // // /admin/products => GET

router.get("/products", adminController.getProducts); // // /admin/add-product => POST

router.post("/add-product", adminController.postAddProduct);
router.get("/edit-product/:productID", adminController.getEditProduct);
router.post("/edit-product/:productID", adminController.postEditProduct);
router.post("/delete-product/:productID", adminController.deleteProduct);
module.exports = router;