var express = require('express');
var router = express.Router();
const ensureLogin = require("connect-ensure-login");

/* GET home page. */
router.get("/dashboard", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("app/dashboard", { user: req.user });
});

router.get('/dashboard', function(req, res, next) {
    res.render('app/dashboard', { title: 'Dashboard' });
});

module.exports = router;
