var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Trip = require('../models/trip');
var User = require('../models/user');
const ensureLogin = require("connect-ensure-login");


/* GET home page. */
router.get("/dashboard", ensureLogin.ensureLoggedIn(), (req, res) => {

    // Use populate to find the tripname into Users
    User
        .find({ _id: req.user.id })
        .populate("trips")
        .exec((err, user) => {
            if (err) {
                next(err);
                return;
            }

            res.render('app/dashboard', { user: req.user, usertrips: user });

        });

    // res.render("app/dashboard", { user: req.user, trip: trips });
});


module.exports = router;