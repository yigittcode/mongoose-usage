"use strict";

var path = require("path");

var express = require('express');

var errorController = require("./controllers/error");

var mongoose = require('mongoose');

var User = require('./models/user');

var app = express();
app.set("view engine", "ejs");
app.set("views", "views");

var adminRoutes = require("./routes/admin");

var shopRoutes = require("./routes/shop");

app.use(express.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, "public")));
app.use(function _callee(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findById('66729fe0358584b057528db7'));

        case 3:
          user = _context.sent;
          req.user = user;
          next();
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          next(_context.t0); // Hata durumunda error middleware'e yönlendir

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
mongoose.connect('mongodb+srv://yigitabdullah329:iZky8perYukepdD@cluster0.mjtlsrv.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0').then(function () {
  return app.listen(3000);
});