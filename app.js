const path = require("path");
const express = require('express');
const errorController = require("./controllers/error");
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

 const adminRoutes = require("./routes/admin");
 const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('66729fe0358584b057528db7');
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    next(err); // Hata durumunda error middleware'e yönlendir
  }
});


 app.use("/admin", adminRoutes);
 app.use(shopRoutes);
 app.use(errorController.get404);

mongoose.connect('mongodb+srv://yigitabdullah329:iZky8perYukepdD@cluster0.mjtlsrv.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then( () =>
app.listen(3000)
);



