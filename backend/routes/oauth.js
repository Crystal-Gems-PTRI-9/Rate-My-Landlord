const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("../auth");
const router = express.Router();

//localhost8080/oauth/google
router.get(
  "/google",
  (req, res, next) => {
    console.log("first authentication");
    next();
  },
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//localhost8080/oauth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:8080/",
    failureRedirect: "/oauth/google/failure",
  })
);

//localhost8080/oauth/protected FETCH THIS ROUTE FOR REQ.USER OAUTH USER INFO
router.get("/protected", (req, res) => {
    if (req.user) res.json(req.user);
    else res.json("oath user already logged out")
});

////localhost8080/oauth/google/failure
router.get("/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

//localhost8080/oauth/logout ROUTE FOR OAUTH USER SESSION LOG OUT
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Oauth User Logged Out!");
});


module.exports = router;