var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var trips = require('../models/trip')
const ensureLogin = require("connect-ensure-login");


/* GET home page. */
router.get("/dashboard", ensureLogin.ensureLoggedIn(), (req, res) => {


    res.render("app/dashboard", { user: req.user, trip: trips });
});

router.get('/dashboard', function(req, res, next) {
    res.render('app/dashboard', { title: 'Dashboard' });
});

module.exports = router;