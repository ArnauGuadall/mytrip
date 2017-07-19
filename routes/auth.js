const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");
const logout = require('express-passport-logout');
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");



router.get('/signup', (req, res, next) => {
    res.render("auth/signup", {
        errorMessage: ''
    })
});



router.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (username === "" || password === "") {
        res.render("auth/signup", {
            errorMessage: "Indicate a username and a password to sign up"
        });
        return;
    }

    User.findOne({ "username": username }, "username", (err, user) => {

        if (user !== null) {
            res.render("auth/signup", {
                errorMessage: "The username already exists"
            });
            return;
        }

        var salt = bcrypt.genSaltSync(bcryptSalt);
        var hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username: username,
            password: hashPass,
            email: email
        });

        newUser.save((err) => {
            if (err) {
                res.render("auth/signup", {
                    errorMessage: "Something went wrong when signing up"
                });
            } else {
                res.redirect("/");
            }
        });
    });
});


router.get("/login", (req, res, next) => {
    console.log(req.session);
    res.render('auth/login');
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}))


router.get("/dashboard", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("app/dashboard", { user: req.user.username });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});

module.exports = router;