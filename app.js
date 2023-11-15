require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const atlasConnectionUri = process.env.MONGODB_URI;
mongoose.connect(atlasConnectionUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const userSchema = new mongoose.Schema({
  username: String,
  userphone: String,
  useremail: String,
  userpassword: String,
  contact1: String,
  contact1phone: String,
  contact2: String,
  contact2phone: String,
  contact3: String,
  contact3phone: String,
});

const User = mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
  try {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(req.body.userpassword, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    const newUser = new User({
      username: req.body.username,
      userphone: req.body.userphone,
      useremail: req.body.useremail,
      userpassword: hashedPassword,
      contact1: req.body.contact1,
      contact1phone: req.body.contact1phone,
      contact2: req.body.contact2,
      contact2phone: req.body.contact2phone,
      contact3: req.body.contact3,
      contact3phone: req.body.contact3phone,
    });

    await newUser.save();
    res.redirect("/map");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/authenticate", async (req, res) => {
  const enteredUseremail = req.body.useremail;
  const enteredUserpassword = req.body.userpassword;

  try {
    const user = await User.findOne({ useremail: enteredUseremail });

    if (user) {
      bcrypt.compare(
        enteredUserpassword,
        user.userpassword,
        function (err, result) {
          if (result) {
            req.session.user = user;
            res.status(200).send("Authenticated");
          } else {
            res.status(401).send("Unauthorized");
          }
        }
      );
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/map", async (req, res) => {
  try {
    if (req.session.user) {
      res.render("map", { userNametoRender: [req.session.user] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/userlogin", (req, res) => {
  res.render("userlogin");
});

app.use((req, res) => {
  res.status(404).render("404");
});
