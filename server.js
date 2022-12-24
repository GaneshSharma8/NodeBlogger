const express = require("express");
const cors = require("cors");
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();



var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret:'mySecretKey',
  saveUninitialized:true,
  resave: false
}));

app.use((req, res, next)=>{
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

//DB connect
const db = require("./app/models");
useNewUrlParser: true,
db.mongoose.connect(db.url, {
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//set template
app.set('views', './app/views');
app.set('view engine', 'ejs');


//route prefix
app.use("", require('./app/routes/user.routes'));

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}.`);
});
