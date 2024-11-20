"use strict";

var Product = require("../models/product"); // Controller for rendering the "Add Product" page


exports.getAddProduct = function (req, res, next) {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
}; // Controller for adding a new product


exports.postAddProduct = function _callee(req, res, next) {
  var title, imageUrl, price, description, product;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          title = req.body.title;
          imageUrl = req.body.imageUrl;
          price = req.body.price;
          description = req.body.description;
          _context.prev = 4;
          // Creating a new product associated with the current user
          product = new Product({
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description,
            userID: req.user
          });
          _context.next = 8;
          return regeneratorRuntime.awrap(product.save());

        case 8:
          res.redirect('/products');
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          console.log(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 11]]);
}; // Controller for rendering the list of products in admin section


exports.getProducts = function _callee2(req, res, next) {
  var products;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.find());

        case 3:
          products = _context2.sent;
          res.render("admin/products", {
            prods: products,
            pageTitle: "Admin Products",
            path: "/admin/products"
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Controller for rendering the "Edit Product" page


exports.getEditProduct = function _callee3(req, res, next) {
  var editMode, productID, product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          editMode = req.query.edit;

          if (!editMode) {
            res.redirect("/");
          }

          productID = req.params.productID;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Product.findById(productID));

        case 5:
          product = _context3.sent;
          res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
            product: product
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // Controller for updating a product


exports.postEditProduct = function _callee4(req, res, next) {
  var productID, title, imageUrl, price, description, updated;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          productID = req.params.productID;
          title = req.body.title;
          imageUrl = req.body.imageUrl;
          price = req.body.price;
          description = req.body.description;
          updated = {
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
          };
          _context4.next = 8;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: productID
          }, {
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description
          }));

        case 8:
          res.redirect('/products'); // Redirecting to products page after editing product

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // Controller for deleting a product


exports.deleteProduct = function _callee5(req, res, next) {
  var productID;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          productID = req.params.productID;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.deleteOne({
            _id: productID
          }));

        case 3:
          res.redirect("/admin/products");

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};