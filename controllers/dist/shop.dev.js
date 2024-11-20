"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var Product = require('../models/product');

var Order = require('../models/order');

var cartCheck = require('../util/user-cart-control.js'); // Controller to retrieve all products


exports.getProducts = function _callee(req, res, next) {
  var products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.find());

        case 3:
          products = _context.sent;
          // Fetching all products asynchronously
          res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Controller for the index page


exports.getIndex = function _callee2(req, res, next) {
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
          res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Controller for product details


exports.getProductDetail = function _callee3(req, res, next) {
  var prodId, product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          prodId = req.params.productID;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Product.findById(prodId));

        case 4:
          product = _context3.sent;
          res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
          });
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
}; // Controller for the cart page


exports.getCart = function _callee4(req, res, next) {
  var user, userCart;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(cartCheck(req.user._id));

        case 3:
          _context4.next = 5;
          return regeneratorRuntime.awrap(req.user.populate('cart.items.productId'));

        case 5:
          user = _context4.sent;
          // Filter out cart items where productId is not null
          userCart = user.cart.items.filter(function (item) {
            return item.productId !== null;
          });
          console.log(userCart);
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: userCart
          });
          _context4.next = 14;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; // Controller for rendering the orders page


exports.getOrders = function (req, res, next) {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
}; // Controller for rendering the checkout page


exports.getCheckout = function (req, res, next) {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
}; // Controller for adding a product to the cart


exports.postAddCart = function _callee5(req, res, next) {
  var prodId, targetProduct;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          prodId = req.body.productID;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.findById(prodId));

        case 3:
          targetProduct = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(req.user.addToCart(targetProduct));

        case 6:
          res.redirect('/cart');

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // Controller for removing a product from the cart


exports.removeFromCart = function _callee6(req, res, next) {
  var prodId;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          prodId = req.body.productId;
          console.log(prodId);
          _context6.next = 5;
          return regeneratorRuntime.awrap(req.user.deleteFromCart(prodId));

        case 5:
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);

        case 10:
          _context6.prev = 10;
          res.redirect('/cart');
          return _context6.finish(10);

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7, 10, 13]]);
}; // Controller for placing an order


exports.postOrder = function _callee7(req, res, next) {
  var user, userCart, orderItem, order;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(req.user.populate('cart.items.productId'));

        case 3:
          user = _context7.sent;
          userCart = user.cart.items;
          orderItem = userCart.map(function (i) {
            return {
              product: _objectSpread({}, i.productId),
              quantity: i.quantity
            };
          });
          order = new Order({
            products: orderItem,
            userId: req.user
          });
          _context7.next = 9;
          return regeneratorRuntime.awrap(order.save());

        case 9:
          _context7.next = 11;
          return regeneratorRuntime.awrap(req.user.clearCart());

        case 11:
          res.redirect('/orders');
          _context7.next = 18;
          break;

        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          next(_context7.t0);

        case 18:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 14]]);
}; // Controller for rendering the orders page with order details


exports.getOrders = function _callee8(req, res, next) {
  var orders;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(Order.find({}));

        case 3:
          orders = _context8.sent;
          console.log(orders);
          res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders
          });
          _context8.next = 12;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          next(_context8.t0);

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // const model = Product;
// for (let assoc of Object.keys(model.associations)) {
//   for (let accessor of Object.keys(model.associations[assoc].accessors)) {
//     console.log(model.name + '.' + model.associations[assoc].accessors[accessor]+'()');
//   }
// }
// product.getUser()
// product.setUser()
// product.createUser()
// product.getCarts()
// product.setCarts()
// product.addCarts()
// product.addCart()
// product.createCart()
// product.removeCart()
// product.removeCarts()
// product.hasCart()
// product.hasCarts()
// product.countCarts()