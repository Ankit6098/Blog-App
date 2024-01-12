const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
require("dotenv").config();

const expressLayout = require("express-ejs-layouts");

const db = require("./config/mongoose");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const multer = require("multer");

// use express json
app.use(express.json());

// use express urlencoded
app.use(express.urlencoded());

// passport
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require("./config/passport-google-oauth-strategy");
const passportGithub = require("./config/passport-github2-strategy");

// set up session cookie
const session = require("express-session");
const flash = require("connect-flash");
const customWare = require("./config/izitoast");

// setup the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// setup the static files
app.use(express.static("assets"));

// layout
// app.use(expressLayout);
// // extract styles and scripts from sub pages into the layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);

// mongo store is used to store the session cookie of user in the db
app.use(
  session({
    name: "placement cell",
    // TODO change the secret before deployment in production mode
    secret: "someting",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODBURL,
      autoRemove: "disabled",
    }),
  })
);

// set up multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// set up passport
app.use(passport.initialize());
app.use(passport.session());

// set up passport-local-strategy
app.use(passportLocal.setAuthenticatedUser);

// flash
app.use(flash());
app.use(customWare.setFlash);

// use express router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
    return;
  }
  console.log(`Server is running on port: ${port}`);
});
