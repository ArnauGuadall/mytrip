var express = require('express');
var router = express.Router();
const Trip = require('../models/trip');
const ensureLogin = require("connect-ensure-login");
const User = require('../models/user');


/* GET home page. */
router.get("/addtrip", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("app/addtrip", { user: req.user });
});

router.get('/addtrip', function(req, res, next) {
    res.render('app/addtrip ', { title: 'Add Trip' });
});


router.post("/addtrip", (req, res, next) => {
    const tripname = req.body.tripname;
    const num_days = req.body.num_days;
    const userid = req.user._id;

    var newTrip = new Trip({
        tripname: tripname,
        num_days: num_days,
        users: req.user.id
    });

    newTrip.save((err) => {
        if (err) {
            res.render("app/addtrip", {
                errorMessage: "Something went wrong"
            });
        } else {
            res.redirect("/dashboard");
        }
    });
    console.log('---------');
    console.log(newTrip);
    console.log('---------');

    User.findById(userid, (err, user) => {
        console.log('newtrip id: ' + newTrip._id);
        user.trips.push(newTrip._id);
        user.save();
    })
});

module.exports = router;