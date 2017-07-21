var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var trips = require('../models/trip')
const ensureLogin = require("connect-ensure-login");


/* GET home page. */
router.get("/trip/:id", ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const TripID = req.params.id;
    const user = req.user;
    console.log('TripID Serra : ' + TripID)

    trips.findById(TripID, (err, data) => {
        if (err) {
            return next(err)
        }
        res.render('app/trip/view', { data, user });
    });
});







module.exports = router;

