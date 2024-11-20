const express = require('express');
const Product = require('../models/product');
const Order = require('../models/order');
const cartCheck = require('../util/user-cart-control.js');
// Controller to retrieve all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find(); // Fetching all products asynchronously
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  } catch (error) {
    console.error(error); 
  }
};

// Controller for the index page
exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  } catch (error) {
    console.error(error); 
  }
};

// Controller for product details
exports.getProductDetail = async (req, res, next) => {
  const prodId = req.params.productID;
  try {
    const product = await Product.findById(prodId);
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  } catch (err) {
    console.error(err); 
  }
};

// Controller for the cart page
exports.getCart = async (req, res, next) => {
  try {
    // First, run cartCheck to validate and possibly clean up the cart
    await cartCheck(req.user._id);

    // Reload the user and populate the cart items with product details
    const user = await req.user.populate('cart.items.productId');

    // Filter out cart items where productId is not null
    const userCart = user.cart.items.filter(item => item.productId !== null);

    console.log(userCart);

    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: userCart
    });
  } catch (err) {
    console.error(err);
  }
};



// Controller for rendering the orders page
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

// Controller for rendering the checkout page
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

// Controller for adding a product to the cart
exports.postAddCart = async (req, res, next) => {
    const prodId = req.body.productID;
    const targetProduct = await Product.findById(prodId);
    await req.user.addToCart(targetProduct);
    res.redirect('/cart');
};

// Controller for removing a product from the cart
exports.removeFromCart = async (req, res, next) => {
  try {

    const prodId = req.body.productId;
    console.log(prodId);
    await req.user.deleteFromCart(prodId);
    }
   catch (err) {
    console.error(err);
  }finally{
    res.redirect('/cart');
  }
};

// Controller for placing an order
exports.postOrder = async (req, res, next) => {
  try {
    const user = await req.user.populate('cart.items.productId');
    const userCart = user.cart.items;
    const orderItem = userCart.map((i)=>{
      return {product : {...i.productId}, quantity: i.quantity}
    });
    const order = new Order({products: orderItem, userId : req.user});
    await order.save();
    await req.user.clearCart();
    res.redirect('/orders');
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Controller for rendering the orders page with order details
exports.getOrders = async (req, res, next) => {
  try {
      const orders =await Order.find({});
      console.log(orders);
      res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};



// const model = Product;
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