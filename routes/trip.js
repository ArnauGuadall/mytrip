var express = require('express');
var router = express.Router();
const ensureLogin = require("connect-ensure-login");


/* GET home page. */
router.get("/trip", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("app/trip", { user: req.user });
});

router.get('/trip', function(req, res, next) {
    res.render('app/trip ', { title: 'Trip' });
});

module.exports = router;