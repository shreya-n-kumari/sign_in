const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const UserModel = require("./models/User.js");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://0.0.0.0:27017/registerdata");

app.post("/login", (req,res) => {
  const {email, password} = req.body;
  UserModel.findOne({email:email})
  .then(user => {
    if(user) {
        if(user.password === password){
          res.json("Success")
        } else{
          res.json("the password is incorrect")
        }
      }else{
      res.json("No record existed")
    }
  })
})

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((user) => req.json(user))
    .catch((err) => res.json(err));
});

app.get("/", (req, res) => { 
  app.use(express.static(path.resolve(__dirname, "frontend", "build"))); 
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); 
});

app.listen(3001, () => {
  console.log("server is running");
});
