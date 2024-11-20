"use strict";

var mongoose = require('mongoose');

var User = require('../models/user');

var Product = require('../models/product');

function checkUserCart(userId) {
  var user, cart, allProducts, _loop, i;

  return regeneratorRuntime.async(function checkUserCart$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findById(userId, {
            cart: 1
          }));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 7;
            break;
          }

          console.log("User with ID ".concat(userId, " not found."));
          return _context.abrupt("return");

        case 7:
          // Get the cart object from the user document
          cart = user.cart; // If cart is empty or does not exist, log a message and return

          if (!(!cart || !cart.items || cart.items.length === 0)) {
            _context.next = 11;
            break;
          }

          console.log("User ".concat(userId, " has no items in the cart."));
          return _context.abrupt("return");

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(Product.find({}, {
            _id: 1
          }));

        case 13:
          allProducts = _context.sent;

          _loop = function _loop(_i) {
            var cartItem = cart.items[_i];
            var productId = cartItem.productId; // Check if the product with productId exists in the 'products' collection

            var productExists = allProducts.some(function (product) {
              return product._id.toString() === productId.toString();
            }); // If product does not exist, log a message and remove the item from the cart

            if (!productExists) {
              console.log("Product ".concat(productId, " not found in Products collection. Removing from cart."));
              cart.items.splice(_i, 1);
              _i--; // Decrement index because we removed an item from array
            }

            i = _i;
          };

          // Iterate through each item in the user's cart
          for (i = 0; i < cart.items.length; i++) {
            _loop(i);
          } // Save the updated user document with the modified cart


          _context.next = 18;
          return regeneratorRuntime.awrap(user.save());

        case 18:
          console.log("Cart of user ".concat(userId, " has been updated."));
          _context.next = 24;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          console.error('Error checking user cart:', _context.t0);

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
}

module.exports = checkUserCart;