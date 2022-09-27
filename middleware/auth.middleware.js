const e = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

//check if auth is effective
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        //res.cookies("jwt", "", { maxAge: 1 });
        next();
      } else {
        console.log("decodedToken" + decodedToken);
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        console.log(res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

//check if user is auth or not
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json("No token");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("Auth Failed");
  }
};
